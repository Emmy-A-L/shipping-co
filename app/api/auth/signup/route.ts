// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createSession, setSessionCookie, isValidEmail, isValidPassword } from '@/lib/auth';
import { User } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, userId, Address, phone, role = 'customer' } = await req.json();
    
    // Validate input
    if (!email || !password || !name || !userId || !Address || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // validate password
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // connect to db
    await clientPromise;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    // Create session
    const token = await createSession(userId, email);
    await setSessionCookie(token);
    
    // create user
    const newUser = await User.create({
      userId,
      email,
      // Fix: name needs to be split or User model updated. 
      // User model has firstName, lastName, otherName. 
      // The incoming payload has 'name'. I will parse it.
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || ' ', // fallback
      Address,
      phone,
      role,
      password: hashedPassword,
      createdAt: new Date()
    });

    return NextResponse.json(
      { 
        user: { 
          id: newUser.userId, 
          email: newUser.email, 
          name: `${newUser.firstName} ${newUser.lastName}`.trim()
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