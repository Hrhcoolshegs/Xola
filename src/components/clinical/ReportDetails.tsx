import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FileText, AlertTriangle, Brain, Book, FileCheck, ArrowLeft, Download, Printer, Share2 } from 'lucide-react';

interface ReportDetailsProps {
  diagnosticData: any;
  patientData: any;
  uploadedImages: File[];
  onBack: () => void;
}

export const ReportDetails = ({
  diagnosticData,
  patientData,
  uploadedImages,
  onBack
}: ReportDetailsProps) => {
  const [selectedTab, setSelectedTab] = useState<'findings' | 'guidelines' | 'research'>('findings');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <button
            onClick={onBack}
            className="flex items-center text-[#0073b9] hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Analysis
          </button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 size={16} />}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
            >
              Download
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Printer size={16} />}
            >
              Print
            </Button>
          </div>
        </div>

        {/* Patient Info */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{patientData.name}</h2>
              <p className="text-gray-500">Patient ID: {patientData.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Analysis Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </Card>

        {/* Uploaded Images */}
        <Card title="Diagnostic Images">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Diagnostic image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    URL.revokeObjectURL(target.src);
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
              selectedTab === 'findings'
                ? 'border-b-2 border-[#0073b9] text-[#0073b9]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('findings')}
          >
            <Brain size={16} className="mr-2" />
            AI Findings
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
              selectedTab === 'guidelines'
                ? 'border-b-2 border-[#0073b9] text-[#0073b9]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('guidelines')}
          >
            <FileCheck size={16} className="mr-2" />
            Regulatory Guidelines
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
              selectedTab === 'research'
                ? 'border-b-2 border-[#0073b9] text-[#0073b9]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('research')}
          >
            <Book size={16} className="mr-2" />
            Research Insights
          </button>
        </div>

        {/* Content */}
        {selectedTab === 'findings' && (
          <div className="space-y-6">
            {/* Detected Conditions */}
            <Card title="Detected Conditions">
              <div className="space-y-6">
                {diagnosticData.findings.map((finding: any, index: number) => (
                  <div key={index} className="p-4 bg-white border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {finding.condition}
                        </h3>
                        <p className="text-gray-500">Location: {finding.location}</p>
                      </div>
                      <Badge
                        variant={
                          finding.probability > 80 ? 'danger' :
                          finding.probability > 50 ? 'warning' : 'info'
                        }
                      >
                        {finding.probability}% Probability
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{finding.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          finding.probability > 80 ? 'bg-red-500' :
                          finding.probability > 50 ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${finding.probability}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Treatment Recommendations */}
            <Card title="Treatment Recommendations">
              <div className="space-y-4">
                {diagnosticData.recommendations.map((recommendation: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {recommendation.treatment}
                        </h4>
                        <Badge
                          variant={
                            recommendation.urgency === 'High' ? 'danger' :
                            recommendation.urgency === 'Medium' ? 'warning' : 'info'
                          }
                          size="sm"
                          className="mt-2"
                        >
                          {recommendation.urgency} Urgency
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          ${recommendation.cost}
                        </p>
                        <p className="text-sm text-gray-500">
                          Insurance: {recommendation.insuranceCoverage}%
                        </p>
                        <p className="text-xs text-gray-500">
                          Est. out-of-pocket: ${(recommendation.cost * (1 - recommendation.insuranceCoverage / 100)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {selectedTab === 'guidelines' && (
          <Card>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-gray-500">
                <FileCheck size={20} />
                <h3 className="text-lg font-medium">Regulatory Guidelines</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">American Dental Association (ADA)</h4>
                  <p className="text-gray-600">Guidelines for caries management and preventive care...</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">California Dental Board</h4>
                  <p className="text-gray-600">State-specific requirements and treatment protocols...</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">FDA Guidelines</h4>
                  <p className="text-gray-600">Medical device and material safety standards...</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {selectedTab === 'research' && (
          <Card>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-gray-500">
                <Book size={20} />
                <h3 className="text-lg font-medium">Academic Research Insights</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Journal of Dental Research</h4>
                  <p className="text-gray-600">Recent studies on treatment efficacy and outcomes...</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Clinical Studies</h4>
                  <p className="text-gray-600">Evidence-based treatment approaches and success rates...</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="primary"
            icon={<FileText size={16} />}
          >
            Proceed to Treatment Plan
          </Button>
        </div>
      </div>
    </div>
  );
};