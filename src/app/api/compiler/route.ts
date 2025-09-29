import { TestCase, TestCaseResult, Language } from '../../DEV-labs/compiler/types/index';


// Mock API request function for development
export async function mockApiRequest(method: string, url: string, data?: any): Promise<Response> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  if (url.includes('/api/runcode')) {

  }

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