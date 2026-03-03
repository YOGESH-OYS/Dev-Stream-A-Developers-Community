import { TestCaseResult } from '../../DEV-labs/compiler/types/index';


// Mock API request function for development
export async function mockApiRequest(method: string, url: string, data?: any): Promise<Response> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Mock response based on the endpoint

  if (url.includes('/api/compile-code')) {
    try {
      // data: { questionId, language, code, userId?, stdin? }
      const language_id = 62;
      const source_code = data.code;
      const stdin = typeof data.stdin === 'string' ? data.stdin : '';

      // 1. Submit code to Judge0 (user's code + user's custom input)
      const submitRes = await fetch("http://3.7.107.147:2358/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin: stdin,
          expected_output: null
        }),
      });
      
      const submitData = await submitRes.json();
      const token = submitData.token;

      // 2. Poll for result
      let result = null;
  
      while (true) {
        const checkRes = await fetch(
          `http://3.7.107.147:2358/submissions/${token}`
        );

        const checkData = await checkRes.json();
  
        if (checkData.status && checkData.status.id >= 3) {
          result = checkData;
          break;
        }
  
        await new Promise((r) => setTimeout(r, 300));
      }

      if(result.stdout != null){
        return new Response(JSON.stringify({
          status: 'success',
          results: result ?? '',
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }else{
        return new Response(JSON.stringify({
          status: 'failed',
          results: result ?? '',
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }); 
      }
  
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Error in running code" }),
        { status: 500 }
      );
    } 
  }

  if (url.includes('/api/run-code')) {
    try {
      // data: { questionId, language, code, userId?, stdin? }
      const language_id = 62;
      const source_code = data.code;
      const stdin = typeof data.stdin === 'string' ? data.stdin : '';

      // 1. Submit code to Judge0 (user's code + input)
      const submitRes = await fetch("http://3.7.107.147:2358/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin: stdin,
          expected_output: null
        }),
      });
      
      const submitData = await submitRes.json();
      const token = submitData.token;

      // 2. Poll for result
      let result = null;
  
      while (true) {
        const checkRes = await fetch(
          `http://3.7.107.147:2358/submissions/${token}`
        );

        const checkData = await checkRes.json();
  
        if (checkData.status && checkData.status.id >= 3) {
          result = checkData;
          break;
        }
  
        await new Promise((r) => setTimeout(r, 300));
      }
      
      // Mirror compile-code format: status + full Judge0 result payload
      if (result && result.stdout != null) {
        return new Response(JSON.stringify({
          status: 'success',
          results: result,
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({
          status: 'failed',
          results: result,
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Error in running code" }),
        { status: 500 }
      );
    }
  }

  if (url.includes('/api/submit')) {
    // data: { questionId, language, code, userId?, testcaseId? }
    const testcaseId = data?.testcaseId;
    if (!testcaseId) {
      return new Response(JSON.stringify({ error: 'testcaseId required for submit' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const TCdata = (await import('@/models/Testcasemodel')).default;
    const testcaseDoc = await TCdata.findById(testcaseId).lean();
    if (!testcaseDoc || !testcaseDoc.testcases?.length) {
      return new Response(JSON.stringify({ error: 'Testcase not found or no test cases' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const language_id = 62;
    const source_code = data.code;
    const JUDGE_BASE = 'http://3.7.107.147:2358';

    const results: TestCaseResult[] = [];
    for (let i = 0; i < testcaseDoc.testcases.length; i++) {
      const tc = testcaseDoc.testcases[i];
      try {
        const submitRes = await fetch(`${JUDGE_BASE}/submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language_id,
            source_code,
            stdin: tc.input ?? '',
            expected_output: tc.expectedOutput ?? null,
          }),
        });
        const submitData = await submitRes.json();
        const token = submitData.token;

        let result: { stdout?: string; stderr?: string; status?: { id: number } } | null = null;
        while (true) {
          const checkRes = await fetch(`${JUDGE_BASE}/submissions/${token}`);
          const checkData = await checkRes.json();
          if (checkData.status && checkData.status.id >= 3) {
            result = checkData;
            break;
          }
          await new Promise((r) => setTimeout(r, 300));
        }

        const statusId = result?.status?.id ?? 6;
        const passed = statusId === 3;
        const actualOutput = result?.stdout ?? result?.stderr ?? '';
        results.push({
          testCaseId: tc.id ?? String(i + 1),
          status: passed ? 'passed' : 'failed',
          actualOutput: actualOutput.trim().slice(0, 200),
          executionTime: 0,
          memoryUsed: 0,
          isHidden: tc.isHidden ?? false,
        });
      } catch (err) {
        results.push({
          testCaseId: tc.id ?? String(i + 1),
          status: 'error',
          actualOutput: undefined,
          errorMessage: err instanceof Error ? err.message : 'Execution error',
          isHidden: tc.isHidden ?? false,
        });
      }
    }

    const passedTestCases = results.filter((r) => r.status === 'passed').length;
    return new Response(JSON.stringify({
      submissionId: `sub_${Date.now()}`,
      status: 'completed',
      passedTestCases,
      totalTestCases: results.length,
      results,
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