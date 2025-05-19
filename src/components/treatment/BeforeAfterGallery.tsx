import { useEffect, useRef } from 'react';
import LightGallery from 'lightgallery';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

interface BeforeAfterImage {
  id: string;
  before: string;
  after?: string;
  date: string;
  procedure: string;
  notes?: string;
}

interface BeforeAfterGalleryProps {
  images: BeforeAfterImage[];
  onImageClick?: (image: BeforeAfterImage) => void;
}

export const BeforeAfterGallery = ({ images, onImageClick }: BeforeAfterGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<any>(null);

  useEffect(() => {
    if (galleryRef.current) {
      lightGalleryInstance.current = LightGallery(galleryRef.current, {
        speed: 500,
        download: false,
        counter: false,
        plugins: [],
      });

      return () => {
        lightGalleryInstance.current?.destroy();
      };
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Treatment Progress Gallery</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" icon={<ChevronLeft size={16} />}>
            Previous
          </Button>
          <Button variant="outline" size="sm" icon={<ChevronRight size={16} />}>
            Next
          </Button>
        </div>
      </div>

      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="space-y-4">
            <div className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 h-full">
                  <div className="relative">
                    <img
                      src={image.before}
                      alt="Before treatment"
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      variant="primary"
                      className="absolute top-2 left-2"
                    >
                      Before
                    </Badge>
                  </div>
                  {image.after ? (
                    <div className="relative">
                      <img
                        src={image.after}
                        alt="After treatment"
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        variant="success"
                        className="absolute top-2 right-2"
                      >
                        After
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-gray-50">
                      <p className="text-gray-400 text-sm">Pending</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ZoomIn size={16} />}
                  onClick={() => onImageClick?.(image)}
                >
                  View Details
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800">{image.procedure}</h4>
              <p className="text-sm text-gray-500">{image.date}</p>
              {image.notes && (
                <p className="text-sm text-gray-600 mt-1">{image.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};