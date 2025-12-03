console.log("IN types")

export interface CompilerComponentProps {
  onSubmit?: (results: TestResults) => void;
  onPointDeduction?: (points: number) => void;
  initialLanguage?: string;
  className?: string;
  userId?: string;
  testcaseData ?: TestCase_Model | null
}

export interface QuestionData {
  question: Question;
  testCases: TestCase[];
  starterCode: Record<string, string>;
}

export interface Question {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  examples: Example[];
  constraints: string[];
  timeLimit?: number;
  memoryLimit?: number;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCases {
  revealed: TestCase[];
  hidden: TestCase[];
}

export interface TestCase {
  id: string;
  questionId: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  orderIndex: number;
}

export interface TestResults {
  totalPassed: number;
  totalTests: number;
  executionTime: number;
  memoryUsed: number;
  detailedResults: TestCaseResult[];
}

export interface TestCaseResult {
  testCaseId: string;
  status: 'passed' | 'failed' | 'timeout' | 'error';
  actualOutput?: string;
  executionTime?: number;
  memoryUsed?: number;
  errorMessage?: string;
  isHidden?: boolean;
}

export interface ExecutionStats {
  executionTime: string;
  memoryUsage: string;
  executionStatus: string;
}

export interface SubmissionResult {
  submissionId: string;
  status: string;
  passedTestCases: number;
  totalTestCases: number;
  results: TestCaseResult[];
}

export interface UserPoints {
  id: string;
  userId: string;
  points: number;
  updatedAt: Date;
}

export interface RevealedTestCaseData {
  testCase: TestCase;
  remainingPoints: number;
}

export type Language = 'javascript' | 'python' | 'cpp' | 'java' | 'c' ;

export interface LanguageConfig {
  label: string;
  value: Language;
  monacoLanguage: string;
  fileExtension: string;
}

export interface MonacoEditorConfig {
  theme: string;
  automaticLayout: boolean;
  fontSize: number;
  fontFamily: string;
  minimap: { enabled: boolean };
  scrollBeyondLastLine: boolean;
  wordWrap: string;
  lineNumbers: string;
  renderWhitespace: string;
  bracketPairColorization: { enabled: boolean };
  guides: { bracketPairs: boolean };
  formatOnPaste: boolean;
  formatOnType: boolean;
}

export interface RequestBody {
  source_code: string;
  language_id: number;
  number_of_runs: number | null;
  stdin: string;
  expected_output: string | null;
  cpu_time_limit: number | null;
  cpu_extra_time: number | null;
  wall_time_limit: number | null;
  memory_limit: number | null;
  stack_limit: number | null;
  max_processes_and_or_threads: number | null;
  enable_per_process_and_thread_time_limit: boolean | null;
  enable_per_process_and_thread_memory_limit: boolean | null;
  max_file_size: number | null;
  enable_network: boolean | null;
}

interface TestCase_Model{
  user_Id:string;
  title : string;
  question_id : string;
  difficulty:string;
  question : string;
  examples : Example[];
  constraints :string[];
  testcases :TestCase[];
}

// https://youtu.be/do3a2tmlabw?si=sOOW4z18QQI_9nIk