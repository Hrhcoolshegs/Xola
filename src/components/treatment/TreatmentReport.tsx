import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowLeft, Download, Printer, Share2, User, Calendar, FileText, Pill, AlertTriangle, Image as ImageIcon, Brain, Book, FileCheck } from 'lucide-react';
import { downloadReport } from '../../services/reportService';
import toast from 'react-hot-toast';
import { patients } from '../../utils/sampleData';

interface TreatmentReportProps {
  treatment: any;
}

export const TreatmentReport = ({ treatment }: TreatmentReportProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const patient = patients.find(p => p.id === treatment.patientId);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadReport('report-content', `Treatment_Report_${treatment.id}`);
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download report');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 print:p-0 print:bg-white">
      <div id="report-content" className="max-w-5xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <Button
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Back to Treatment
          </Button>
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
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-[#0073b9] rounded-full flex items-center justify-center text-white mr-4">
                <User size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{patient?.name}</h1>
                <p className="text-gray-500">Patient ID: {treatment.patientId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Treatment Plan ID</p>
              <p className="font-medium">{treatment.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{treatment.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge variant={treatment.status === 'active' ? 'primary' : 'outline'}>
                {treatment.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Progress</p>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-2 bg-[#0073b9] rounded-full"
                    style={{ width: `${treatment.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{treatment.progress}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Treatment Summary */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Treatment Summary</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: treatment.notes }} />
          </div>
        </Card>

        {/* Procedures */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Procedures</h2>
            <div className="space-y-4">
              {treatment.procedures.map((procedure: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{procedure.treatment}</h3>
                      <Badge
                        variant={
                          procedure.urgency === 'High' ? 'danger' :
                          procedure.urgency === 'Medium' ? 'warning' : 'info'
                        }
                        size="sm"
                        className="mt-2"
                      >
                        {procedure.urgency} Urgency
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#0073b9]">${procedure.cost}</p>
                      <p className="text-sm text-gray-500">Insurance: {procedure.insuranceCoverage}%</p>
                      <p className="text-xs text-gray-500">
                        Est. out-of-pocket: ${(procedure.cost * (1 - procedure.insuranceCoverage / 100)).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {procedure.medication && procedure.medication !== 'None' && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Pill className="text-blue-500 mr-2" size={16} />
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Prescribed Medication</h4>
                          <p className="text-gray-600 mt-1">{procedure.medication}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Progress Gallery */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Treatment Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Before Treatment</h3>
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img
                    src="https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg"
                    alt="Before treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Current Progress</h3>
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img
                    src="https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg"
                    alt="Current progress"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
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