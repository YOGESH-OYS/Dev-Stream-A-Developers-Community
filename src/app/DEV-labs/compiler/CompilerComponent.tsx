'use client'

import { useState, useEffect } from 'react';
import { CompilerComponentProps, QuestionData, TestCaseResult } from './types';
import { QuestionDisplay } from './components/QuestionDisplay';
import { SplitScreenEditor } from './components/SplitScreenEditor';
import { TestCaseManager } from './components/TestCaseManager';
import { RevealConfirmationModal } from './components/RevealConfirmationModal';
import { useTestCases } from './hooks/useTestCases';
import { useToast } from './hooks/use-toast';

export default function CompilerComponent({onSubmit,onPointDeduction,className = '',userId = 'guest',testcaseData}: CompilerComponentProps) {
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
  const currentQuestionData : QuestionData = {
    question: {
      id: testcaseData?.question_id || "",
      title: testcaseData?.title || "",
      difficulty: testcaseData?.difficulty || "",
      description: testcaseData?.question || "",
      examples: testcaseData?.examples || [],
      constraints: testcaseData?.constraints || [],
      timeLimit: 1000,
      memoryLimit: 256
    },
    testCases: testcaseData?.testcases || [],
    starterCode:{}
  };

  // const ai = ()=>{
  //   const va = currentQuestionData.testCases.revealed.map(v => v.isHidden)
  //   // console.log(va)
  // }

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
      <br />
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
          revealedTestCases={currentQuestionData.testCases.filter(reveal => !reveal.isHidden)}
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