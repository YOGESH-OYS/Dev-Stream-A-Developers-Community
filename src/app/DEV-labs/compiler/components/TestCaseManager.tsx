import { useState, useEffect } from 'react';
import { TestCase, TestCaseResult } from '../types';
import { Button } from './ui/button';
import { Eye, Play, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { CodeRunner } from '../utils/codeRunner';

interface TestCaseManagerProps {
  questionId: string;
  revealedTestCases: TestCase[];
  hiddenTestCases?: TestCaseResult[];
  userId?: string;
  userPoints?: number;
  onRevealTestCase?: (testCaseId: string) => void;
  onRunSingleTestCase?: (testCaseId: string) => void;
  showHidden?: boolean;
}

export function TestCaseManager({
  questionId,
  revealedTestCases,
  hiddenTestCases = [],
  userId,
  userPoints = 100,
  onRevealTestCase,
  onRunSingleTestCase,
  showHidden = false,
}: TestCaseManagerProps) {
  const [testCaseResults, setTestCaseResults] = useState<Record<string, TestCaseResult>>({});

  // Mock test case execution results for revealed test cases
  useEffect(() => {
    const mockResults: Record<string, TestCaseResult> = {};
    revealedTestCases.forEach((testCase, index) => {
      mockResults[testCase.id] = {
        testCaseId: testCase.id,
        status: 'passed',
        actualOutput: testCase.expectedOutput,
        executionTime: Math.floor(Math.random() * 3) + 1,
        memoryUsed: 14 + Math.random() * 0.5,
      };
    });
    setTestCaseResults(mockResults);
  }, [revealedTestCases]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'passed':
        return 'Passed';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'status-pass';
      case 'failed':
        return 'status-fail';
      default:
        return 'status-pending';
    }
  };

  const calculateOverallScore = () => {
    if (hiddenTestCases.length === 0) return 0;
    const totalTests = revealedTestCases.length + hiddenTestCases.length;
    const passedTests = revealedTestCases.length + hiddenTestCases.filter(tc => tc.status === 'passed').length;
    return ((passedTests / totalTests) * 100).toFixed(1);
  };

  return (
    <section className="space-y-8 animate-slide-up" data-testid="test-case-manager">
      {/* Revealed Test Cases */}
      <div className="glass-card rounded-lg p-6" data-testid="revealed-test-cases">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Sample Test Cases</h2>
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {revealedTestCases.length} Public Cases
            </span>
          </div>

          <div className="grid gap-6">
            {revealedTestCases.map((testCase, index) => {
              const result = testCaseResults[testCase.id];
              return (
                <div 
                  key={testCase.id} 
                  className="test-case-card glass-card rounded-lg p-6 space-y-4"
                  data-testid={`revealed-test-case-${index + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <i className="fas fa-vial text-primary"></i>
                      Test Case {index + 1}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${getStatusColor(result?.status || 'pending')}`}>
                        {getStatusIcon(result?.status || 'pending')}
                        <span className="ml-1">{getStatusText(result?.status || 'pending')}</span>
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRunSingleTestCase?.(testCase.id)}
                        data-testid={`run-test-case-${index + 1}`}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Input</h4>
                      <pre 
                        className="bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto"
                        data-testid={`test-case-${index + 1}-input`}
                      >
                        {testCase.input}
                      </pre>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Expected Output</h4>
                      <pre 
                        className="bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto"
                        data-testid={`test-case-${index + 1}-expected-output`}
                      >
                        {testCase.expectedOutput}
                      </pre>
                    </div>
                  </div>

                  {result && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">Runtime</div>
                        <div className="font-mono text-sm text-foreground">
                          {CodeRunner.formatExecutionTime(result.executionTime)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Memory</div>
                        <div className="font-mono text-sm text-foreground">
                          {CodeRunner.formatMemoryUsage(result.memoryUsed)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Your Output</div>
                        <div className="font-mono text-sm text-foreground">
                          {result.actualOutput}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Comparison</div>
                        <div className={`font-mono text-sm ${getStatusColor(result.status)}`}>
                          {result.status === 'passed' ? '✓ Match' : '✗ Mismatch'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hidden Test Cases (Initially Hidden) */}
      {showHidden && hiddenTestCases.length > 0 && (
        <div 
          className="glass-card rounded-lg p-6 animate-scale-in" 
          data-testid="hidden-test-cases"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Hidden Test Cases</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {hiddenTestCases.length} Hidden Cases
                </span>
                <div className="text-sm font-semibold">
                  <span className="text-green-400">
                    Passed: {hiddenTestCases.filter(tc => tc.status === 'passed').length}/{hiddenTestCases.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Submission Summary */}
            <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Trophy className="text-green-400 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-green-400">Submission Results</h3>
                <p className="text-sm text-muted-foreground">
                  Your solution passed{' '}
                  <span className="font-semibold text-green-400">
                    {revealedTestCases.length + hiddenTestCases.filter(tc => tc.status === 'passed').length} out of{' '}
                    {revealedTestCases.length + hiddenTestCases.length}
                  </span>{' '}
                  test cases
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm text-muted-foreground">Overall Score</div>
                <div className="text-2xl font-bold text-green-400">{calculateOverallScore()}%</div>
              </div>
            </div>

            {/* Hidden Test Cases List */}
            <div className="space-y-3">
              {hiddenTestCases.map((testCase, index) => (
                <div 
                  key={testCase.testCaseId} 
                  className="flex items-center justify-between p-4 glass-card rounded-lg hover:bg-secondary/50 transition-colors"
                  data-testid={`hidden-test-case-${index + 1}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {revealedTestCases.length + index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      Test Case {revealedTestCases.length + index + 1}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${getStatusColor(testCase.status)}`}>
                      {getStatusIcon(testCase.status)}
                      <span className="ml-1">{getStatusText(testCase.status)}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRevealTestCase?.(testCase.testCaseId)}
                      data-testid={`reveal-test-case-${index + 1}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span>Reveal (-1 pt)</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Points Status */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-foreground">Current Points</h4>
                <p className="text-sm text-muted-foreground">Each test case reveal costs 1 point</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary" data-testid="current-points">
                  {userPoints}
                </div>
                <div className="text-xs text-muted-foreground">Available Points</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
