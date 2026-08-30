import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectDB } from './db';

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'cinehead_ultra_secure_jwt_secret_key_2026_super_production_grade_random_99482';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = 'cinehead_admin_token';

export interface AdminSession {
  email: string;
  name: string;
  role: string;
}

export async function createSessionToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function authenticateAdmin(email: string, password: string): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@cinehead.com').toLowerCase();
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'cinehead2026!admin';

  // Direct fast-path for default seed admin
  if (email.toLowerCase() === defaultAdminEmail && password === defaultAdminPassword) {
    return {
      success: true,
      session: {
        email: defaultAdminEmail,
        name: 'Cine Head Executive',
        role: 'admin',
      },
    };
  }

  // Check DB if connected
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return {
            success: true,
            session: {
              email: user.email,
              name: user.name,
              role: user.role,
            },
          };
        }
      }
    } catch {
      // fallback
    }
  }

  return { success: false, error: 'Invalid email or password' };
}
