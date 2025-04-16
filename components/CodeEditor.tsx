'use client';

import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  darkMode: boolean;
  onType?: () => void;
}

export default function CodeEditor({ code, setCode, language, darkMode, onType }: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      if (onType) onType();
    }
  };

  return (
    <Editor
      height="400px"
      theme={darkMode ? 'vs-dark' : 'light'}
      defaultLanguage={language}
      language={language}
      value={code}
      onChange={handleChange}
      onMount={(editor) => (editorRef.current = editor)}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
}
