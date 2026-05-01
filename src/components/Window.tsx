import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindows, AppId } from '../context/WindowContext';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { THEMES } from '../constants';

interface WindowProps {
  id: AppId;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export default function Window({ id, title, icon, children, defaultWidth = 800, defaultHeight = 600 }: WindowProps) {
  const { windows, activeWindowId, closeApp, minimizeApp, maximizeApp, focusApp, systemTheme } = useWindows();
  const windowState = windows.find(w => w.id === id);
  const isDark = THEMES[systemTheme].mode === 'dark';

  const [pos, setPos] = useState({ x: 100 + (Math.random() * 50), y: 50 + (Math.random() * 50) });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowState?.isMaximized) {
        setPos({
          x: e.clientX - dragStart.current.x,
          y: Math.max(0, e.clientY - dragStart.current.y) // Don't drag above the taskbar/top
        });
      }

      if (isResizing && !windowState?.isMaximized) {
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;
        
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = pos.x;
        let newY = pos.y;

        if (isResizing.includes('e')) newWidth = Math.max(300, resizeStart.current.w + dx);
        if (isResizing.includes('s')) newHeight = Math.max(200, resizeStart.current.h + dy);
        if (isResizing.includes('w')) {
          const w = Math.max(300, resizeStart.current.w - dx);
          if (w > 300) {
            newWidth = w;
            newX = e.clientX;
          }
        }
        if (isResizing.includes('n')) {
          const h = Math.max(200, resizeStart.current.h - dy);
          if (h > 200) {
            newHeight = h;
            newY = e.clientY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPos({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, size, pos, windowState?.isMaximized]);

  if (!windowState || !windowState.isOpen) return null;

  const onDragStart = (e: React.MouseEvent) => {
    if (windowState.isMaximized) {
      // Restore on drag
      maximizeApp(id);
      // We need to calculate where to place it so it feels natural
      // For now just restore
      return;
    }
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
    focusApp(id);
  };

  const onResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(direction);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height
    };
    focusApp(id);
  };

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseDown={() => focusApp(id)}
          style={{
            zIndex: windowState.zIndex,
            width: windowState.isMaximized ? '100%' : size.width,
            height: windowState.isMaximized ? (systemTheme === 'linux' ? 'calc(100% - 48px)' : 'calc(100% - 48px)') : size.height,
            top: windowState.isMaximized ? (systemTheme === 'linux' ? 48 : 0) : pos.y,
            left: windowState.isMaximized ? 0 : pos.x,
            position: 'absolute',
          }}
          className={`
            flex flex-col backdrop-blur-xl border shadow-2xl rounded-lg overflow-hidden
            ${isDark 
              ? 'bg-[#121416] border-white/10 text-white' 
              : 'bg-white/90 border-white/40 text-gray-800'}
            ${activeWindowId === id ? (isDark ? 'ring-1 ring-blue-400/40' : 'ring-1 ring-blue-500/30') : ''}
            transition-[background-color,ring] duration-300 ease-in-out
          `}
        >
          {/* Resize Handles */}
          {!windowState.isMaximized && (
            <>
              <div onMouseDown={(e) => onResizeStart(e, 'n')} className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize z-50" />
              <div onMouseDown={(e) => onResizeStart(e, 's')} className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize z-50" />
              <div onMouseDown={(e) => onResizeStart(e, 'e')} className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize z-50" />
              <div onMouseDown={(e) => onResizeStart(e, 'w')} className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize z-50" />
              <div onMouseDown={(e) => onResizeStart(e, 'se')} className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-[60]" />
              <div onMouseDown={(e) => onResizeStart(e, 'sw')} className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-[60]" />
            </>
          )}

          {/* Title Bar */}
          <div 
            className={`h-10 flex items-center justify-between px-3 select-none cursor-default active:cursor-grabbing ${isDark ? 'bg-white/5' : 'bg-white/20'}`}
            onMouseDown={onDragStart}
            onDoubleClick={() => maximizeApp(id)}
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <span className="w-4 h-4">{icon}</span>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{title}</span>
            </div>
            <div className="flex items-center">
              <button 
                onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                className={`p-2 transition-colors rounded-sm ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200/50'}`}
              >
                <Minus size={14} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
                className={`p-2 transition-colors rounded-sm ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200/50'}`}
              >
                {windowState.isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                className="p-2 hover:bg-red-500 hover:text-white transition-colors rounded-sm"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 overflow-auto ${isDark ? 'bg-black/40' : 'bg-white/50'}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
