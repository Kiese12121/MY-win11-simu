import { useState, useEffect, useRef } from 'react';
import * as Babel from '@babel/standalone';
import React from 'react';
import * as FramerMotion from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function AppPreview() {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderCode = () => {
    try {
      const savedFiles = localStorage.getItem('vscode_vfs');
      if (!savedFiles) {
        setError('No files found in VS Code. Please create an App.tsx file.');
        return;
      }

      const files = JSON.parse(savedFiles);
      const appFile = files.find((f: any) => f.name === 'App.tsx' || f.name === 'App.jsx');
      
      if (!appFile) {
        setError('App.tsx not found. Please create it in VS Code.');
        return;
      }

      // Transpile JSX/TSX to JS
      const { code } = Babel.transform(appFile.content, {
        presets: ['react', 'typescript', ['env', { modules: 'commonjs' }]],
        filename: appFile.name
      });

      if (!code) throw new Error('Transpilation failed');

      // Simple mock for require/import
      const wrappedCode = `
        const React = dependencies.React;
        const motion = dependencies.FramerMotion.motion;
        const Lucide = dependencies.LucideIcons;
        
        // Mock require for basic imports
        const require = (module) => {
          if (module === 'react') return React;
          if (module === 'framer-motion') return dependencies.FramerMotion;
          if (module === 'lucide-react') return Lucide;
          return {};
        };

        const exports = {};
        ${code}
        return exports.default;
      `;

      const renderFunc = new Function('dependencies', wrappedCode);
      const Component = renderFunc({ React, FramerMotion, LucideIcons });

      if (typeof Component !== 'function') {
        throw new Error('App.tsx must have a default export that is a React component.');
      }

      // Clear previous content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      setError(null);
      return Component;
    } catch (err: any) {
      console.error('Preview Error:', err);
      setError(err.message || 'An error occurred while rendering the app.');
      return null;
    }
  };

  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const Comp = renderCode();
    if (Comp) setComponent(() => Comp);

    // Listen for changes in localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'vscode_vfs') {
        const NewComp = renderCode();
        if (NewComp) setComponent(() => NewComp);
      }
    };

    window.addEventListener('storage', handleStorage);
    // Also poll for changes since storage event doesn't fire in the same tab
    const interval = setInterval(() => {
      const NewComp = renderCode();
      if (NewComp) setComponent(() => NewComp);
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  if (error) {
    return (
      <div className="h-full bg-white p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <LucideIcons.AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Render Error</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm text-red-500 max-w-full overflow-auto text-left">
          {error}
        </pre>
        <p className="mt-4 text-gray-500 text-sm">
          Check your code in VS Code and make sure it has a valid default export.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-auto" ref={containerRef}>
      {Component ? <Component /> : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <LucideIcons.Loader2 className="animate-spin mr-2" />
          Loading App...
        </div>
      )}
    </div>
  );
}
