import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const directUrl = formData.get('url') as string | null;

    if (directUrl) {
      return NextResponse.json({ url: directUrl });
    }

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || 'image/jpeg';

    const result = await uploadToCloudinary(buffer, 'cinehead', file.name, mimeType);
    if (!result) {
      return NextResponse.json({ error: 'Failed to process image upload' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: 'Failed to process media upload' }, { status: 500 });
  }
}
