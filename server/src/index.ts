import express, { Request, Response } from 'express';
import multer from 'multer';
import { exiftool } from 'exiftool-vendored';
import sharp from 'sharp';
import archiver from 'archiver';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

const app = express();
const port = 5002;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

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
        const exifData = await exiftool.read(buffer);
        const createDate = exifData.CreateDate ? new Date(exifData.CreateDate) : new Date();
        const dateString = createDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const imageWidth = (await sharp(buffer).metadata()).width || 0;
        const imageHeight = (await sharp(buffer).metadata()).height || 0;
        const textWidth = dateString.length * 10; // Approximate text width
        const x = imageWidth - textWidth - 20; // 20px padding from the right edge
        const y = imageHeight - 30; // 30px padding from the bottom edge

        const svgImage = `
          <svg width="${imageWidth}" height="${imageHeight}">
            <style>
              .title { fill: white; font-size: 20px; font-weight: bold; }
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
  console.log(`Server listening on port ${port}`);
});
