export interface CompilerComponentProps {
  questionData?: QuestionData;
  onSubmit?: (results: TestResults) => void;
  onPointDeduction?: (points: number) => void;
  initialLanguage?: string;
  className?: string;
  userId?: string;
}

export interface QuestionData {
  question: Question;
  testCases: TestCases;
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

export type Language = 'javascript' | 'python' | 'cpp' | 'java' | 'c';

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
