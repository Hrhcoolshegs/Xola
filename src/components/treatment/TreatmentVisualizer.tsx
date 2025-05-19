import { useEffect, useRef } from 'react';
import '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface TreatmentVisualizerProps {
  modelUrl?: string;
  procedure: string;
  className?: string;
}

export const TreatmentVisualizer = ({ modelUrl, procedure, className = '' }: TreatmentVisualizerProps) => {
  const fallbackUrl = "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=600";
  
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.addEventListener('error', () => {
        console.warn('3D model failed to load, falling back to 2D image');
      });
    }
  }, []);

  if (!modelUrl) {
    return (
      <div className={`relative aspect-square rounded-lg overflow-hidden ${className}`}>
        <img 
          src={fallbackUrl} 
          alt={`${procedure} visualization`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-center px-4">
            <span className="block font-medium mb-2">{procedure}</span>
            <span className="text-sm opacity-80">3D visualization coming soon</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`aspect-square rounded-lg overflow-hidden ${className}`}>
      <model-viewer
        ref={modelViewerRef}
        src={modelUrl}
        alt={`3D visualization of ${procedure}`}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        style={{ width: '100%', height: '100%' }}
      >
        <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#0073b9] animate-[progress_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        <div slot="error" className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-red-500">Failed to load 3D model</p>
        </div>
      </model-viewer>
    </div>
  );
};