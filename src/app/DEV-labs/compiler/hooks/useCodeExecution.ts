import { useState,useEffect, useCallback } from 'react';
import { Language, TestCase, TestCaseResult, ExecutionStats } from '../types';
import { CodeRunner, CodeRequest } from '../utils/codeRunner';

interface UseCodeExecutionReturn {
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  isRunning: boolean;
  isCompiling : boolean;
  isSubmitting: boolean;
  executionStats: ExecutionStats;
  consoleOutput: string;
  // Run visible/public test cases against user's code and return per-test results
  runCode: ( questionId: string, language: Language, code: string, userId?: string, publicTestcases?: TestCase[],) => Promise<TestCaseResult[]>;
  compileCode: (questionId: string, language: Language, code: string, userId?: string, customInput?: string) => Promise<void>;
  submitCode: (questionId: string, language: Language, code: string, userId?: string, testcaseId?: string) => Promise<TestCaseResult[]>;
  clearOutput: () => void;
  setConsoleOutput: (output: string) => void;
}

export function useCodeExecution(): UseCodeExecutionReturn {

  const [output , setOutput] = useState<string>('');

  useEffect(() => {
    if (output) {
      console.log('Output updated', output);
    }
  }, [output]);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompiling, setCompiling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionStats, setExecutionStats] = useState<ExecutionStats>(
    {
      executionTime: '--',
      memoryUsage: '--',
      executionStatus: 'Ready',
    }
  );
  const [consoleOutput, setConsoleOutput] = useState(`
    <div class="flex items-center gap-2">
      <i class="fas fa-terminal text-primary"></i>
      <span>Ready to execute code...</span>
    </div>
    <div class="text-xs text-muted-foreground mt-4">
      Click "Run Code" to test against sample cases or "Submit" to run all test cases.
    </div>
  `);

  const runCode = useCallback(
    async ( questionId: string, language: Language, code: string, userId?: string,publicTestcases: TestCase[] = [],
    ): Promise<TestCaseResult[]> => {

      if (isRunning || isSubmitting || isCompiling) return [];

      setIsRunning(true);
      setExecutionStats(prev => ({ ...prev, executionStatus: 'Running...' }));
      setConsoleOutput(`
        <div class="flex items-center gap-2 text-primary">
          <div class="spinner"></div>
          <span>Executing your ${language} solution on sample test cases...</span>
        </div>
      `);

      const aggregatedResults: TestCaseResult[] = [];

      try {
        for (const tc of publicTestcases) {
          const request: CodeRequest = {
            questionId,
            language,
            code,
            userId,
            stdin: tc.input,
          };

          const response = await CodeRunner.runCode(request);
          const judge = response.results;
          const rawOutput = (judge.stdout ?? judge.stderr ?? '').trim();
          const expected = (tc.expectedOutput ?? '').trim();
          const passed = rawOutput === expected;

          aggregatedResults.push({
            testCaseId: tc.id,
            status: passed ? 'passed' : 'failed',
            actualOutput: rawOutput,
            executionTime: Number(judge.time) || 0,
            memoryUsed: Number(judge.memory) || 0,
            isHidden: false,
          });
        }

        const maxTime = Math.max(...aggregatedResults.map(r => r.executionTime || 0), 0);
        const maxMemory = Math.max(...aggregatedResults.map(r => r.memoryUsed || 0), 0);

        setExecutionStats({
          executionTime: CodeRunner.formatExecutionTime(maxTime),
          memoryUsage: CodeRunner.formatMemoryUsage(maxMemory),
          executionStatus: 'Completed',
        });

        const totalCount = aggregatedResults.length;
        const passedCount = aggregatedResults.filter(r => r.status === 'passed').length;

        const outputHtml = `
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-green-400">
              <i class="fas fa-check-circle"></i>
              <span>Ran ${totalCount} sample test case${totalCount === 1 ? '' : 's'}</span>
            </div>
            <div class="text-sm text-muted-foreground">
              ${passedCount}/${totalCount} passed.
            </div>
          </div>
        `;

        setConsoleOutput(outputHtml);
        return aggregatedResults;
      } catch (error) {
        console.error('Code execution failed:', error);
        setExecutionStats(prev => ({ ...prev, executionStatus: 'Error' }));
        setConsoleOutput(`
          <div class="flex items-center gap-2 text-red-400">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Execution failed</span>
          </div>
          <div class="text-sm text-muted-foreground mt-2">
            ${error instanceof Error ? error.message : 'Unknown error occurred'}
          </div>
        `);
        return [];
      } finally {
        setIsRunning(false);
      }
    },
    [isRunning, isSubmitting, isCompiling],
  );

  const compileCode = useCallback(async (questionId: string, language: Language, code: string, userId?: string, customInput?: string) => {
    if (isRunning || isSubmitting || isCompiling) return;

    setCompiling(true);
    setExecutionStats(prev => ({ ...prev, executionStatus: 'Compiling...' }));
    setConsoleOutput(`
      <div class="flex items-center gap-2 text-primary">
        <div class="spinner"></div>
        <span>Compiling your ${language} solution...</span>
      </div>
    `);

    try {
      const request: CodeRequest = {
        questionId,
        language,
        code,
        userId,
        stdin: customInput ?? '',
      };

      const response = await CodeRunner.compileCode(request);
      const maxTime = response.results.time;
      const maxMemory = response.results.memory;

      setExecutionStats({
        executionTime: maxTime,
        memoryUsage: maxMemory,
        executionStatus: response.status,
      });

      const outputHtml = `
        <div class="space-y-3">
          <div class="flex items-center gap-2 ${CodeRunner.getStatusColor(response.status)}">
            <i class="fas fa-check-circle"></i>
            <span>Compilation successful</span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
            <pre class="text-sm text-white">${response.results.stdout ?? ""}</pre>
            </div>
          </div>
          <div class="space-y-2">
              <div class="flex justify-between">
                  <pre class="text-sm ${CodeRunner.getStatusColor(response.status)}">
                    ${response.results.stderr ?? ""}
                  </pre>
              </div>
          </div>
        </div>
      `;

      setConsoleOutput(outputHtml);
    } 
    catch (error) {
      console.error('Code execution failed:', error);
      setExecutionStats(prev => ({ ...prev, executionStatus: 'Error' }));
      setConsoleOutput(`
        <div class="flex items-center gap-2 text-red-400">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Execution failed</span>
        </div>
        <div class="text-sm text-muted-foreground mt-2">
          ${error instanceof Error ? error.message : 'Unknown error occurred'}
        </div>
      `);
    } 
    finally {
      setCompiling(false);
    }
  }, [isRunning, isSubmitting, isCompiling]);

  const submitCode = useCallback(async (questionId: string, language: Language, code: string, userId?: string, testcaseId?: string): Promise<TestCaseResult[]> => {
    if (isRunning || isSubmitting) return [];

    setIsSubmitting(true);
    setExecutionStats(prev => ({ ...prev, executionStatus: 'Submitting...' }));
    setConsoleOutput(`
      <div class="flex items-center gap-2 text-primary">
        <div class="spinner"></div>
        <span>Submitting your ${language} solution...</span>
      </div>
    `);

    try {
      const response = await CodeRunner.submitCode({
        questionId,
        language,
        code,
        userId,
        testcaseId,
      });
      
      const passedCount = response.passedTestCases;
      const totalCount = response.totalTestCases;
      const maxTime = Math.max(...response.results.map(r => r.executionTime || 0));
      const maxMemory = Math.max(...response.results.map(r => r.memoryUsed || 0));

      setExecutionStats({
        executionTime: CodeRunner.formatExecutionTime(maxTime),
        memoryUsage: CodeRunner.formatMemoryUsage(maxMemory),
        executionStatus: 'Submitted',
      });

      const outputHtml = `
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-green-400">
            <i class="fas fa-check-circle"></i>
            <span>Compilation successful</span>
          </div>
          <div class="text-sm text-muted-foreground">
            Running ${totalCount} test cases...
          </div>
          <div class="space-y-2">
            ${response.results.slice(0, 2).map((result, index) => `
              <div class="flex justify-between">
                <span>Test Case ${index + 1}: </span>
                <span class="${CodeRunner.getStatusColor(result.status)}">
                  ${CodeRunner.getStatusIcon(result.status)} ${result.status === 'passed' ? 'Passed' : 'Failed'} (${CodeRunner.formatExecutionTime(result.executionTime)})
                </span>
              </div>
            `).join('')}
            ${response.results.slice(2).map((result, index) => `
              <div class="flex justify-between">
                <span>Test Case ${index + 3}: </span>
                <span class="${CodeRunner.getStatusColor(result.status)}">
                  ${CodeRunner.getStatusIcon(result.status)} ${result.status === 'passed' ? 'Passed' : 'Failed'} (${CodeRunner.formatExecutionTime(result.executionTime)})
                </span>
              </div>
            `).join('')}
          </div>
          <div class="border-t border-border pt-3">
            <div class="${passedCount === totalCount ? 'text-green-400' : 'text-yellow-400'} font-semibold">
              Results: ${passedCount}/${totalCount} test cases passed (${((passedCount / totalCount) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
      `;

      setConsoleOutput(outputHtml);
      return response.results;
    } catch (error) {
      console.error('Code submission failed:', error);
      setExecutionStats(prev => ({ ...prev, executionStatus: 'Error' }));
      setConsoleOutput(`
        <div class="flex items-center gap-2 text-red-400">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Submission failed</span>
        </div>
        <div class="text-sm text-muted-foreground mt-2">
          ${error instanceof Error ? error.message : 'Unknown error occurred'}
        </div>
      `);
      return [];
    } finally {
      setIsSubmitting(false);
    }
  }, [isRunning, isSubmitting, isCompiling]);

  const clearOutput = useCallback(() => {
    setConsoleOutput(`
      <div class="flex items-center gap-2">
        <i class="fas fa-terminal text-primary"></i>
        <span>Output cleared</span>
      </div>
    `);
    setExecutionStats({
      executionTime: '--',
      memoryUsage: '--',
      executionStatus: 'Ready',
    });
  }, []);

  return {
    isRunning,
    setOutput,
    isSubmitting,
    isCompiling,
    executionStats,
    consoleOutput,
    runCode,
    compileCode,
    submitCode,
    clearOutput,
    setConsoleOutput,
  };
}
