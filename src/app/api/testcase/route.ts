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
    console.log("IN ROUTE.ts");
    const body = await request.json();
    const validatedData = UserDataSchema.parse(body.data);

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('dev-stream-auth-cookie')?.value;
    let userData = null;
    let user = null;

    if (token) {
      const payload = verifySessionToken(token);
      if (payload) {
        user = await User.findById(payload.userId).select('-passwordHash');
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
          };
        }
      }
    }

    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 1️⃣ create testcase
    const testcase = await TCdata.create({
      user_Id: userData.username,
      ...validatedData
    });
    const chatId = String(testcase._id);

    // 2️⃣ add the chat id (string) at the top of chats array
    await User.findByIdAndUpdate(
      user?._id,
      {
        $push: {
          chats: {
            $each: [chatId], // 👈 make sure it’s a string
            $position: 0
          }
        }
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: 'Test case created successfully',
        testcase_id: testcase._id
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.errors);
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



// testCases: {
//   revealed: [
//     {
//       id: '1',
//       questionId: 'two-sum',
//       input: '[2,7,11,15], 9',
//       expectedOutput: '[0,1]',
//       isHidden: false,
//       orderIndex: 1
//     },
//     {
//       id: '2',
//       questionId: 'two-sum',
//       input: '[3,2,4], 6',
//       expectedOutput: '[1,2]',
//       isHidden: false,
//       orderIndex: 2
//     }
//   ],
//   hidden: []
// },