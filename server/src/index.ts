import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import multer, { FileFilterCallback } from 'multer';
import { exiftool } from 'exiftool-vendored';
import sharp from 'sharp';
import archiver from 'archiver';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import exif from 'exif-parser';

const app = express();
const port = 5002;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const TEXT_WIDTH_MULTIPLIER = 50;
const PADDING_RIGHT = 50;
const PADDING_BOTTOM = 30;

const svgStyle = `
  .title { fill: white; font-size: 100px; font-weight: bold; font-family: "Noto Sans", "DejaVu Sans", sans-serif; }
`;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

function getExifDateFromBuffer(buffer: Buffer) {
  const parser = exif.create(buffer);
  const result = parser.parse();

  const date = result.tags.DateTimeOriginal || result.tags.CreateDate;
  return date ? new Date(date * 1000) : null; // 秒→ミリ秒
}

app.post('/process', upload.array('images'), async (req: Request, res: Response) => {
  const files = (req.files as Express.Multer.File[]) || [];

  if (files.length === 0) {
    return res.status(400).send('No images were uploaded.');
  }

  console.log('Images received:', files.length);

  try {
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="processed_images.zip"');

    archive.pipe(res);

    for (const file of files) {
      const buffer = file.buffer;

      try {
        const exifDate = getExifDateFromBuffer(buffer);
        const createDate = exifDate || new Date();
        const dateString = createDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(`dateString ${dateString}`);

        const imageWidth = (await sharp(buffer).metadata()).width || 0;
        const imageHeight = (await sharp(buffer).metadata()).height || 0;
        const textWidth = dateString.length * TEXT_WIDTH_MULTIPLIER; // Approximate text width
        const x = imageWidth - textWidth - PADDING_RIGHT; // 20px padding from the right edge
        const y = imageHeight - PADDING_BOTTOM; // 30px padding from the bottom edge

        const svgImage = `
          <svg width="${imageWidth}" height="${imageHeight}">
            <style>
              ${svgStyle}
            </style>
            <text x="${x}" y="${y}" class="title">${dateString}</text>
          </svg>
            `;

        const image = sharp(buffer)
          .composite([{
            input: Buffer.from(svgImage),
            blend: 'over',
          }]);

        const processedImageBuffer = await image.toBuffer();

        archive.append(processedImageBuffer, { name: file.originalname });
      } catch (error) {
        console.error('Error processing image:', file.originalname, error);
        archive.append(buffer, { name: `failed_${file.originalname}` });
      }
    }

    await archive.finalize();
  } catch (error) {
    console.error('Error creating ZIP file:', error);
    res.status(500).send('Error processing images.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
