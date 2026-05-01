import React, { useRef, useState, useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import { Eraser, Pencil, Square, Circle, Minus, Type, Download, Trash2, Undo, Maximize2 } from 'lucide-react';

export default function Paint() {
  const { language } = useWindows();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'rect' | 'circle' | 'line'>('pencil');
  const [history, setHistory] = useState<string[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const t = {
    pt: {
      tools: 'Ferramentas',
      shapes: 'Formas',
      colors: 'Cores',
      size: 'Tamanho',
      clear: 'Limpar',
      undo: 'Desfazer',
      save: 'Salvar',
      expand: 'Aumentar Tela'
    },
    en: {
      tools: 'Tools',
      shapes: 'Shapes',
      colors: 'Colors',
      size: 'Size',
      clear: 'Clear',
      undo: 'Undo',
      save: 'Save',
      expand: 'Expand Canvas'
    },
    es: {
      tools: 'Herramientas',
      shapes: 'Formas',
      colors: 'Colores',
      size: 'Tamaño',
      clear: 'Limpiar',
      undo: 'Deshacer',
      save: 'Guardar',
      expand: 'Expandir Lienzo'
    }
  }[language] || {
    tools: 'Tools',
    shapes: 'Shapes',
    colors: 'Colors',
    size: 'Size',
    clear: 'Clear',
    undo: 'Undo',
    save: 'Save',
    expand: 'Expand Canvas'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial size based on parent if possible, otherwise default
    const rect = canvas.parentElement?.getBoundingClientRect();
    const initialWidth = rect ? Math.max(rect.width - 64, 800) : 800;
    const initialHeight = rect ? Math.max(rect.height - 64, 600) : 600;
    
    setCanvasSize({ width: initialWidth, height: initialHeight });
    
    canvas.width = initialWidth;
    canvas.height = initialHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;

    // Fill background with white
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    saveToHistory();
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth, tool]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setHistory(prev => [...prev, canvas.toDataURL()].slice(-20));
    }
  };

  const expandCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const oldData = canvas.toDataURL();
    const newWidth = canvasSize.width + 2000; // Much larger expansion
    const newHeight = canvasSize.height + 2000;

    setCanvasSize({ width: newWidth, height: newHeight });
    
    canvas.width = newWidth;
    canvas.height = newHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.fillStyle = 'white';
    context.fillRect(0, 0, newWidth, newHeight);

    const img = new Image();
    img.src = oldData;
    img.onload = () => {
      context.drawImage(img, 0, 0);
      context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      context.lineWidth = lineWidth;
      saveToHistory();
    };
  };

  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
    saveToHistory();
  };

  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const getCoordinates = (event: any) => {
    if (event.type.includes('touch')) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { offsetX: 0, offsetY: 0 };
      return {
        offsetX: event.touches[0].clientX - rect.left,
        offsetY: event.touches[0].clientY - rect.top
      };
    }
    return { offsetX: event.offsetX, offsetY: event.offsetY };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
    }
  };

  const undo = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const lastState = newHistory[newHistory.length - 1];
    
    const img = new Image();
    img.src = lastState;
    img.onload = () => {
      contextRef.current?.drawImage(img, 0, 0);
      setHistory(newHistory);
    };
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'paint-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const colors = [
    '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4',
    '#ffffff', '#c3c3c3', '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7'
  ];

  return (
    <div className="h-full flex flex-col bg-[#f0f0f0] select-none overflow-hidden">
      {/* Ribbon */}
      <div className="bg-white border-b p-2 flex flex-wrap gap-4 items-start shadow-sm">
        {/* Tools Section */}
        <div className="flex flex-col gap-1 border-r pr-4">
          <span className="text-[10px] text-gray-400 uppercase font-bold px-1">{t.tools}</span>
          <div className="grid grid-cols-3 gap-1">
            <button 
              onClick={() => setTool('pencil')}
              className={`p-1.5 rounded hover:bg-blue-50 border ${tool === 'pencil' ? 'bg-blue-100 border-blue-300' : 'border-transparent'}`}
              title="Pencil"
            >
              <Pencil size={16} />
            </button>
            <button 
              onClick={() => setTool('eraser')}
              className={`p-1.5 rounded hover:bg-blue-50 border ${tool === 'eraser' ? 'bg-blue-100 border-blue-300' : 'border-transparent'}`}
              title="Eraser"
            >
              <Eraser size={16} />
            </button>
            <button 
              onClick={undo}
              className="p-1.5 rounded hover:bg-blue-50 border border-transparent"
              title={t.undo}
            >
              <Undo size={16} />
            </button>
            <button 
              onClick={clearCanvas}
              className="p-1.5 rounded hover:bg-red-50 border border-transparent text-red-500"
              title={t.clear}
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={downloadImage}
              className="p-1.5 rounded hover:bg-green-50 border border-transparent text-green-600"
              title={t.save}
            >
              <Download size={16} />
            </button>
            <button 
              onClick={expandCanvas}
              className="p-1.5 rounded hover:bg-blue-50 border border-transparent text-blue-600"
              title={t.expand}
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Brush Size Section */}
        <div className="flex flex-col gap-1 border-r pr-4">
          <span className="text-[10px] text-gray-400 uppercase font-bold px-1">{t.size}</span>
          <div className="flex flex-col gap-2 mt-1 px-1">
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={lineWidth} 
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-center text-gray-500">{lineWidth}px</span>
          </div>
        </div>

        {/* Colors Section */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase font-bold px-1">{t.colors}</span>
          <div className="flex gap-3 items-center">
            <div 
              className="w-8 h-8 border-2 border-white shadow-sm rounded" 
              style={{ backgroundColor: color }}
            />
            <div className="grid grid-cols-10 gap-1">
              {colors.map(c => (
                <div 
                  key={c} 
                  onClick={() => setColor(c)}
                  className={`w-4 h-4 border border-gray-300 cursor-pointer hover:scale-110 transition-transform ${color === c ? 'ring-1 ring-blue-500' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8 overflow-auto flex items-start justify-start bg-[#e0e0e0]">
        <div 
          className="bg-white shadow-2xl relative" 
          style={{ 
            cursor: tool === 'eraser' ? 'cell' : 'crosshair',
            width: canvasSize.width,
            height: canvasSize.height
          }}
        >
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            ref={canvasRef}
            className="block"
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-white border-t flex items-center px-4 text-[10px] text-gray-500 gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border" style={{ backgroundColor: color }} />
          <span>{color.toUpperCase()}</span>
        </div>
        <span>{lineWidth}px</span>
        <span>{canvasSize.width} x {canvasSize.height}px</span>
        <div className="flex-1" />
        <span>100%</span>
      </div>
    </div>
  );
}
