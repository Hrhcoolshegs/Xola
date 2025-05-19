import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface TreatmentVisualizerProps {
  steps: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    duration: string;
  }[];
  onStepChange?: (stepIndex: number) => void;
}

export const TreatmentVisualizer = ({ steps, onStepChange }: TreatmentVisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Treatment Visualization</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotate}
              icon={<RotateCw size={16} />}
            >
              Rotate
            </Button>
          </div>
        </div>
      </div>

      <div className="relative aspect-square">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
          className="h-full"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={step.id}>
              <motion.div
                className="w-full h-full flex items-center justify-center bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  rotate: rotation
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="text-white">
            <h4 className="font-medium">{steps[currentStep].title}</h4>
            <p className="text-sm opacity-90">{steps[currentStep].description}</p>
          </div>
        </div>

        <button
          onClick={handlePrevStep}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextStep}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="primary">Step {currentStep + 1}/{steps.length}</Badge>
            <span className="text-sm text-gray-500">{steps[currentStep].duration}</span>
          </div>
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};