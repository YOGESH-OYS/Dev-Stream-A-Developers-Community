import { error } from 'console';
import { TestCase, TestCaseResult, Language } from '../../DEV-labs/compiler/types/index';


// Mock API request function for development
export async function mockApiRequest(method: string, url: string, data?: any): Promise<Response> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));















  // Mock response based on the endpoint
  if (url.includes('/api/run-code')) {
    try {
      // data already contains the request body
      const language_id = 62;
      const source_code = data.code;

      console.log(source_code);
      
      // 1. Submit code to Judge0
      const submitRes = await fetch("http://13.233.229.250:2358/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin: "Judge0\nverti",
          expected_output: null
        }),
      });

      console.log(submitRes);
      
      const submitData = await submitRes.json();
      const token = submitData.token;
  
      console.log(token);
      // 2. Poll for result
      let result = null;
  
      while (true) {
        const checkRes = await fetch(
          `http://13.233.229.250:2358/submissions/${token}`
        );

        const checkData = await checkRes.json();
        console.log(checkData);
  
        if (checkData.status && checkData.status.id >= 3) {
          result = checkData;
          break;
        }
  
        await new Promise((r) => setTimeout(r, 300));
      }

      console.log("result",result);

      return new Response(JSON.stringify({
        status: 'success',
        results: result.stdout ?? '',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Error in running code" }),
        { status: 500 }
      );
    }

    
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