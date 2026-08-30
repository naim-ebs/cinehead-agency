import { NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

async function handleUpdate(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
    }

    const body = await request.json();
    const updated = await updateSiteSettings(body);
    
    // Purge cache for all public pages immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/about');
      revalidatePath('/projects');
      revalidatePath('/team');
      revalidatePath('/services');
      revalidatePath('/contact');
    } catch (e) {
      console.warn('revalidatePath note:', e);
    }

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return handleUpdate(request);
}

export async function POST(request: Request) {
  return handleUpdate(request);
}
