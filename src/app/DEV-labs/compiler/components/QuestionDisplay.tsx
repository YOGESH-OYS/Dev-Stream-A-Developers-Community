import { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section className="glass-card rounded-lg p-8 animate-slide-up" data-testid="question-display">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text" data-testid="question-title">
              {question.title}
            </h1>
            <div className="flex items-center gap-3">
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(question.difficulty)}`}
                data-testid="question-difficulty"
              >
                {question.difficulty}
              </span>
              <span className="text-muted-foreground text-sm" data-testid="question-id">
                Problem ID: {question.id}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2" data-testid="time-limit">
              <i className="fas fa-clock"></i>
              <span>Time Limit: {question.timeLimit || 1000}ms</span>
            </div>
            <div className="flex items-center gap-2" data-testid="memory-limit">
              <i className="fas fa-memory"></i>
              <span>Memory: {question.memoryLimit || 256}MB</span>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-4">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-lg leading-relaxed text-foreground whitespace-pre-line"
              data-testid="question-description"
            >
              {question.description}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Examples</h3>
          
          {question.examples.map((example, index) => (
            <div key={index} className="glass-card rounded-lg p-6 space-y-4" data-testid={`example-${index + 1}`}>
              <h4 className="font-semibold text-primary">Example {index + 1}:</h4>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Input:</p>
                  <pre className="bg-muted rounded p-3 text-sm font-mono overflow-x-auto" data-testid={`example-${index + 1}-input`}>
                    <span className="text-blue-400">{example.input}</span>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Output:</p>
                  <pre className="bg-muted rounded p-3 text-sm font-mono overflow-x-auto" data-testid={`example-${index + 1}-output`}>
                    <span className="text-green-400">{example.output}</span>
                  </pre>
                </div>
              </div>
              {example.explanation && (
                <p className="text-sm text-muted-foreground" data-testid={`example-${index + 1}-explanation`}>
                  <strong>Explanation:</strong> {example.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Constraints</h3>
          <ul className="space-y-2 text-muted-foreground" data-testid="constraints-list">
            {question.constraints.map((constraint, index) => (
              <li key={index} className="flex items-center gap-2">
                <i className="fas fa-dot-circle text-xs text-primary"></i>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
