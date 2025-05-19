import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, Clock, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface TimelineStep {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  images?: {
    before?: string;
    after?: string;
  };
}

interface TreatmentTimelineProps {
  steps: TimelineStep[];
  onImageClick?: (image: string) => void;
}

export const TreatmentTimeline = ({ steps, onImageClick }: TreatmentTimelineProps) => {
  return (
    <Card>
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800">Treatment Progress</h3>
        
        <div className="relative">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`relative pl-8 pb-8 last:pb-0 ${
                index !== steps.length - 1 ? 'border-l-2 border-gray-200 ml-4' : ''
              }`}
            >
              <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-green-100 text-green-600' :
                step.status === 'current' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle size={16} />
                ) : step.status === 'current' ? (
                  <Clock size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
              </div>

              <div className="ml-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{step.title}</h4>
                    <div className="flex items-center mt-1">
                      <Calendar size={14} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{step.date}</span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      step.status === 'completed' ? 'success' :
                      step.status === 'current' ? 'primary' : 'outline'
                    }
                    size="sm"
                  >
                    {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-gray-600">{step.description}</p>

                {step.images && (
                  <div className="mt-4 flex space-x-4">
                    {step.images.before && (
                      <div className="relative group">
                        <div className="aspect-square w-24 rounded-lg overflow-hidden border border-gray-200">
                          <img 
                            src={step.images.before} 
                            alt="Before treatment"
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => onImageClick?.(step.images?.before || '')}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                          <ImageIcon size={16} className="text-white" />
                        </div>
                        <span className="absolute -bottom-6 left-0 text-xs text-gray-500">Before</span>
                      </div>
                    )}
                    {step.images.after && (
                      <div className="relative group">
                        <div className="aspect-square w-24 rounded-lg overflow-hidden border border-gray-200">
                          <img 
                            src={step.images.after} 
                            alt="After treatment"
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => onImageClick?.(step.images?.after || '')}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                          <ImageIcon size={16} className="text-white" />
                        </div>
                        <span className="absolute -bottom-6 left-0 text-xs text-gray-500">After</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};