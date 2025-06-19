import { ExifParser } from 'exif-parser';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { Buffer } from 'node:buffer';

export async function processImage(imagePath: string): Promise<Buffer> {
  try {
    const file = await fs.readFile(imagePath);
    const parser = ExifParser.create(file);
    const result = parser.parse();

    const dateTimeOriginal = result.tags.DateTimeOriginal;

    if (!dateTimeOriginal) {
      throw new Error('DateTimeOriginal not found in EXIF data');
    }

    const date = new Date(dateTimeOriginal * 1000);
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    const image = sharp(imagePath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Width or height not found in image metadata');
    }

    const textOverlay = {
      text: formattedDate,
      font: 'Arial',
      rgba: true,
      x: metadata.width - 300,
      y: metadata.height - 50,
    };

    const overlayBuffer = Buffer.from(
      `<svg width="${metadata.width}" height="${metadata.height}">
        <style>
        .title { fill: white; font-size: 24px; font-weight: bold; }
        </style>
        <text x="${textOverlay.x}" y="${textOverlay.y}" text-anchor="start" class="title">${textOverlay.text}</text>
      </svg>`
    );

    const processedImage = await image
      .composite([
        {
          input: overlayBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();

    return processedImage;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}
