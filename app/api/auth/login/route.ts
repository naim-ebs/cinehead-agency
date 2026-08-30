import { NextResponse } from 'next/server';
import { authenticateAdmin, createSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const auth = await authenticateAdmin(email, password);
    if (!auth.success || !auth.session) {
      return NextResponse.json({ error: auth.error || 'Invalid credentials' }, { status: 401 });
    }

    const token = await createSessionToken(auth.session);

    const response = NextResponse.json({
      success: true,
      user: auth.session,
    });

    response.cookies.set('cinehead_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
