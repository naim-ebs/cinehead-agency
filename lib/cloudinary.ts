import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Load Cloudinary Config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder = 'cinehead',
  originalFileName = 'upload.jpg',
  mimeType = 'image/jpeg'
): Promise<{ url: string; public_id: string } | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const hasCloudinaryKeys = 
    apiKey && 
    apiSecret && 
    cloudName && 
    cloudName !== 'demo';

  // 1. Direct Cloudinary Upload via Base64 (Reliable, fast, no stream hanging)
  if (hasCloudinaryKeys) {
    try {
      let uploadSource: string;
      if (Buffer.isBuffer(fileBuffer)) {
        uploadSource = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
      } else if (typeof fileBuffer === 'string') {
        uploadSource = fileBuffer.startsWith('data:') 
          ? fileBuffer 
          : `data:${mimeType};base64,${fileBuffer}`;
      } else {
        throw new Error('Unsupported buffer format');
      }

      const result = await cloudinary.uploader.upload(uploadSource, {
        folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
      });

      if (result && result.secure_url) {
        console.log(`[Cloudinary Success] Uploaded: ${result.secure_url}`);
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }
    } catch (err) {
      console.error('[Cloudinary Upload Exception]:', err);
    }
  }

  // 2. Local File System Fallback (saves directly to /public/uploads)
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const cleanExt = path.extname(originalFileName) || '.jpg';
    const uniqueName = `cinehead-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${cleanExt}`;
    const filePath = path.join(uploadsDir, uniqueName);

    if (Buffer.isBuffer(fileBuffer)) {
      fs.writeFileSync(filePath, fileBuffer);
    } else if (typeof fileBuffer === 'string') {
      const base64Data = fileBuffer.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    }

    return {
      url: `/uploads/${uniqueName}`,
      public_id: uniqueName,
    };
  } catch (fsErr) {
    console.error('Local upload fallback failed:', fsErr);
    return null;
  }
}

export default cloudinary;
