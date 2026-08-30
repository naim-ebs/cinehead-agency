import { NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error getting inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.details) {
      return NextResponse.json({ error: 'Name, email and details are required' }, { status: 400 });
    }

    const newInquiry = await createInquiry(body);
    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry received. The Cine Head team will reach out shortly.',
      inquiry: newInquiry 
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
