// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createSession, setSessionCookie, isValidEmail, isValidPassword } from '@/lib/auth';
import { User } from '@/lib/models';
import clientPromise from '@/lib/mongoDb';

interface SignupRequestBody {
  email: string;
  password: string;
  firstName: string;
  otherName: string;
  lastName: string;
  Address: string;
  phone: string;
  role?: string;
}

export async function POST(req: NextRequest) {

  const { email, password, firstName, otherName, lastName, Address, phone, role = 'customer' }: SignupRequestBody = await req.json();

  
  try {
    
    // connect to db
    await clientPromise;
    
    // Validate input
    if (!email || !password || !firstName || !otherName || !lastName || !Address || !phone) {
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

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    
    // create user
    const newUser = await User.create({
      email,
      firstName,
      otherName,
      lastName,
      Address,
      phone,
      role,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Create session AFTER user is successfully created
    const token = await createSession(phone, email);
    await setSessionCookie(token);

    return NextResponse.json(
      { 
        user: { 
          id: newUser._id.toString(), 
          email,
          firstName,
          otherName,
          lastName,
          Address,
          phone,
          role,
          createdAt: new Date(),
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