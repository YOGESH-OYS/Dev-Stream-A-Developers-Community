import { useState, useCallback } from 'react';
import { TestCase, TestCaseResult } from '../types';

interface UseTestCasesReturn {
  hiddenTestCases: TestCaseResult[];
  revealedTestCaseIds: Set<string>;
  isRevealing: boolean;
  revealTestCase: (userId: string, testCaseId: string) => Promise<{ testCase: TestCase; remainingPoints: number } | null>;
  setHiddenTestCases: (testCases: TestCaseResult[]) => void;
}

export function useTestCases(): UseTestCasesReturn {
  const [hiddenTestCases, setHiddenTestCases] = useState<TestCaseResult[]>([]);
  const [revealedTestCaseIds, setRevealedTestCaseIds] = useState<Set<string>>(new Set());
  const [isRevealing, setIsRevealing] = useState(false);

  const revealTestCase = useCallback(async (userId: string, testCaseId: string) => {
    if (revealedTestCaseIds.has(testCaseId) || isRevealing) {
      return null;
    }

    setIsRevealing(true);
    try {
      // Mock API call for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockTestCase: TestCase = {
        id: testCaseId,
        questionId: 'two-sum',
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]',
        isHidden: false,
        orderIndex: 1,
      };
      
      const mockResponse = {
        testCase: mockTestCase,
        remainingPoints: 99, // Mock remaining points
      };
      
      setRevealedTestCaseIds(prev => new Set([...Array.from(prev), testCaseId]));
      
      return mockResponse;
    } catch (error) {
      console.error('Failed to reveal test case:', error);
      return null;
    } finally {
      setIsRevealing(false);
    }
  }, [revealedTestCaseIds, isRevealing]);

  return {
    hiddenTestCases,
    revealedTestCaseIds,
    isRevealing,
    revealTestCase,
    setHiddenTestCases,
  };
}
