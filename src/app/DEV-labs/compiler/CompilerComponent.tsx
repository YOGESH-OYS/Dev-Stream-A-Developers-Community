'use client'

import { useState, useEffect } from 'react';
import { CompilerComponentProps, QuestionData, TestCaseResult } from './types';
import { QuestionDisplay } from './components/QuestionDisplay';
import { SplitScreenEditor } from './components/SplitScreenEditor';
import { TestCaseManager } from './components/TestCaseManager';
import { RevealConfirmationModal } from './components/RevealConfirmationModal';
import { useTestCases } from './hooks/useTestCases';
import { useToast } from './hooks/use-toast';

// Mock question data for development
const mockQuestionData: QuestionData = {
  question: {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    timeLimit: 1000,
    memoryLimit: 256
  },
  testCases: {
    revealed: [
      {
        id: '1',
        questionId: 'two-sum',
        input: '[2,7,11,15], 9',
        expectedOutput: '[0,1]',
        isHidden: false,
        orderIndex: 1
      },
      {
        id: '2',
        questionId: 'two-sum',
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]',
        isHidden: false,
        orderIndex: 2
      }
    ],
    hidden: []
  },
  starterCode: {
    javascript: `var twoSum = function(nums, target) {
    // Your code here
    
};`,
    python: `def twoSum(nums, target):
    # Your code here
    pass`,
    cpp: `#include<vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    
}`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
}`,
    c: `#include<stdio.h>
#include<stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Your code here
    
}`
  }
};

export function CompilerComponent({ 
  questionData,
  onSubmit,
  onPointDeduction,
  initialLanguage = 'javascript',
  className = '',
  userId = 'guest',
}: CompilerComponentProps) {
  const [showHiddenTestCases, setShowHiddenTestCases] = useState(false);
  const [userPoints, setUserPoints] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestCaseId, setSelectedTestCaseId] = useState<string>('');
  
  const { toast } = useToast();
  
  const {
    hiddenTestCases,
    revealedTestCaseIds,
    isRevealing,
    revealTestCase,
    setHiddenTestCases,
  } = useTestCases();

  // Use provided question data or mock data
  const currentQuestionData = questionData || mockQuestionData;

  const handleSubmitComplete = (results: { results: TestCaseResult[] }) => {
    if (results.results && results.results.length > 0) {
      // Filter hidden test case results
      const hiddenResults = results.results.filter(result => result.isHidden);
      setHiddenTestCases(hiddenResults);
      setShowHiddenTestCases(true);
      
      if (onSubmit) {
        onSubmit({
          totalPassed: results.results.filter(r => r.status === 'passed').length,
          totalTests: results.results.length,
          executionTime: Math.max(...results.results.map(r => r.executionTime || 0)),
          memoryUsed: Math.max(...results.results.map(r => r.memoryUsed || 0)),
          detailedResults: results.results,
        });
      }

      toast({
        title: "Submission Complete",
        description: `Your solution has been evaluated against all test cases.`,
      });
    }
  };

  const handleRevealTestCase = (testCaseId: string) => {
    setSelectedTestCaseId(testCaseId);
    setIsModalOpen(true);
  };

  const handleConfirmReveal = async () => {
    if (!selectedTestCaseId || userPoints < 1) return;

    try {
      const result = await revealTestCase(userId, selectedTestCaseId);
      
      if (result) {
        setUserPoints(result.remainingPoints);
        
        if (onPointDeduction) {
          onPointDeduction(1);
        }

        toast({
          title: "Test Case Revealed",
          description: `You have ${result.remainingPoints} points remaining.`,
        });
      } else {
        toast({
          title: "Reveal Failed",
          description: "Unable to reveal test case. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reveal test case.",
        variant: "destructive",
      });
    } finally {
      setIsModalOpen(false);
      setSelectedTestCaseId('');
    }
  };

  const handleRunSingleTestCase = (testCaseId: string) => {
    toast({
      title: "Running Test Case",
      description: `Executing test case ${testCaseId}...`,
    });
  };

  return (
    <div className={`max-w-7xl mx-auto space-y-16 ${className}`} data-testid="compiler-component">
      {/* Question Display Section */}
      {currentQuestionData && (
        <QuestionDisplay question={currentQuestionData.question} />
      )}

      {/* Split Screen Editor Section */}
      {currentQuestionData && (
        <SplitScreenEditor
          questionId={currentQuestionData.question.id}
          starterCode={currentQuestionData.starterCode}
          userId={userId}
          onSubmitComplete={handleSubmitComplete}
        />
      )}

      {/* Test Case Management Section */}
      {currentQuestionData && (
        <TestCaseManager
          questionId={currentQuestionData.question.id}
          revealedTestCases={currentQuestionData.testCases.revealed}
          hiddenTestCases={hiddenTestCases}
          userId={userId}
          userPoints={userPoints}
          onRevealTestCase={handleRevealTestCase}
          onRunSingleTestCase={handleRunSingleTestCase}
          showHidden={showHiddenTestCases}
        />
      )}

      {/* Reveal Confirmation Modal */}
      <RevealConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReveal}
        userPoints={userPoints}
        isRevealing={isRevealing}
      />
    </div>
  );
}

export default CompilerComponent;
export type { CompilerComponentProps, QuestionData, TestResults, TestCaseResult } from './types';
