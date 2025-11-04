import { connectDB } from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import TCdata from "@/models/Testcasemodel";
import { cookies } from 'next/headers'
import z from 'zod'
import { verifySessionToken } from "@/lib/auth";
import User from "@/models/User";

// Define the Zod schema for the Example subdocument
export const exampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional(),
});

// Define the Zod schema for the TestCase subdocument
export const testCaseSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  input: z.string(),
  expectedOutput: z.string(),
  isHidden: z.boolean(),
  orderIndex: z.number(),
});

// Define the Zod schema for the main document
export const UserDataSchema = z.object({
  title: z.string(),
  question_id: z.string(),
  difficulty:z.string(),
  question: z.string(),
  examples: z.array(exampleSchema),
  constraints: z.array(z.string()),
  testcases: z.array(testCaseSchema),
});


export async function POST(request: Request) {
  try {
    let userData = null
    const body = await request.json();
    console.log(" IN ROUTE.ts ")
    console.log(body)
    const validatedData = UserDataSchema.parse(body.data);

    await connectDB();
    const cookieStore = await cookies()
		const token = cookieStore.get('dev-stream-auth-cookie')?.value
    
		if (token) {
			const payload = verifySessionToken(token)
			if (payload) {
				const user = await User.findById(payload.userId).select('-passwordHash')
				if (user) {
					userData = {
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						linkedin: user.linkedin,
						github: user.github,
						bio: user.bio,
						createdAt: user.createdAt
					}
				}
			}
		}

    if (userData) {
      const testcase = await TCdata.create({ user_Id: userData.username , ...validatedData });
      return NextResponse.json({ message: 'Test case created successfully', testcase_id: testcase._id }, { status: 201 });
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.errors)
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
