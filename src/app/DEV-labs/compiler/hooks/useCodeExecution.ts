import { useState,useEffect, useCallback } from 'react';
import { Language, TestCaseResult, ExecutionStats } from '../types';
import { CodeRunner, RunCodeRequest } from '../utils/codeRunner';

interface UseCodeExecutionReturn {
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  isRunning: boolean;
  isSubmitting: boolean;
  executionStats: ExecutionStats;
  consoleOutput: string;
  runCode: (questionId: string, language: Language, code: string, userId?: string) => Promise<void>;
  submitCode: (questionId: string, language: Language, code: string, userId?: string) => Promise<TestCaseResult[]>;
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

  const runCode = useCallback(async (questionId: string, language: Language, code: string, userId?: string) => {
    if (isRunning || isSubmitting) return;

    setIsRunning(true);
    setExecutionStats(prev => ({ ...prev, executionStatus: 'Running...' }));
    setConsoleOutput(`
      <div class="flex items-center gap-2 text-primary">
        <div class="spinner"></div>
        <span>Executing your ${language} solution...</span>
      </div>
    `);

    try {
      const request: RunCodeRequest = {
        questionId,
        language,
        code,
        userId,
      };

      const response = await CodeRunner.runCode(request);
      
      const passedCount = response.totalPassed;
      const totalCount = response.totalTests;
      const maxTime = Math.max(...response.results.map(r => r.executionTime || 0));
      const maxMemory = Math.max(...response.results.map(r => r.memoryUsed || 0));

      setExecutionStats({
        executionTime: CodeRunner.formatExecutionTime(maxTime),
        memoryUsage: CodeRunner.formatMemoryUsage(maxMemory),
        executionStatus: passedCount === totalCount ? 'Passed' : 'Failed',
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
            ${response.results.map((result, index) => `
              <div class="flex justify-between">
                <span>Test Case ${index + 1}: </span>
                <span class="${CodeRunner.getStatusColor(result.status)}">
                  ${CodeRunner.getStatusIcon(result.status)} ${result.status === 'passed' ? 'Passed' : 'Failed'} (${CodeRunner.formatExecutionTime(result.executionTime)})
                </span>
              </div>
            `).join('')}
          </div>
          <div class="border-t border-border pt-3">
            <div class="${passedCount === totalCount ? 'text-green-400' : 'text-yellow-400'} font-semibold">
              ${passedCount === totalCount ? 'All sample test cases passed!' : `Results: ${passedCount}/${totalCount} test cases passed`}
              <br />
              ${output}
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
      setIsRunning(false);
    }
  }, [isRunning, isSubmitting]);

  const submitCode = useCallback(async (questionId: string, language: Language, code: string, userId?: string): Promise<TestCaseResult[]> => {
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
      const request: RunCodeRequest = {
        questionId,
        language,
        code,
        userId,
      };

      const response = await CodeRunner.submitCode(request);
      
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
  }, [isRunning, isSubmitting]);

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
    executionStats,
    consoleOutput,
    runCode,
    submitCode,
    clearOutput,
    setConsoleOutput,
  };
}
