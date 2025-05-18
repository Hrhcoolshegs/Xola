import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Download, Printer, Share2, User, Calendar, FileText, Pill, AlertTriangle, Image } from 'lucide-react';

const Report = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { diagnosticData, patientData, uploadedImages } = location.state || {};

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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSeverityColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-100 text-red-800';
    if (probability >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto space-y-6">
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
              onClick={() => {/* Implement share functionality */}}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
              onClick={() => {/* Implement download functionality */}}
            >
              Download
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Printer size={16} />}
              onClick={handlePrint}
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
              <p className="font-medium">{formatDate(new Date().toISOString())}</p>
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
                        // Clean up object URL after image loads
                        const target = e.target as HTMLImageElement;
                        URL.revokeObjectURL(target.src);
                      }}
                    />
                  </div>
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm font-medium text-gray-700">{image.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Captured: {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Diagnosis Summary */}
        <Card title="Diagnosis Summary">
          <div className="space-y-6">
            {diagnosticData.findings.map((finding: any, index: number) => (
              <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{finding.condition}</h3>
                    <p className="text-gray-500">Location: {finding.location}</p>
                  </div>
                  <Badge
                    variant={finding.probability > 80 ? 'danger' : 
                            finding.probability > 50 ? 'warning' : 'info'}
                    className="mt-2 sm:mt-0"
                  >
                    {finding.probability}% Probability
                  </Badge>
                </div>

                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Immediate Actions Required</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Schedule follow-up appointment</li>
                        <li>Begin prescribed medication regimen</li>
                        <li>Monitor for changes in symptoms</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Long-term Recommendations</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Regular check-ups every 3 months</li>
                        <li>Maintain oral hygiene routine</li>
                        <li>Diet modifications as discussed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Treatment Plan */}
        <Card title="Treatment Plan">
          <div className="space-y-6">
            {diagnosticData.recommendations.map((recommendation: any, index: number) => (
              <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{recommendation.treatment}</h3>
                    <Badge
                      variant={
                        recommendation.urgency === 'High' ? 'danger' :
                        recommendation.urgency === 'Medium' ? 'warning' : 'info'
                      }
                      size="sm"
                      className="mt-2 sm:mt-0"
                    >
                      {recommendation.urgency} Urgency
                    </Badge>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="text-sm text-gray-500">Estimated Cost</p>
                    <p className="text-lg font-semibold text-gray-800">${recommendation.cost}</p>
                    <p className="text-xs text-gray-500">Insurance Coverage: {recommendation.insuranceCoverage}%</p>
                  </div>
                </div>

                {recommendation.medication !== 'None' && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start">
                      <Pill className="text-blue-500 mr-2 mt-1" size={16} />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Prescribed Medication</h4>
                        <p className="text-gray-600 mt-1">{recommendation.medication}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar size={16} className="text-gray-500 mr-2" />
                      <h4 className="text-sm font-medium text-gray-700">Timeline</h4>
                    </div>
                    <p className="text-gray-600">Treatment duration: 2-3 weeks</p>
                    <p className="text-gray-600">Follow-up: 1 month</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FileText size={16} className="text-gray-500 mr-2" />
                      <h4 className="text-sm font-medium text-gray-700">Instructions</h4>
                    </div>
                    <ul className="text-gray-600 list-disc list-inside">
                      <li>Follow medication schedule</li>
                      <li>Avoid hard foods</li>
                      <li>Report any complications</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle size={16} className="text-gray-500 mr-2" />
                      <h4 className="text-sm font-medium text-gray-700">Precautions</h4>
                    </div>
                    <ul className="text-gray-600 list-disc list-inside">
                      <li>Monitor for swelling</li>
                      <li>Avoid strenuous activity</li>
                      <li>Contact if pain persists</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes & Recommendations */}
        <Card title="Additional Notes & Recommendations">
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Important Reminders</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please schedule a follow-up appointment within the next 2 weeks to monitor progress
                    and adjust treatment plan if necessary.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Lifestyle Recommendations</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Maintain regular oral hygiene routine</li>
                <li>Use prescribed mouthwash twice daily</li>
                <li>Avoid sugary foods and beverages</li>
                <li>Continue regular dental check-ups</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 print:mt-16">
          <p>Generated by Xola SmartCare AI Diagnostic System</p>
          <p className="mt-1">This report is for informational purposes only and should be reviewed by a healthcare professional.</p>
        </div>
      </div>
    </div>
  );
};

export default Report;