import mongoose , {Model,Document,Schema} from 'mongoose'

interface Question {
  question_id : number
  question :string
}

interface Testcase{
  question_id :number
  type :string
  cases :string
}

try { mongoose.deleteModel('Testcase') } catch {}
// Inner schemas for clarity and reusability
const QuestionSchema = new Schema<Question>(
  {
    question_id: { type: Number, required: true },
    question: { type: String, required: true },
  },
  { _id: false }
);

const TestcaseSchema = new Schema<Testcase>(
  {
    question_id: { type: Number, required: true },
    type: { type: String, required: true },
    cases: { type: String, required: true },
  },
  { _id: false }
);


export interface TestCases extends Document{
  title :string
  timestamp :Date
  session :number
  testcase : {
    question : Question
    testcases : Testcase[]
  }
}

// Main schema combining everything
const UserDataSchema = new Schema<TestCases>({
  title: { type: String, required: true },
  timestamp: { type: Date, default: null },
  session: { type: Number, required: true },
  testcase: {
    question: { type: QuestionSchema, required: true },
    testcases: { type: [TestcaseSchema], required: true },
  }
});

const Userdata : Model<TestCases> = mongoose.model<TestCases>('Testcase',UserDataSchema)

export default Userdata