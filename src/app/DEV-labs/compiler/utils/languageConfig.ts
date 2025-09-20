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
    
}`,
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
