import { connectDB } from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import TCdata from "@/models/Testcasemodel";
import z from 'zod'

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
  question: z.string(),
  examples: z.array(exampleSchema),
  constraints: z.array(z.string()),
  testcases: z.array(testCaseSchema),
});


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = UserDataSchema.parse(body);

    await connectDB();
    const testcase = await TCdata.create(validatedData);

    return NextResponse.json({ message: 'Test case created successfully', testcase }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
