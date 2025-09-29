import { Language, LanguageConfig, MonacoEditorConfig } from '../types';

export const languageConfigs: LanguageConfig[] = [
  {
    label: 'JavaScript',
    value: 'javascript',
    monacoLanguage: 'javascript',
    fileExtension: 'js',
  },
  {
    label: 'Python',
    value: 'python',
    monacoLanguage: 'python',
    fileExtension: 'py',
  },
  {
    label: 'C++',
    value: 'cpp',
    monacoLanguage: 'cpp',
    fileExtension: 'cpp',
  },
  {
    label: 'Java',
    value: 'java',
    monacoLanguage: 'java',
    fileExtension: 'java',
  },
  {
    label: 'C',
    value: 'c',
    monacoLanguage: 'c',
    fileExtension: 'c',
  },
];

export const defaultStarterCode: Record<Language, string> = {
javascript: 

`function main() {
    // Your code here
}

main();
`,


python: 


`def main():
  # Your code here
pass

if __name__ == "__main__":
main()
`,


cpp: 


`#include <iostream>
using namespace std;

int main() {
    // Your code here

    return 0;
}
`,


java: 


`import java.util.*;
public class Main {
  public static void main(String[] args) {
      // Your code here

  }
}
`,

c: 

`#include <stdio.h>

int main() {
    // Your code here

    return 0;
}
`,
};

export const monacoEditorConfig: MonacoEditorConfig = {
  theme: 'vs-dark',
  automaticLayout: true,
  fontSize: 14,
  fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace',
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  lineNumbers: 'on' as any,
  renderWhitespace: 'selection' as any,
  bracketPairColorization: { enabled: true },
  guides: { bracketPairs: true },
  formatOnPaste: true,
  formatOnType: true,
};

export function getLanguageConfig(language: Language): LanguageConfig {
  return languageConfigs.find(config => config.value === language) || languageConfigs[0];
}

export function getLanguageLabel(language: Language): string {
  return getLanguageConfig(language).label;
}

export function getMonacoLanguage(language: Language): string {
  return getLanguageConfig(language).monacoLanguage;
}
