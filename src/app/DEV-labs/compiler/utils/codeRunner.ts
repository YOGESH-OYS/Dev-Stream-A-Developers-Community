import { TestCase, TestCaseResult, Language } from '../types';

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

// Mock API request function for development
async function mockApiRequest(method: string, url: string, data?: any): Promise<Response> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Mock response based on the endpoint
  if (url.includes('/api/run-code')) {
    const mockResults: TestCaseResult[] = [
      {
        testCaseId: '1',
        status: 'passed',
        actualOutput: '[0,1]',
        executionTime: Math.floor(Math.random() * 3) + 1,
        memoryUsed: 14 + Math.random() * 0.5,
        isHidden: false,
      },
      {
        testCaseId: '2',
        status: 'passed',
        actualOutput: '[1,2]',
        executionTime: Math.floor(Math.random() * 3) + 1,
        memoryUsed: 14 + Math.random() * 0.5,
        isHidden: false,
      },
    ];
    
    return new Response(JSON.stringify({
      status: 'success',
      results: mockResults,
      totalPassed: mockResults.length,
      totalTests: mockResults.length,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  if (url.includes('/api/submit')) {
    const mockResults: TestCaseResult[] = [
      {
        testCaseId: '1',
        status: 'passed',
        actualOutput: '[0,1]',
        executionTime: Math.floor(Math.random() * 3) + 1,
        memoryUsed: 14 + Math.random() * 0.5,
        isHidden: false,
      },
      {
        testCaseId: '2',
        status: 'passed',
        actualOutput: '[1,2]',
        executionTime: Math.floor(Math.random() * 3) + 1,
        memoryUsed: 14 + Math.random() * 0.5,
        isHidden: false,
      },
      {
        testCaseId: '3',
        status: Math.random() > 0.3 ? 'passed' : 'failed',
        actualOutput: Math.random() > 0.3 ? '[2,3]' : '[1,3]',
        executionTime: Math.floor(Math.random() * 5) + 1,
        memoryUsed: 14 + Math.random() * 1,
        isHidden: true,
      },
      {
        testCaseId: '4',
        status: Math.random() > 0.2 ? 'passed' : 'failed',
        actualOutput: Math.random() > 0.2 ? '[0,4]' : '[1,4]',
        executionTime: Math.floor(Math.random() * 5) + 1,
        memoryUsed: 14 + Math.random() * 1,
        isHidden: true,
      },
    ];
    
    return new Response(JSON.stringify({
      submissionId: `sub_${Date.now()}`,
      status: 'completed',
      passedTestCases: mockResults.filter(r => r.status === 'passed').length,
      totalTestCases: mockResults.length,
      results: mockResults,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}

export class CodeRunner {
  static async runCode(request: RunCodeRequest): Promise<RunCodeResponse> {
    const response = await mockApiRequest('POST', '/api/run-code', request);
    return await response.json();
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
