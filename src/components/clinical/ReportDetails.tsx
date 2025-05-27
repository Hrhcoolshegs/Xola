import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowLeft, Download, Printer, Share2, User, Calendar, FileText, Pill, AlertTriangle, Image as ImageIcon, Brain, Book, FileCheck } from 'lucide-react';
import { downloadReport } from '../../services/reportService';
import toast from 'react-hot-toast';

interface TreatmentDetailsModalProps {
  treatment: any;
  onClose: () => void;
}

const TreatmentDetailsModal = ({ treatment, onClose }: TreatmentDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-800">{treatment.treatment}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AlertTriangle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Treatment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Estimated Cost</p>
                <p className="font-medium">${treatment.cost}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Insurance Coverage</p>
                <p className="font-medium">{treatment.insuranceCoverage}%</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Procedure Steps</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">Pre-Treatment</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Review medical history</li>
                  <li>• Take necessary X-rays</li>
                  <li>• Discuss procedure details with patient</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">During Treatment</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Administer local anesthesia</li>
                  <li>• Perform procedure following standard protocols</li>
                  <li>• Monitor patient comfort and vital signs</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">Post-Treatment</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Provide post-operative instructions</li>
                  <li>• Schedule follow-up appointment</li>
                  <li>• Monitor healing progress</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Potential Complications</h3>
            <div className="p-3 bg-red-50 rounded-lg">
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Temporary discomfort or pain</li>
                <li>• Swelling or bruising</li>
                <li>• Infection risk (rare)</li>
                <li>• Allergic reactions to materials (rare)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Recovery Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-500">Day 1-2</div>
                <div className="flex-1 p-2 bg-gray-50 rounded text-sm text-gray-700">
                  Initial recovery period, may experience mild discomfort
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-500">Day 3-7</div>
                <div className="flex-1 p-2 bg-gray-50 rounded text-sm text-gray-700">
                  Gradual improvement, resume normal activities
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-500">Week 2+</div>
                <div className="flex-1 p-2 bg-gray-50 rounded text-sm text-gray-700">
                  Full recovery expected, follow-up appointment
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary">
              Schedule Treatment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportDetails = ({ diagnosticData, patientData, uploadedImages, onBack }: any) => {
  const [selectedTab, setSelectedTab] = useState<'findings' | 'guidelines' | 'research'>('findings');
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [showTreatmentDetails, setShowTreatmentDetails] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadReport('report-content', `Dental_Report_${patientData.id}`);
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download report');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!diagnosticData || !patientData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle size={64} className="text-yellow-500 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Report Data Not Found</h2>
          <p className="text-gray-600 mb-8">
            Unable to generate report. Please return to the Clinical page and try again.
          </p>
          <Link to="/clinical">
            <Button variant="primary">
              Return to Clinical
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 print:p-0 print:bg-white">
      <div id="report-content" className="max-w-5xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <Link to="/clinical" className="text-[#0073b9] hover:underline flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Clinical
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 size={16} />}
              onClick={() => toast.success('Share feature coming soon')}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Printer size={16} />}
              onClick={() => window.print()}
            >
              Print
            </Button>
          </div>
        </div>

        {/* Report Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 print:shadow-none print:border-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="h-16 w-16 bg-[#0073b9] rounded-full flex items-center justify-center text-white">
                  <User size={32} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{patientData.name}</h1>
                <p className="text-gray-500">Patient ID: {patientData.id}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">Report Generated</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{patientData.dob}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{patientData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance</p>
              <p className="font-medium">{patientData.insurance}</p>
            </div>
          </div>
        </div>

        {/* Uploaded Images */}
        {uploadedImages && uploadedImages.length > 0 && (
          <Card title="Diagnostic Images">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedImages.map((image: File, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-50 flex items-center justify-center">
                    <img 
                      src={URL.createObjectURL(image)}
                      alt={`Diagnostic Image ${index + 1}`}
                      className="w-full h-full object-contain"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        URL.revokeObjectURL(target.src);
                      }}
                    />
                  </div>
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm font-medium text-gray-700">{image.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Captured: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tabs Navigation */}
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
            Xola Findings
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

        {/* Tab Content */}
        {selectedTab === 'findings' && (
          <div className="space-y-6">
            {/* Detected Conditions */}
            <Card title="Detected Conditions">
              <div className="space-y-6">
                {diagnosticData.findings.map((finding: any, index: number) => (
                  <div key={index} className="p-4 bg-white border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{finding.condition}</h3>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-600 mb-4">{finding.description}</p>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Severity Assessment</h4>
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
                      </div>
                      
                      <div className="relative aspect-video rounded-lg overflow-hidden border">
                        <img
                          src={finding.imageUrl}
                          alt={`${finding.condition} visualization`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                          {finding.condition} - {finding.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Treatment Recommendations */}
            <Card title="Treatment Recommendations">
              <div className="space-y-4">
                {diagnosticData.recommendations.map((recommendation: any, index: number) => (
                  <div key={index} className="p-4 bg-white border rounded-lg hover:border-[#0073b9] transition-colors">
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
                        <p className="text-lg font-semibold text-[#0073b9]">
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

                    {recommendation.medication !== 'None' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Pill className="text-blue-500 mr-2" size={16} />
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Prescribed Medication</h4>
                            <p className="text-gray-600 mt-1">{recommendation.medication}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTreatment(recommendation);
                          setShowTreatmentDetails(true);
                        }}
                      >
                        View Details
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
                  <div className="space-y-3">
                    <p className="text-gray-600">Current guidelines for caries management and preventive care include:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Risk-based prevention protocols</li>
                      <li>Evidence-based treatment planning</li>
                      <li>Regular monitoring and assessment</li>
                    </ul>
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                      View full ADA guidelines →
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">California Dental Board</h4>
                  <div className="space-y-3">
                    <p className="text-gray-600">State-specific requirements and treatment protocols:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Infection control standards</li>
                      <li>Documentation requirements</li>
                      <li>Patient safety protocols</li>
                    </ul>
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                      View state regulations →
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">FDA Guidelines</h4>
                  <div className="space-y-3">
                    <p className="text-gray-600">Medical device and material safety standards:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Material biocompatibility requirements</li>
                      <li>Sterilization protocols</li>
                      <li>Quality assurance measures</li>
                    </ul>
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                      View FDA guidelines →
                    </p>
                  </div>
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
                  <h4 className="font-medium text-gray-800 mb-2">Recent Studies</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium text-gray-700">Journal of Dental Research (2024)</p>
                      <p className="text-gray-600 mt-1">
                        "Long-term Outcomes of Early Intervention in Dental Caries Management"
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Key finding: Early intervention shows 85% success rate in preventing caries progression.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium text-gray-700">International Journal of Dentistry (2023)</p>
                      <p className="text-gray-600 mt-1">
                        "Comparative Analysis of Treatment Modalities for Periodontal Disease"
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Key finding: Combined mechanical and chemical approaches show superior outcomes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Clinical Evidence</h4>
                  <div className="space-y-3">
                    <p className="text-gray-600">Meta-analysis of treatment approaches shows:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>92% success rate with early intervention</li>
                      <li>Significant reduction in long-term complications</li>
                      <li>Improved patient outcomes with preventive measures</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Ongoing Research</h4>
                  <div className="space-y-3">
                    <p className="text-gray-600">Current clinical trials investigating:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Novel treatment methodologies</li>
                      <li>Advanced diagnostic techniques</li>
                      <li>Patient-specific treatment optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Footer Notes */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Important Notice</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This report is for informational purposes only. Please consult with your healthcare provider
                for specific medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 print:hidden">
          <Button
            variant="primary"
            icon={<FileText size={16} />}
            onClick={() => navigate('/treatment/new', {
              state: {
                diagnosticData,
                patientId: patientData.id,
                recommendations: diagnosticData.recommendations
              }
            })}
          >
            Proceed to Treatment Plan
          </Button>
        </div>

        {/* Modals */}
        {showTreatmentDetails && selectedTreatment && (
          <TreatmentDetailsModal
            treatment={selectedTreatment}
            onClose={() => setShowTreatmentDetails(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ReportDetails;

export { ReportDetails };