import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface PrognosisCardProps {
  prognosis: {
    successRate: number;
    factors: {
      positive: string[];
      negative: string[];
    };
    timeline: {
      phase: string;
      duration: string;
      milestones: string[];
    }[];
    recommendations: {
      priority: 'high' | 'medium' | 'low';
      action: string;
      rationale: string;
    }[];
  };
}

export const PrognosisCard = ({ prognosis }: PrognosisCardProps) => {
  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Treatment Prognosis</h3>
            <p className="text-sm text-gray-500">Expected outcome analysis</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0073b9]">{prognosis.successRate}%</div>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <CheckCircle size={16} className="text-green-500 mr-2" />
              Positive Factors
            </h4>
            <ul className="space-y-1">
              {prognosis.factors.positive.map((factor, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <XCircle size={16} className="text-red-500 mr-2" />
              Risk Factors
            </h4>
            <ul className="space-y-1">
              {prognosis.factors.negative.map((factor, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <Clock size={16} className="text-[#0073b9] mr-2" />
            Treatment Timeline
          </h4>
          <div className="space-y-4">
            {prognosis.timeline.map((phase, index) => (
              <div key={index} className="relative pl-6 pb-6 last:pb-0">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-[#0073b9]"></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-800">{phase.phase}</h5>
                    <span className="text-sm text-gray-500">{phase.duration}</span>
                  </div>
                  <ul className="space-y-1">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <AlertTriangle size={16} className="text-[#0073b9] mr-2" />
            Key Recommendations
          </h4>
          <div className="space-y-3">
            {prognosis.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Badge
                    variant={
                      rec.priority === 'high' ? 'danger' :
                      rec.priority === 'medium' ? 'warning' : 'info'
                    }
                    size="sm"
                    className="mt-0.5 mr-2"
                  >
                    {rec.priority}
                  </Badge>
                  <div>
                    <p className="font-medium text-gray-800">{rec.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{rec.rationale}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};