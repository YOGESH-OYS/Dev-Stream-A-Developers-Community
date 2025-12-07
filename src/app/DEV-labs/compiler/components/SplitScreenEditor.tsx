import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { languageConfigs, defaultStarterCode, getMonacoLanguage } from '../utils/languageConfig';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Minus, Plus, Play, CheckCircle, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      <div className="spinner mr-2" />
      <span>Loading editor...</span>
    </div>
  )
});

interface SplitScreenEditorProps {
  questionId: string;
  starterCode: Record<string, string>;
  userId?: string;
  onRunComplete?: (results: any) => void;
  onSubmitComplete?: (results: any) => void;
}

export function SplitScreenEditor({ questionId, starterCode, userId, onRunComplete, onSubmitComplete }: SplitScreenEditorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('java');
  const [leftPaneWidth, setLeftPaneWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [code, setCode] = useState('');
  const [fontSize, setFontSize] = useState(14);
  
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  const {
    isRunning,
    setOutput,
    isSubmitting,
    executionStats,
    consoleOutput,
    runCode,
    submitCode,
    clearOutput,
  } = useCodeExecution();

  // Load saved pane width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem('editorPaneWidth');
    if (savedWidth) {
      setLeftPaneWidth(parseFloat(savedWidth));
    }
  }, []);

  // Set starter code when language changes
  useEffect(() => {
    // const code = starterCode[currentLanguage] || defaultStarterCode[currentLanguage];
    const code = defaultStarterCode[currentLanguage];
    setCode(code);
  }, [currentLanguage]);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language as Language);
  };

  // Resizer functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !splitContainerRef.current) return;

    const containerRect = splitContainerRef.current.getBoundingClientRect();
    const newLeftWidth = Math.max(30, Math.min(70, 
      ((e.clientX - containerRect.left) / containerRect.width) * 100
    ));
    
        setLeftPaneWidth(newLeftWidth);
        localStorage.setItem('editorPaneWidth', newLeftWidth.toString());
        
        // Trigger Monaco layout update
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.layout();
          }
        }, 0);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);










  // IMPORTANT
  const handleRunCode = async () => {
    await runCode(questionId, currentLanguage, code, userId);
    if (onRunComplete) {
      onRunComplete({ language: currentLanguage, code });
    }
  };

  const handleSubmit = async () => {
    const results = await submitCode(questionId, currentLanguage, code, userId);
    if (onSubmitComplete) {
      onSubmitComplete({ language: currentLanguage, code, results });
    }
  };














  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 10));
  };

  return (
    <section className="glass-card rounded-lg p-6 animate-slide-up" data-testid="split-screen-editor">
      <div className="space-y-4">
        {/* Editor Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Code Editor</h2>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32" data-testid="language-selector">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageConfigs.map((config) => (
                  <SelectItem key={config.value} value={config.value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Font Size Controls */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={decreaseFontSize}
                data-testid="decrease-font-size"
                title="Decrease font size"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2" data-testid="font-size-display">
                {fontSize}px
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={increaseFontSize}
                data-testid="increase-font-size"
                title="Increase font size"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Split Pane Container */}
        <div 
          ref={splitContainerRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-0 min-h-[600px] split-container"
          data-testid="split-container"
        >
          {/* Left Pane - Monaco Editor */}
          <div 
            className="flex-1 lg:min-w-[360px]"
            style={{ 
              flexBasis: `${leftPaneWidth}%`
            }}
            data-testid="editor-pane"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Solution</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <i className="fas fa-lightbulb"></i>
                  <span>Use Ctrl+Space for auto-completion</span>
                </div>
              </div>
              
              <div className="monaco-container" style={{ height: '500px' }}>
                <MonacoEditor
                  height="100%"
                  language={getMonacoLanguage(currentLanguage)}
                  value={code}
                  onChange={(value) => {
                    setCode(value || '');
                  }}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                  options={{
                    theme: 'vs-dark',
                    fontSize: fontSize,
                    fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace',
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    renderWhitespace: 'selection',
                    bracketPairColorization: { enabled: true },
                    guides: { bracketPairs: true },
                    formatOnPaste: true,
                    formatOnType: true,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Resizer Handle */}
          <div 
            ref={resizerRef}
            className="resizer hidden lg:block mx-2 cursor-col-resize"
            onMouseDown={handleMouseDown}
            data-testid="resizer"
            title="Drag to resize panes"
          />

          {/* Right Pane - Output Console */}
          <div 
            className="flex-1 lg:min-w-[360px]"
            style={{ 
              flexBasis: `${100 - leftPaneWidth}%`
            }}
            data-testid="output-pane"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Output</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearOutput}
                  data-testid="clear-output"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              
              <div className="terminal-output" data-testid="console-output">
                <div 
                  className="text-muted-foreground text-sm space-y-2"
                  dangerouslySetInnerHTML={{ __html: consoleOutput }}
                />
              </div>

              {/* Execution Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Runtime</div>
                  <div className="font-mono text-sm text-foreground" data-testid="execution-time">
                    {executionStats.executionTime}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Memory</div>
                  <div className="font-mono text-sm text-foreground" data-testid="memory-usage">
                    {executionStats.memoryUsage}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="font-mono text-sm text-foreground" data-testid="execution-status">
                    {executionStats.executionStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
          <Button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="btn-primary flex-1 px-6 py-3 text-base font-semibold"
            data-testid="run-code-button"
          >
            {isRunning ? (
              <>
                <div className="spinner mr-2" />
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                <span>Compile Code</span>
              </>
            )}
          </Button>
          
          <Button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="btn-primary flex-1 px-6 py-3 text-base font-semibold"
            data-testid="run-code-button"
          >
            {isRunning ? (
              <>
                <div className="spinner mr-2" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                <span>Run Code</span>
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="btn-secondary flex-1 px-6 py-3 text-base font-semibold"
            data-testid="submit-button"
          >
            {isSubmitting ? (
              <>
                <div className="spinner mr-2" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Submit Solution</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
