import React, { useState, useEffect, useCallback } from 'react';
import { 
  Files, Search, GitBranch, Play, Blocks, Settings, User, Bell, 
  ChevronRight, FileCode, FileJson, FileType, RefreshCw, 
  Plus, Download, Save, Trash2, X, Eye, Code, Terminal as TerminalIcon,
  ChevronDown, MoreHorizontal, Split, Layout, Info, AlertTriangle, Check
} from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import { useWindows } from '../../context/WindowContext';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-csharp';

interface VFSFile {
  name: string;
  content: string;
  language: string;
}

const DEFAULT_FILES: VFSFile[] = [
  { 
    name: 'App.tsx', 
    language: 'tsx',
    content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center text-center">\n      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm max-w-md w-full">\n        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl font-black mb-6 mx-auto shadow-lg rotate-3 hover:rotate-0 transition-transform cursor-pointer">W</div>\n        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">My Custom App</h1>\n        <p className="text-gray-600 mb-8 leading-relaxed font-medium">This app was built entirely inside the Windows 11 Simulator VS Code!</p>\n        <button \n          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-700 hover:shadow-blue-200 transition-all active:scale-95"\n          onClick={() => alert('Hello from your custom app!')}\n        >\n          Launch Action\n        </button>\n      </div>\n    </div>\n  );\n}` 
  },
  { 
    name: 'package.json', 
    language: 'json',
    content: `{\n  "name": "windows-11-sim",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "framer-motion": "^10.12.0"\n  }\n}` 
  },
  {
    name: 'Program.cs',
    language: 'csharp',
    content: `using System;\n\nnamespace WindowsSimulatorApp\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine("Hello from .NET Core!");\n            Console.WriteLine("Current Time: " + DateTime.Now.ToString());\n            Console.WriteLine("--------------------------------");\n            Console.WriteLine("Type your name:");\n            string name = "User"; // Simulated input\n            Console.WriteLine("Welcome, " + name + "!");\n        }\n    }\n}`
  },
  { 
    name: 'styles.css', 
    language: 'css',
    content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  background: #1e1e1e;\n  color: white;\n}` 
  },
];

export default function VSCode() {
  const { openApp } = useWindows();
  const [files, setFiles] = useState<VFSFile[]>(() => {
    const saved = localStorage.getItem('vscode_vfs');
    return saved ? JSON.parse(saved) : DEFAULT_FILES;
  });
  const [activeFileName, setActiveFileName] = useState(files[0]?.name || 'App.tsx');
  const [openTabs, setOpenTabs] = useState<string[]>([files[0]?.name || 'App.tsx']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'explorer' | 'search' | 'git' | 'extensions'>('explorer');
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<{fileName: string, line: number, text: string}[]>([]);
  const [gitStatus, setGitStatus] = useState<{staged: string[], unstaged: string[], branch: string}>({
    staged: [],
    unstaged: [],
    branch: 'main'
  });
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'user@windows-11-sim:~$ npm run dev',
    'VITE v4.3.9  ready in 124 ms',
    '➜  Local:   http://localhost:5173/',
    '➜  Network: use --host to expose'
  ]);

  const activeFile = files.find(f => f.name === activeFileName) || files[0];

  useEffect(() => {
    localStorage.setItem('vscode_vfs', JSON.stringify(files));
  }, [files]);

  const handleContentChange = (newContent: string) => {
    setFiles(prev => prev.map(f => 
      f.name === activeFileName ? { ...f, content: newContent } : f
    ));
    // Mark as unstaged if in git
    if (!gitStatus.unstaged.includes(activeFileName) && !gitStatus.staged.includes(activeFileName)) {
      setGitStatus(prev => ({ ...prev, unstaged: [...prev.unstaged, activeFileName] }));
    }
  };

  const openFile = (name: string) => {
    setActiveFileName(name);
    if (!openTabs.includes(name)) {
      setOpenTabs(prev => [...prev, name]);
    }
    setViewMode('editor');
  };

  const closeTab = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== name);
    setOpenTabs(newTabs);
    if (activeFileName === name && newTabs.length > 0) {
      setActiveFileName(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      // Keep at least one tab or show empty state? VS Code shows empty.
      // For simplicity, we'll just not allow closing the last tab for now or handle it.
    }
  };

  const createNewFile = () => {
    const name = prompt('Enter file name (e.g. index.ts):');
    if (!name) return;
    if (files.find(f => f.name === name)) {
      alert('File already exists!');
      return;
    }
    const ext = name.split('.').pop() || 'txt';
    const languageMap: Record<string, string> = {
      ts: 'typescript',
      tsx: 'tsx',
      js: 'javascript',
      jsx: 'jsx',
      css: 'css',
      json: 'json',
      html: 'html',
      cs: 'csharp'
    };
    const newFile: VFSFile = {
      name,
      language: languageMap[ext] || 'javascript',
      content: ''
    };
    setFiles(prev => [...prev, newFile]);
    openFile(name);
  };

  const deleteFile = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) {
      alert('Cannot delete the last file!');
      return;
    }
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const newFiles = files.filter(f => f.name !== name);
      setFiles(newFiles);
      if (activeFileName === name) {
        setActiveFileName(newFiles[0].name);
      }
    }
  };

  const downloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTerminalOutput(prev => [...prev, `Downloaded ${activeFile.name} to your PC.`]);
  };

  const saveToVM = () => {
    localStorage.setItem('vscode_vfs', JSON.stringify(files));
    setTerminalOutput(prev => [...prev, `Saved all files to Virtual Machine storage.`]);
  };

  const highlight = (code: string) => {
    const lang = activeFile?.language || 'javascript';
    return Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p' && !e.shiftKey) {
        e.preventDefault();
        setIsCommandPaletteOpen(true); // Quick Open
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveToVM();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNewFile();
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [files]);

  const runAsApp = () => {
    saveToVM();
    setTerminalOutput(prev => [...prev, 'Compiling and launching app...']);
    setTimeout(() => {
      openApp('preview');
      setTerminalOutput(prev => [...prev, 'App launched successfully!']);
    }, 1000);
  };

  const commands = [
    ...files.map(f => ({ id: `open-${f.name}`, label: `File: Open ${f.name}`, action: () => openFile(f.name) })),
    { id: 'new-file', label: 'File: New File', action: createNewFile },
    { id: 'save-file', label: 'File: Save', action: saveToVM },
    { id: 'run-app', label: 'Run: Start Debugging', action: runAsApp },
    { id: 'toggle-sidebar', label: 'View: Toggle Primary Sidebar', action: () => setIsSidebarOpen(!isSidebarOpen) },
    { id: 'open-explorer', label: 'View: Show Explorer', action: () => { setSidebarTab('explorer'); setIsSidebarOpen(true); } },
    { id: 'open-search', label: 'View: Show Search', action: () => { setSidebarTab('search'); setIsSidebarOpen(true); } },
    { id: 'open-git', label: 'View: Show Source Control', action: () => { setSidebarTab('git'); setIsSidebarOpen(true); } },
    { id: 'open-extensions', label: 'View: Show Extensions', action: () => { setSidebarTab('extensions'); setIsSidebarOpen(true); } },
    { id: 'dotnet-run', label: 'Terminal: .NET Run', action: () => setTerminalOutput(prev => [...prev, 'Running dotnet run...']) },
    { id: 'git-init', label: 'Git: Initialize Repository', action: () => setGitStatus(prev => ({ ...prev, unstaged: files.map(f => f.name) })) },
  ];

  const filteredCommands = commands.filter(c => c.label.toLowerCase().includes(commandSearch.toLowerCase()));

  const handleSearch = (query: string) => {
    setSearchText(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    const results: {fileName: string, line: number, text: string}[] = [];
    files.forEach(file => {
      const lines = file.content.split('\n');
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          results.push({ fileName: file.name, line: index + 1, text: line.trim() });
        }
      });
    });
    setSearchResults(results);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden select-none relative">
      {/* Command Palette */}
      {isCommandPaletteOpen && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[600px] bg-[#252526] shadow-2xl z-50 rounded-md border border-[#3c3c3c] overflow-hidden">
          <div className="p-2">
            <input 
              type="text" 
              autoFocus
              placeholder="Type the name of a command to run."
              className="w-full bg-[#3c3c3c] border-none outline-none text-sm px-3 py-1.5 text-white placeholder-gray-500"
              value={commandSearch}
              onChange={(e) => setCommandSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredCommands.length > 0) {
                  filteredCommands[0].action();
                  setIsCommandPaletteOpen(false);
                  setCommandSearch('');
                }
              }}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto py-1">
            {filteredCommands.map((cmd, i) => (
              <div 
                key={cmd.id}
                onClick={() => { cmd.action(); setIsCommandPaletteOpen(false); setCommandSearch(''); }}
                className={`px-4 py-1.5 text-xs flex justify-between hover:bg-[#04395e] hover:text-white cursor-pointer ${i === 0 ? 'bg-[#04395e] text-white' : ''}`}
              >
                <span>{cmd.label}</span>
              </div>
            ))}
            {filteredCommands.length === 0 && (
              <div className="px-4 py-2 text-xs text-gray-500 italic">No matching commands</div>
            )}
          </div>
        </div>
      )}

      {/* Menu Bar */}
      <div className="h-7 bg-[#323233] flex items-center px-2 gap-4 text-xs shrink-0 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded cursor-pointer transition-colors">
          <span className="font-medium">File</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded cursor-pointer transition-colors" onClick={createNewFile}>
          <Plus size={12} />
          <span>New File</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded cursor-pointer transition-colors" onClick={saveToVM}>
          <Save size={12} />
          <span>Save</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded cursor-pointer transition-colors" onClick={downloadFile}>
          <Download size={12} />
          <span>Export</span>
        </div>
        <div className="ml-auto flex items-center gap-4 pr-2 text-gray-500">
          <span className="hover:text-white cursor-pointer">Edit</span>
          <span className="hover:text-white cursor-pointer">Selection</span>
          <span className="hover:text-white cursor-pointer">View</span>
          <span className="hover:text-white cursor-pointer">Go</span>
          <span className="hover:text-white cursor-pointer">Run</span>
          <span className="hover:text-white cursor-pointer">Terminal</span>
          <span className="hover:text-white cursor-pointer">Help</span>
        </div>
      </div>

      {/* Activity Bar */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 shrink-0 border-r border-[#1e1e1e]">
          <Files 
            size={24} 
            className={`${sidebarTab === 'explorer' && isSidebarOpen ? 'text-white border-l-2 border-white pl-1' : 'text-gray-500'} cursor-pointer hover:text-white transition-all`} 
            onClick={() => {
              if (sidebarTab === 'explorer') setIsSidebarOpen(!isSidebarOpen);
              else { setSidebarTab('explorer'); setIsSidebarOpen(true); }
            }}
          />
          <Search 
            size={24} 
            className={`${sidebarTab === 'search' && isSidebarOpen ? 'text-white border-l-2 border-white pl-1' : 'text-gray-500'} cursor-pointer hover:text-white transition-all`} 
            onClick={() => {
              if (sidebarTab === 'search') setIsSidebarOpen(!isSidebarOpen);
              else { setSidebarTab('search'); setIsSidebarOpen(true); }
            }}
          />
          <div className="relative">
            <GitBranch 
              size={24} 
              className={`${sidebarTab === 'git' && isSidebarOpen ? 'text-white border-l-2 border-white pl-1' : 'text-gray-500'} cursor-pointer hover:text-white transition-all`} 
              onClick={() => {
                if (sidebarTab === 'git') setIsSidebarOpen(!isSidebarOpen);
                else { setSidebarTab('git'); setIsSidebarOpen(true); }
              }}
            />
            {(gitStatus.unstaged.length + gitStatus.staged.length) > 0 && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                {gitStatus.unstaged.length + gitStatus.staged.length}
              </div>
            )}
          </div>
          <Play 
            size={24} 
            className="text-gray-500 hover:text-green-400 cursor-pointer transition-all" 
            onClick={runAsApp}
          />
          <Plus 
            size={24} 
            className="text-gray-500 hover:text-white cursor-pointer transition-all" 
            onClick={createNewFile}
          />
          <Blocks 
            size={24} 
            className={`${sidebarTab === 'extensions' && isSidebarOpen ? 'text-white border-l-2 border-white pl-1' : 'text-gray-500'} cursor-pointer hover:text-white transition-all`} 
            onClick={() => {
              if (sidebarTab === 'extensions') setIsSidebarOpen(!isSidebarOpen);
              else { setSidebarTab('extensions'); setIsSidebarOpen(true); }
            }}
          />
          <div className="mt-auto flex flex-col gap-6">
            <User size={24} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Settings size={24} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 bg-[#252526] flex flex-col shrink-0 border-r border-[#1e1e1e]">
            <div className="h-9 flex items-center justify-between px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span>{sidebarTab}</span>
              <MoreHorizontal size={14} className="cursor-pointer" />
            </div>

            {sidebarTab === 'explorer' && (
              <div className="flex flex-col h-full">
                <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between group">
                  <span>Open Editors</span>
                  <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 cursor-pointer" />
                </div>
                <div className="mb-2">
                  {openTabs.map(tabName => (
                    <div 
                      key={`open-${tabName}`}
                      onClick={() => openFile(tabName)}
                      className={`flex items-center gap-2 px-4 py-0.5 text-sm cursor-pointer hover:bg-[#2a2d2e] ${activeFileName === tabName ? 'text-white' : 'text-gray-400'}`}
                    >
                      <X size={12} className="hover:bg-white/10 rounded" onClick={(e) => closeTab(tabName, e)} />
                      <span className="truncate">{tabName}</span>
                    </div>
                  ))}
                </div>

                <div className="group flex items-center px-2 py-1 bg-[#37373d] text-[11px] font-bold">
                  <ChevronDown size={14} />
                  <span className="ml-1 uppercase tracking-tighter">WINDOWS-11-SIM</span>
                  <div className="ml-auto flex gap-2 transition-opacity">
                    <Plus size={14} className="cursor-pointer hover:text-white" onClick={createNewFile} />
                    <RefreshCw size={14} className="cursor-pointer hover:text-white" onClick={() => setFiles(DEFAULT_FILES)} />
                  </div>
                </div>
                <div className="flex-1 py-1 overflow-y-auto">
                  {files.map(file => (
                    <div 
                      key={file.name}
                      onClick={() => openFile(file.name)}
                      className={`group flex items-center gap-2 px-4 py-1 text-sm cursor-pointer hover:bg-[#2a2d2e] ${activeFileName === file.name && viewMode === 'editor' ? 'bg-[#37373d] text-white' : ''}`}
                    >
                      {file.name.endsWith('.json') ? <FileJson size={14} className="text-yellow-400" /> : 
                       file.name.endsWith('.css') ? <FileType size={14} className="text-blue-500" /> :
                       file.name.endsWith('.cs') ? <FileCode size={14} className="text-green-500" /> :
                       <FileCode size={14} className="text-blue-400" />}
                      <span className="flex-1 truncate">{file.name}</span>
                      <Trash2 
                        size={12} 
                        className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity" 
                        onClick={(e) => deleteFile(file.name, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sidebarTab === 'search' && (
              <div className="flex flex-col h-full">
                <div className="p-4 space-y-2">
                  <div className="bg-[#3c3c3c] border border-[#3c3c3c] focus-within:border-blue-500 rounded p-1">
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="bg-transparent outline-none text-sm w-full px-2"
                      value={searchText}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <div className="bg-[#3c3c3c] border border-[#3c3c3c] focus-within:border-blue-500 rounded p-1">
                    <input type="text" placeholder="Replace" className="bg-transparent outline-none text-sm w-full px-2" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-2">
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-[10px] text-gray-500 px-2 uppercase font-bold">{searchResults.length} results in {new Set(searchResults.map(r => r.fileName)).size} files</p>
                      {Array.from(new Set(searchResults.map(r => r.fileName))).map((fileName: string) => (
                        <div key={fileName} className="space-y-1">
                          <div className="flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer rounded" onClick={() => openFile(fileName)}>
                            <ChevronRight size={12} />
                            <FileCode size={12} className="text-blue-400" />
                            <span className="text-xs font-bold">{fileName}</span>
                          </div>
                          <div className="pl-6 space-y-1">
                            {searchResults.filter(r => r.fileName === fileName).map((res, i) => (
                              <div key={i} className="text-[11px] text-gray-400 hover:bg-[#2a2d2e] cursor-pointer px-2 py-0.5 rounded truncate" onClick={() => openFile(fileName)}>
                                <span className="text-blue-500 mr-2">{res.line}</span>
                                {res.text}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchText ? (
                    <p className="text-xs text-gray-500 italic px-4">No results found.</p>
                  ) : null}
                </div>
              </div>
            )}

            {sidebarTab === 'git' && (
              <div className="flex flex-col h-full">
                <div className="h-9 flex items-center justify-between px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-[#1e1e1e]">
                  <span>Source Control</span>
                  <div className="flex gap-2">
                    <RefreshCw size={14} className="cursor-pointer hover:text-white" />
                    <Check size={14} className="cursor-pointer hover:text-white" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="bg-[#3c3c3c] rounded p-1 mb-4">
                    <textarea 
                      placeholder="Message (Ctrl+Enter to commit on 'main')" 
                      className="bg-transparent outline-none text-xs w-full px-2 py-1 resize-none h-16"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {gitStatus.staged.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between px-1 mb-1">
                          <span className="text-[10px] font-bold uppercase text-gray-500">Staged Changes</span>
                          <span className="bg-[#333333] px-1.5 rounded text-[9px]">{gitStatus.staged.length}</span>
                        </div>
                        {gitStatus.staged.map(file => (
                          <div key={file} className="flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer group">
                            <FileCode size={14} className="text-blue-400" />
                            <span className="text-xs flex-1 truncate">{file}</span>
                            <span className="text-[10px] text-green-500 font-bold">A</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between px-1 mb-1">
                        <span className="text-[10px] font-bold uppercase text-gray-500">Changes</span>
                        <span className="bg-[#333333] px-1.5 rounded text-[9px]">{gitStatus.unstaged.length}</span>
                      </div>
                      {gitStatus.unstaged.length === 0 && (
                        <p className="text-[11px] text-gray-500 italic px-2">No changes detected.</p>
                      )}
                      {gitStatus.unstaged.map(file => (
                        <div key={file} className="flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer group">
                          <FileCode size={14} className="text-blue-400" />
                          <span className="text-xs flex-1 truncate">{file}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                            <Plus size={12} className="hover:text-white" onClick={() => setGitStatus(prev => ({ staged: [...prev.staged, file], unstaged: prev.unstaged.filter(f => f !== file), branch: prev.branch }))} />
                          </div>
                          <span className="text-[10px] text-yellow-500 font-bold">M</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {sidebarTab === 'extensions' && (
              <div className="p-4 space-y-4">
                <input type="text" placeholder="Search Extensions" className="bg-[#3c3c3c] outline-none text-sm w-full px-2 py-1 rounded" />
                <div className="space-y-4">
                  <div className="flex gap-3 items-start p-2 hover:bg-[#2a2d2e] rounded cursor-pointer">
                    <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold">ES</div>
                    <div>
                      <h4 className="text-xs font-bold">ESLint</h4>
                      <p className="text-[10px] text-gray-500">Integrates ESLint into VS Code.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-2 hover:bg-[#2a2d2e] rounded cursor-pointer">
                    <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center font-bold">PT</div>
                    <div>
                      <h4 className="text-xs font-bold">Prettier</h4>
                      <p className="text-[10px] text-gray-500">Code formatter.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="h-9 bg-[#252526] flex overflow-x-auto no-scrollbar border-b border-[#1e1e1e]">
            {openTabs.map(tabName => {
              const file = files.find(f => f.name === tabName);
              if (!file) return null;
              return (
                <div 
                  key={tabName}
                  onClick={() => openFile(tabName)}
                  className={`group flex items-center gap-2 px-4 border-r border-[#1e1e1e] text-sm cursor-pointer min-w-[120px] transition-colors shrink-0 ${activeFileName === tabName && viewMode === 'editor' ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] hover:bg-[#2a2d2e]'}`}
                >
                  {tabName.endsWith('.json') ? <FileJson size={14} className="text-yellow-400" /> : 
                   tabName.endsWith('.css') ? <FileType size={14} className="text-blue-500" /> :
                   tabName.endsWith('.cs') ? <FileCode size={14} className="text-green-500" /> :
                   <FileCode size={14} className="text-blue-400" />}
                  <span className="truncate">{tabName}</span>
                  <X 
                    size={12} 
                    className={`ml-auto rounded hover:bg-white/10 ${activeFileName === tabName ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                    onClick={(e) => closeTab(tabName, e)}
                  />
                </div>
              );
            })}
            <div 
              className={`flex items-center gap-2 px-4 border-r border-[#1e1e1e] text-sm cursor-pointer transition-colors shrink-0 ${viewMode === 'preview' ? 'bg-[#1e1e1e] text-white border-t-2 border-t-green-500' : 'bg-[#2d2d2d] hover:bg-[#2a2d2e]'}`}
              onClick={() => setViewMode('preview')}
            >
              <Eye size={14} className="text-green-400" />
              <span>Live Preview</span>
            </div>
          </div>

          {/* Toolbar / Breadcrumbs */}
          <div className="h-9 bg-[#1e1e1e] border-b border-[#333333] flex items-center px-4 justify-between shrink-0">
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <ChevronRight size={14} />
              <span>windows-11-sim</span>
              <ChevronRight size={14} />
              <span>src</span>
              <ChevronRight size={14} />
              <span className="text-gray-300">{activeFileName}</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={runAsApp} className="flex items-center gap-1 text-xs text-green-500 hover:text-green-400 transition-colors font-bold">
                <Play size={14} />
                <span>Run App</span>
              </button>
              <button onClick={saveToVM} className="flex items-center gap-1 text-xs hover:text-white transition-colors">
                <Save size={14} />
                <span>Save</span>
              </button>
              <button onClick={downloadFile} className="flex items-center gap-1 text-xs hover:text-white transition-colors">
                <Download size={14} />
                <span>Export</span>
              </button>
              <div className="w-px h-4 bg-[#333333]" />
              <Split size={14} className="cursor-pointer hover:text-white" />
              <Layout size={14} className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
            {openTabs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-[#1e1e1e] text-gray-500 space-y-6">
                <div className="w-32 h-32 opacity-10">
                  <FileCode size={128} />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-light text-gray-400">Visual Studio Code</h2>
                  <p className="text-sm">Editing evolved</p>
                </div>
                <div className="grid grid-cols-2 gap-8 text-xs">
                  <div className="space-y-2">
                    <p className="font-bold text-gray-400 uppercase">Start</p>
                    <p className="hover:text-blue-400 cursor-pointer" onClick={createNewFile}>New File...</p>
                    <p className="hover:text-blue-400 cursor-pointer" onClick={() => setIsCommandPaletteOpen(true)}>Open File...</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-gray-400 uppercase">Recent</p>
                    {files.slice(0, 3).map(f => (
                      <p key={f.name} className="hover:text-blue-400 cursor-pointer" onClick={() => openFile(f.name)}>{f.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : viewMode === 'editor' ? (
              <div className="flex-1 overflow-auto bg-[#1e1e1e] custom-scrollbar">
                <Editor
                  value={activeFile?.content || ''}
                  onValueChange={handleContentChange}
                  highlight={highlight}
                  padding={20}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    minHeight: '100%',
                  }}
                  className="editor-textarea focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex-1 bg-[#f3f3f3] overflow-auto p-8 text-black">
                <div className="max-w-3xl mx-auto border shadow-2xl rounded-xl overflow-hidden bg-white">
                  <div className="bg-[#e1e1e1] px-4 py-2 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 text-center text-[11px] text-gray-600 font-bold tracking-tight">
                      PREVIEW: {activeFileName}
                    </div>
                    <RefreshCw size={12} className="text-gray-500 cursor-pointer hover:text-black" onClick={() => setViewMode('preview')} />
                  </div>
                  <div className="p-8 min-h-[450px]">
                    {activeFile?.name.endsWith('.tsx') || activeFile?.name.endsWith('.jsx') ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-900">Windows App Preview</h1>
                            <p className="text-xs text-gray-500">Live rendering from {activeFileName}</p>
                          </div>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          {activeFile.content.includes('h1') ? (
                            <h2 className="text-2xl font-extrabold text-gray-800">
                              {activeFile.content.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1] || 'Untitled App'}
                            </h2>
                          ) : null}
                          <p className="text-gray-600 leading-relaxed">
                            {activeFile.content.match(/<p[^>]*>(.*?)<\/p>/)?.[1] || 'Start building your app in App.tsx!'}
                          </p>
                          {activeFile.content.includes('button') && (
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                              {activeFile.content.match(/<button[^>]*>(.*?)<\/button>/)?.[1] || 'Click Me'}
                            </button>
                          )}
                        </div>
                        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-3">
                          <Info size={18} className="text-yellow-600 shrink-0" />
                          <p className="text-[11px] text-yellow-800">
                            <b>Developer Mode:</b> This is a high-fidelity simulation. Use the <b>"Run App"</b> button to launch the full dynamic transpiler in a dedicated window.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <pre className="text-xs bg-gray-50 p-6 rounded-lg border border-gray-200 whitespace-pre-wrap font-mono">{activeFile?.content}</pre>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terminal */}
          <div className="h-48 border-t border-[#333333] bg-[#1e1e1e] flex flex-col shrink-0">
            <div className="h-9 flex items-center px-4 gap-6 text-[11px] uppercase font-bold border-b border-[#333333]">
              <span className="text-white border-b border-white cursor-pointer flex items-center gap-2">
                <TerminalIcon size={12} /> Terminal
              </span>
              <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Output</span>
              <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Debug Console</span>
              <span className="text-gray-500 hover:text-gray-300 cursor-pointer flex items-center gap-1">
                Problems <span className="bg-[#333333] px-1 rounded text-[9px]">0</span>
              </span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
              {terminalOutput.map((line, i) => (
                <p key={i} className={line.startsWith('➜') ? 'text-blue-400' : line.includes('VITE') ? 'text-white' : line.includes('Error') ? 'text-red-400' : 'text-green-400'}>
                  {line}
                </p>
              ))}
              <div className="flex gap-2 mt-1">
                <span className="text-white">user@windows-11-sim:~$</span>
                <input 
                  type="text" 
                  className="bg-transparent outline-none flex-1 text-white" 
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = e.currentTarget.value;
                      setTerminalOutput(prev => [...prev, `user@windows-11-sim:~$ ${val}`]);
                      e.currentTarget.value = '';
                      
                      if (val === 'ls') setTerminalOutput(prev => [...prev, files.map(f => f.name).join('  ')]);
                      else if (val === 'clear') setTerminalOutput([]);
                      else if (val === 'help') setTerminalOutput(prev => [...prev, 'Available commands: ls, clear, help, echo, date, run, dotnet, git, npm']);
                      else if (val === 'date') setTerminalOutput(prev => [...prev, new Date().toString()]);
                      else if (val === 'run') runAsApp();
                      else if (val.startsWith('git ')) {
                        const cmd = val.slice(4);
                        if (cmd === 'status') {
                          setTerminalOutput(prev => [
                            ...prev, 
                            `On branch ${gitStatus.branch}`,
                            gitStatus.staged.length === 0 && gitStatus.unstaged.length === 0 ? 'nothing to commit, working tree clean' : 'Changes not staged for commit:',
                            ...gitStatus.unstaged.map(f => `  modified: ${f}`),
                            gitStatus.staged.length > 0 ? '\nChanges to be committed:' : '',
                            ...gitStatus.staged.map(f => `  new file: ${f}`)
                          ]);
                        } else if (cmd === 'init') {
                          setGitStatus(prev => ({ ...prev, unstaged: files.map(f => f.name) }));
                          setTerminalOutput(prev => [...prev, 'Initialized empty Git repository in /app/windows-11-sim/.git/']);
                        } else if (cmd.startsWith('add ')) {
                          const file = cmd.slice(4);
                          if (file === '.') {
                            setGitStatus(prev => ({ staged: [...prev.staged, ...prev.unstaged], unstaged: [], branch: prev.branch }));
                          } else {
                            setGitStatus(prev => ({ staged: [...prev.staged, file], unstaged: prev.unstaged.filter(f => f !== file), branch: prev.branch }));
                          }
                        } else if (cmd.startsWith('commit')) {
                          setGitStatus(prev => ({ staged: [], unstaged: [], branch: prev.branch }));
                          setTerminalOutput(prev => [...prev, '[main (root-commit) a1b2c3d] initial commit', `${files.length} files changed, 124 insertions(+)`]);
                        } else {
                          setTerminalOutput(prev => [...prev, `git: '${cmd}' is not a git command. See 'git --help'.`]);
                        }
                      }
                      else if (val.startsWith('npm ')) {
                        const cmd = val.slice(4);
                        if (cmd.startsWith('install')) {
                          setTerminalOutput(prev => [...prev, 'npm WARN deprecated request@2.88.2: request has been deprecated', 'added 142 packages, and audited 143 packages in 2s', 'found 0 vulnerabilities']);
                        } else if (cmd === 'run dev') {
                          setTerminalOutput(prev => [...prev, 'VITE v4.3.9  ready in 124 ms', '➜  Local:   http://localhost:5173/']);
                        } else {
                          setTerminalOutput(prev => [...prev, `npm ERR! Unknown command: "${cmd}"`]);
                        }
                      }
                      else if (val === 'dotnet run') {
                        const csFile = files.find(f => f.name.endsWith('.cs'));
                        if (csFile) {
                          setTerminalOutput(prev => [...prev, 'MSBuild version 17.4.0 for .NET', '  Determining projects to restore...', '  Restored Program.cs (in 45 ms).', '  Program -> bin/Debug/net7.0/Program.dll', '']);
                          // Simple execution simulation
                          const lines = csFile.content.match(/Console\.WriteLine\("(.*?)"\)/g);
                          if (lines) {
                            lines.forEach(l => {
                              const msg = l.match(/"(.*?)"/)?.[1];
                              if (msg) setTerminalOutput(prev => [...prev, msg]);
                            });
                          }
                        } else {
                          setTerminalOutput(prev => [...prev, 'Error: No .cs file found to run.']);
                        }
                      }
                      else if (val === 'dotnet build') {
                        setTerminalOutput(prev => [...prev, 'Microsoft (R) Build Engine version 17.4.0', 'Copyright (C) Microsoft Corporation. All rights reserved.', '', 'Build succeeded.', '    0 Warning(s)', '    0 Error(s)', '', 'Time Elapsed 00:00:01.42']);
                      }
                      else if (val === 'dotnet --version') setTerminalOutput(prev => [...prev, '7.0.100']);
                      else if (val.startsWith('echo ')) setTerminalOutput(prev => [...prev, val.slice(5)]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] flex items-center px-3 justify-between text-[11px] text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer transition-colors">
            <GitBranch size={12} />
            <span>main*</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer transition-colors">
            <RefreshCw size={12} />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer transition-colors">
            <AlertTriangle size={12} />
            <span>0</span>
            <Info size={12} />
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:bg-white/10 px-1 cursor-pointer transition-colors">Ln 1, Col 1</span>
          <span className="hover:bg-white/10 px-1 cursor-pointer transition-colors">Spaces: 2</span>
          <span className="hover:bg-white/10 px-1 cursor-pointer transition-colors uppercase">{activeFile?.language || 'plain text'}</span>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer transition-colors">
            <Check size={12} />
            <span>Prettier</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer transition-colors">
            <Bell size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
