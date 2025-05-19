import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useTreatmentStore } from '../../stores/useTreatmentStore';
import { Button } from '../ui/Button';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  const {
    animation,
    visualization,
    toggleAnimation,
    nextStep,
    previousStep,
    resetAnimation,
    setVisualizationState,
  } = useTreatmentStore();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState<'3d' | 'lottie' | 'slides' | 'svg'>('3d');
  const modelViewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data - In production, this would come from your data store
  const lottieUrl = 'https://lottie.host/embed/123456/dental-animation.json';
  const slideImages = [
    'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg',
    'https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg',
  ];

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.addEventListener('error', () => {
        console.warn('3D model failed to load, switching to Lottie animation');
        setActiveVisualization('lottie');
      });
    }

    if (animation.isPlaying) {
      const interval = setInterval(() => {
        nextStep();
      }, 1000 / animation.speed);

      return () => clearInterval(interval);
    }
  }, [animation.isPlaying, animation.speed, nextStep]);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderVisualization = () => {
    switch (activeVisualization) {
      case '3d':
        return modelUrl ? (
          <model-viewer
            ref={modelViewerRef}
            src={modelUrl}
            alt={`3D visualization of ${procedure}`}
            camera-controls
            auto-rotate
            shadow-intensity="1"
            exposure="1"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null;

      case 'lottie':
        return (
          <Lottie
            animationData={lottieUrl}
            loop={animation.isPlaying}
            autoplay={animation.isPlaying}
            style={{ width: '100%', height: '100%' }}
          />
        );

      case 'slides':
        return (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {slideImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Treatment step ${index + 1}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-lg font-medium">Step {index + 1}</h3>
                  <p className="text-sm">Description of the treatment step</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        );

      case 'svg':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* SVG animation container */}
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* SVG animations would be implemented here */}
              </motion.div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const visualizationControls = (
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousStep}
          disabled={animation.currentStep === 0}
          icon={<ChevronLeft size={16} />}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAnimation}
          icon={animation.isPlaying ? <Pause size={16} /> : <Play size={16} />}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={nextStep}
          icon={<ChevronRight size={16} />}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={resetAnimation}
          icon={<RotateCcw size={16} />}
        />
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={activeVisualization}
          onChange={(e) => setActiveVisualization(e.target.value as any)}
          className="bg-transparent text-white border border-white border-opacity-20 rounded px-2 py-1"
        >
          <option value="3d">3D Model</option>
          <option value="lottie">Animation</option>
          <option value="slides">Slides</option>
          <option value="svg">SVG</option>
        </select>
        <Button
          variant="outline"
          size="sm"
          onClick={handleFullscreenToggle}
          icon={isFullscreen ? <X size={16} /> : <Maximize2 size={16} />}
        />
      </div>
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className} ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-black'
          : 'aspect-square rounded-lg overflow-hidden'
      }`}
      initial={false}
      animate={{ scale: isFullscreen ? 1 : 1 }}
    >
      {renderVisualization()}
      {visualizationControls}
    </motion.div>
  );
};