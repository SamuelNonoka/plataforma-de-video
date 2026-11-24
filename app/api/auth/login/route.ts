import { LoginFormSchema } from '@/app/lib/validations/LoginValidation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = LoginFormSchema.parse(await request.json());
    return new NextResponse('it works');
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
