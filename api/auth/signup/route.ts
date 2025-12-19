// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createSession, setSessionCookie, isValidEmail, isValidPassword } from '@/lib/auth';

// Mock database - Replace with your actual database
const users = new Map();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Check if user exists
    if (users.has(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = crypto.randomUUID();
    const user = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.set(email, user);

    // Create session
    const token = await createSession(userId, email);
    await setSessionCookie(token);

    return NextResponse.json(
      { 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        },
        message: 'User created successfully' 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}





// ============================================================================
// middleware.ts (Optional - for protecting routes)
import { verifySession } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const session = await verifySession(token);
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};