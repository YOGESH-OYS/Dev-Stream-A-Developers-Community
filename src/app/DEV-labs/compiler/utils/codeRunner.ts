import { TestCase, TestCaseResult, Language } from '../types';
import { mockApiRequest } from '@/app/api/compiler/route';

export interface ProcessUrl{
  url: string;
}

export interface ProcessUrlResponse {
  status: string;
  url: string;
}

export interface RunCodeRequest {
  questionId: string;
  language: Language;
  code: string;
  userId?: string;
}

export interface RunCodeResponse {
  status: string;
  results: TestCaseResult[];
  totalPassed: number;
  totalTests: number;
}

export interface SubmitCodeResponse {
  submissionId: string;
  status: string;
  passedTestCases: number;
  totalTestCases: number;
  results: TestCaseResult[];
}

export class CodeRunner {

  static async runCode(request: RunCodeRequest): Promise<RunCodeResponse> {
    const response = await mockApiRequest('POST', '/api/run-code', request);
    return await response.json();
  }

  static async processUrl(request: ProcessUrl): Promise<Response> {
    console.log(request.url);
    const response = await fetch('http://localhost:5678/webhook/1ea07b22-946c-411c-9685-2587bb7c9199', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    const res: ProcessUrlResponse = await response.json();
    
    return response
  }

  static async submitCode(request: RunCodeRequest): Promise<SubmitCodeResponse> {
    const response = await mockApiRequest('POST', '/api/submit', request);
    return await response.json();
  }

  static formatExecutionTime(timeMs?: number): string {
    if (timeMs === undefined || timeMs === null) return '--';
    return `${timeMs}ms`;
  }

  static formatMemoryUsage(memoryMB?: number): string {
    if (memoryMB === undefined || memoryMB === null) return '--';
    return `${memoryMB.toFixed(1)}MB`;
  }

  static getStatusIcon(status: string): string {
    switch (status) {
      case 'passed':
        return '✓';
      case 'failed':
        return '✗';
      case 'timeout':
        return '⏱';
      case 'error':
        return '⚠';
      default:
        return '?';
    }
  }

  static getStatusColor(status: string): string {
    switch (status) {
      case 'passed':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      case 'timeout':
        return 'text-yellow-400';
      case 'error':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  }

  static formatTestCaseOutput(output: string): string {
    try {
      // Try to parse and pretty-print JSON
      const parsed = JSON.parse(output);
      return JSON.stringify(parsed);
    } catch {
      // Return as-is if not valid JSON
      return output;
    }
  }

  static validateCode(code: string, language: Language): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!code.trim()) {
      errors.push('Code cannot be empty');
      return { isValid: false, errors };
    }

    // Language-specific validation
    switch (language) {
      case 'javascript':
        if (!code.includes('function') && !code.includes('=>')) {
          errors.push('JavaScript solution should contain a function');
        }
        break;
      case 'python':
        if (!code.includes('def ')) {
          errors.push('Python solution should contain a function definition');
        }
        break;
      case 'java':
        if (!code.includes('class') || !code.includes('public')) {
          errors.push('Java solution should contain a public class with method');
        }
        break;
      case 'cpp':
      case 'c':
        if (!code.includes('#include')) {
          errors.push(`${language.toUpperCase()} solution should include necessary headers`);
        }
        break;
    }

    return { isValid: errors.length === 0, errors };
  }
}
