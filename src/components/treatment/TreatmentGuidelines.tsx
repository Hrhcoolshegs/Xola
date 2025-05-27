import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Book, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Guideline {
  title: string;
  source: string;
  level: 'recommended' | 'required' | 'optional';
  description: string;
  criteria: string[];
  contraindications?: string[];
  evidence: {
    source: string;
    link: string;
    year: number;
  }[];
}

interface TreatmentGuidelinesProps {
  guidelines: Guideline[];
  onGuidelineSelect?: (guideline: Guideline) => void;
}

export const TreatmentGuidelines = ({ guidelines, onGuidelineSelect }: TreatmentGuidelinesProps) => {
  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Book className="text-[#0073b9]" size={20} />
          <h3 className="text-lg font-medium text-gray-800">Clinical Guidelines</h3>
        </div>

        <div className="space-y-4">
          {guidelines.map((guideline, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:border-[#0073b9] transition-colors cursor-pointer"
              onClick={() => onGuidelineSelect?.(guideline)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-800">{guideline.title}</h4>
                  <p className="text-sm text-gray-500">{guideline.source}</p>
                </div>
                <Badge
                  variant={
                    guideline.level === 'required' ? 'danger' :
                    guideline.level === 'recommended' ? 'warning' : 'info'
                  }
                >
                  {guideline.level}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4">{guideline.description}</p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <CheckCircle size={16} className="mr-2 text-green-500" />
                    <h5 className="font-medium">Criteria</h5>
                  </div>
                  <ul className="space-y-1">
                    {guideline.criteria.map((criterion, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>

                {guideline.contraindications && (
                  <div>
                    <div className="flex items-center text-gray-700 mb-2">
                      <AlertTriangle size={16} className="mr-2 text-red-500" />
                      <h5 className="font-medium">Contraindications</h5>
                    </div>
                    <ul className="space-y-1">
                      {guideline.contraindications.map((contraindication, idx) => (
                        <li key={idx} className="text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {contraindication}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <Info size={16} className="mr-2 text-[#0073b9]" />
                    <h5 className="font-medium">Evidence Base</h5>
                  </div>
                  <div className="space-y-2">
                    {guideline.evidence.map((evidence, idx) => (
                      <a
                        key={idx}
                        href={evidence.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-[#0073b9] hover:underline"
                      >
                        {evidence.source} ({evidence.year})
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};