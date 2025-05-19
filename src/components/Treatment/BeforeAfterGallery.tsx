import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TreatmentStep } from '../../types/treatment';

interface BeforeAfterGalleryProps {
  steps: TreatmentStep[];
}

export const BeforeAfterGallery = ({ steps }: BeforeAfterGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    stepId: string;
    type: 'before' | 'after';
    url: string;
  } | null>(null);
  
  const stepsWithImages = steps.filter(
    step => step.beforeImageUrl || step.afterImageUrl
  );

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {stepsWithImages.map((step) => (
          <div key={step.id} className="space-y-4">
            {step.beforeImageUrl && (
              <div className="relative group">
                <img
                  src={step.beforeImageUrl}
                  alt={`Before ${step.type}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setSelectedImage({
                      stepId: step.id,
                      type: 'before',
                      url: step.beforeImageUrl!
                    })}
                    className="p-2 bg-white rounded-full text-gray-800"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  Before
                </span>
              </div>
            )}
            {step.afterImageUrl && (
              <div className="relative group">
                <img
                  src={step.afterImageUrl}
                  alt={`After ${step.type}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setSelectedImage({
                      stepId: step.id,
                      type: 'after',
                      url: step.afterImageUrl!
                    })}
                    className="p-2 bg-white rounded-full text-gray-800"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  After
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              
              <img
                src={selectedImage.url}
                alt={`${selectedImage.type} treatment`}
                className="w-full rounded-lg"
              />
              
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100">
                  <ChevronLeft size={24} />
                </button>
              </div>
              
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};