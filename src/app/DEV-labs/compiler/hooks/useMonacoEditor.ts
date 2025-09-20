import { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { monacoEditorConfig, getMonacoLanguage } from '../utils/languageConfig';

declare global {
  interface Window {
    monaco: any;
    require: any;
  }
}

export function useMonacoEditor() {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.error('Monaco Editor loading timeout');
        setIsLoading(false);
        setHasError(true);
      }
    }, 10000); // 10 second timeout

    const loadMonaco = async () => {
      try {
        // Check if Monaco is already loaded
        if (window.monaco) {
          if (containerRef.current) {
            editorRef.current = window.monaco.editor.create(containerRef.current, {
              ...monacoEditorConfig,
              fontSize,
              value: '',
              language: 'javascript',
            } as any);

            setIsEditorReady(true);
            setIsLoading(false);
            clearTimeout(timeout);
          }
          return;
        }

        // Load Monaco Editor from CDN
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/monaco-editor@0.45.0/min/vs/loader.js';
        
        script.onload = () => {
          if (window.require) {
            window.require.config({ 
              paths: { 
                vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' 
              } 
            });
            
            window.require(['vs/editor/editor.main'], () => {
              if (containerRef.current && window.monaco) {
                try {
                  editorRef.current = window.monaco.editor.create(containerRef.current, {
                    ...monacoEditorConfig,
                    fontSize,
                    value: '',
                    language: 'javascript',
                  } as any);

                  setIsEditorReady(true);
                  setIsLoading(false);
                  clearTimeout(timeout);

                  // Auto-resize on container size change
                  const resizeObserver = new ResizeObserver(() => {
                    editorRef.current?.layout();
                  });
                  resizeObserver.observe(containerRef.current);
                } catch (error) {
                  console.error('Failed to create Monaco editor:', error);
                  setIsLoading(false);
                  setHasError(true);
                  clearTimeout(timeout);
                }
              }
            });
          }
        };

        script.onerror = () => {
          console.error('Failed to load Monaco Editor script');
          setIsLoading(false);
          setHasError(true);
          clearTimeout(timeout);
        };

        document.head.appendChild(script);

        return () => {
          if (editorRef.current) {
            editorRef.current.dispose();
          }
        };
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
        setIsLoading(false);
        setHasError(true);
        clearTimeout(timeout);
      }
    };

    loadMonaco();

    return () => {
      clearTimeout(timeout);
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize });
    }
  }, [fontSize]);

  const setValue = (value: string) => {
    if (editorRef.current) {
      editorRef.current.setValue(value);
    }
  };

  const getValue = (): string => {
    return editorRef.current?.getValue() || '';
  };

  const setLanguage = (language: Language) => {
    if (editorRef.current && window.monaco) {
      const monacoLanguage = getMonacoLanguage(language);
      window.monaco.editor.setModelLanguage(editorRef.current.getModel(), monacoLanguage);
    }
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 10));
  };

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const layout = () => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  };

  return {
    containerRef,
    isEditorReady,
    isLoading,
    hasError,
    setValue,
    getValue,
    setLanguage,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    focus,
    layout,
  };
}
