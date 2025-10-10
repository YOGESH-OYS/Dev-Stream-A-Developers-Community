import mongoose , {Model,Document,Schema} from 'mongoose'
import { Example, TestCase } from '@/app/DEV-labs/compiler/types'

export interface TestCase_Model extends Document{
  title : string;
  question_id : string;
  question : string;
  examples : Example[];
  constraints :string[];
  testcases :TestCase[];
}

try { mongoose.deleteModel('Testcase') } catch {}

// Subschema for Example
const exampleSchema = new Schema<Example>({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String }
});

// Subschema for TestCase
const testCaseSchema = new Schema<TestCase>({
  id: { type: String, required: true },
  questionId: { type: String, required: true },
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, required: true },
  orderIndex: { type: Number, required: true }
});

// Main schema combining everything
const UserDataSchema = new Schema<TestCase_Model>({
  title: {type:String , required:true},
  question_id: {type:String , required:true},
  question: {type:String , required:true},
  examples: {type:[exampleSchema],required:true},
  constraints: {type:[String],required: true},
  testcases: {type:[testCaseSchema],required:true}
});

const TCdata : Model<TestCase_Model> = mongoose.model<TestCase_Model>('Testcase',UserDataSchema)

export default TCdata;