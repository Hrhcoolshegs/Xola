import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, BookOpen, Activity } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { PrognosisOutput } from '../../services/prognosisService';

interface PrognosisCardProps {
  prognosis: PrognosisOutput;
  className?: string;
}

export const PrognosisCard = ({ prognosis, className = '' }: PrognosisCardProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getSeverityColor = (successRate: number) => {
    if (successRate >= 80) return 'success';
    if (successRate >= 60) return 'warning';
    return 'danger';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">AI Prognosis Analysis</h3>
          <Badge variant={getSeverityColor(prognosis.successRate)}>
            {prognosis.successRate}% Success Rate
          </Badge>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Recommendations Section */}
        <div className="p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'recommendations' ? null : 'recommendations')}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-primary mr-2" />
              <span className="font-medium text-gray-800">Recommendations</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedSection === 'recommendations' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'recommendations' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="mt-3 space-y-2">
                  {prognosis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="ml-3 text-gray-600">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guidelines Section */}
        <div className="p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'guidelines' ? null : 'guidelines')}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-primary mr-2" />
              <span className="font-medium text-gray-800">Clinical Guidelines</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedSection === 'guidelines' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'guidelines' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3">
                  {prognosis.guidelines.map((guideline, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="primary" size="sm">{guideline.source}</Badge>
                        <span className="text-xs text-gray-500">{guideline.reference}</span>
                      </div>
                      <p className="text-sm text-gray-600">{guideline.recommendation}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Risks Section */}
        <div className="p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'risks' ? null : 'risks')}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-primary mr-2" />
              <span className="font-medium text-gray-800">Risk Assessment</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedSection === 'risks' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'risks' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2">
                  {prognosis.risks.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">{risk.description}</span>
                      <Badge variant={getRiskColor(risk.level)}>
                        {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)} Risk
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Full Journey Section */}
        <div className="p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'journey' ? null : 'journey')}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-primary mr-2" />
              <span className="font-medium text-gray-800">Treatment Journey</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedSection === 'journey' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <AnimatePresence>
            {expandedSection === 'journey' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-gray-600">{prognosis.fullJourney}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <Button variant="primary" size="sm" fullWidth>
          Generate Detailed Report
        </Button>
      </div>
    </div>
  );
};