import { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, RefreshCw, Circle, Download, Trash2, Image as ImageIcon } from 'lucide-react';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/png');
        setPhotos(prev => [photo, ...prev]);
      }
    }
  };

  const downloadPhoto = (photo: string) => {
    const a = document.createElement('a');
    a.href = photo;
    a.download = `photo-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const deletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full bg-black text-white flex flex-col overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center bg-gray-900">
        {error ? (
          <div className="text-center p-8">
            <CameraIcon size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-red-400">{error}</p>
            <button 
              onClick={startCamera}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="max-h-full max-w-full object-contain"
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-12">
          <button 
            className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-95"
            title="Switch Camera"
          >
            <RefreshCw size={24} />
          </button>
          <button 
            onClick={takePhoto}
            className="p-1 bg-white rounded-full transition-all hover:scale-110 active:scale-90"
            title="Take Photo"
          >
            <div className="p-4 border-4 border-black rounded-full">
              <Circle size={32} className="fill-black" />
            </div>
          </button>
          <div className="relative group">
            <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden border border-white/20">
              {photos.length > 0 ? (
                <img src={photos[0]} alt="Last photo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={20} className="opacity-40" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Sidebar/Bottom */}
      {photos.length > 0 && (
        <div className="h-32 bg-black/50 border-t border-white/10 p-4 flex gap-4 overflow-x-auto no-scrollbar shrink-0">
          {photos.map((photo, i) => (
            <div key={i} className="relative group shrink-0">
              <img src={photo} alt={`Photo ${i}`} className="h-full rounded-lg border border-white/20" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                <button 
                  onClick={() => downloadPhoto(photo)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Download"
                >
                  <Download size={16} />
                </button>
                <button 
                  onClick={() => deletePhoto(i)}
                  className="p-2 hover:bg-red-500/40 rounded-full transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
