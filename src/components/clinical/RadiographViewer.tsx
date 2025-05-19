import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AlertTriangle, Eye, FileText, Plus } from 'lucide-react';

interface Finding {
  id: string;
  area: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

interface RadiographViewerProps {
  imageUrl: string;
  findings: Finding[];
  onAddTreatment?: (finding: Finding) => void;
}

export const RadiographViewer = ({ imageUrl, findings, onAddTreatment }: RadiographViewerProps) => {
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Radiograph Analysis</h3>
          <Button
            variant="outline"
            size="sm"
            icon={<Eye size={16} />}
          >
            View Full Size
          </Button>
        </div>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#0073b9] animate-[progress_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          )}
          <img
            src={imageUrl}
            alt="Dental radiograph"
            className="w-full h-full object-contain"
          />
          {findings.map((finding, index) => (
            <button
              key={finding.id}
              className={`absolute w-6 h-6 rounded-full border-2 transition-colors ${
                selectedFinding?.id === finding.id
                  ? 'bg-[#0073b9] border-white'
                  : 'bg-white border-[#0073b9]'
              }`}
              style={{
                left: `${20 + (index * 15)}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedFinding(finding)}
            >
              <span className="text-xs font-medium">
                {index + 1}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Findings</h4>
          {findings.map((finding) => (
            <div
              key={finding.id}
              className={`p-4 border rounded-lg transition-colors ${
                selectedFinding?.id === finding.id
                  ? 'border-[#0073b9] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedFinding(finding)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-800">{finding.type}</h5>
                  <p className="text-sm text-gray-500">Area: {finding.area}</p>
                </div>
                <Badge
                  variant={
                    finding.severity === 'high' ? 'danger' :
                    finding.severity === 'medium' ? 'warning' : 'info'
                  }
                  size="sm"
                >
                  {finding.severity} severity
                </Badge>
              </div>

              <p className="mt-2 text-sm text-gray-600">{finding.description}</p>

              {finding.recommendations.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h6 className="text-sm font-medium text-gray-700 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    Recommendations
                  </h6>
                  <ul className="space-y-1">
                    {finding.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<FileText size={16} />}
                >
                  Details
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Plus size={16} />}
                  onClick={() => onAddTreatment?.(finding)}
                >
                  Add to Treatment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};