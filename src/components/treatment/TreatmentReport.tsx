import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FileText, Download, Printer, Share2, Clock, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

interface TreatmentReportProps {
  treatment: {
    id: string;
    patientId: string;
    startDate: string;
    procedures: {
      name: string;
      status: string;
      notes?: string[];
      cost: number;
      insuranceCoverage: number;
    }[];
    notes?: {
      date: string;
      author: string;
      content: string;
      type: 'progress' | 'observation' | 'recommendation';
    }[];
  };
  onPrint?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

export const TreatmentReport = ({ treatment, onPrint, onDownload, onShare }: TreatmentReportProps) => {
  const totalCost = treatment.procedures.reduce((sum, proc) => sum + proc.cost, 0);
  const completedProcedures = treatment.procedures.filter(proc => proc.status === 'completed').length;
  const progress = (completedProcedures / treatment.procedures.length) * 100;

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Treatment Report</h3>
            <p className="text-sm text-gray-500">Treatment ID: {treatment.id}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 size={16} />}
              onClick={onShare}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
              onClick={onDownload}
            >
              Download
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Printer size={16} />}
              onClick={onPrint}
            >
              Print
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">Progress</span>
            </div>
            <div className="flex items-center">
              <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-2 bg-[#0073b9] rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <DollarSign size={16} className="mr-2" />
              <span className="text-sm">Total Cost</span>
            </div>
            <p className="text-lg font-medium">${totalCost}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <CheckCircle size={16} className="mr-2" />
              <span className="text-sm">Procedures</span>
            </div>
            <p className="text-lg font-medium">{completedProcedures}/{treatment.procedures.length}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Procedures</h4>
          <div className="space-y-3">
            {treatment.procedures.map((procedure, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-800">{procedure.name}</h5>
                    <p className="text-sm text-gray-500">
                      Cost: ${procedure.cost} • Coverage: {procedure.insuranceCoverage}%
                    </p>
                  </div>
                  <Badge
                    variant={procedure.status === 'completed' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {procedure.status}
                  </Badge>
                </div>
                {procedure.notes && procedure.notes.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {procedure.notes.map((note, noteIndex) => (
                      <p key={noteIndex} className="text-sm text-gray-600">
                        • {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {treatment.notes && treatment.notes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Treatment Notes</h4>
            <div className="space-y-3">
              {treatment.notes.map((note, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Badge
                          variant={
                            note.type === 'progress' ? 'success' :
                            note.type === 'observation' ? 'info' : 'warning'
                          }
                          size="sm"
                          className="mr-2"
                        >
                          {note.type}
                        </Badge>
                        <span className="text-sm text-gray-500">{note.date}</span>
                      </div>
                      <p className="mt-2 text-gray-700">{note.content}</p>
                      <p className="mt-1 text-sm text-gray-500">By {note.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
      </div>
    </Card>
  );
};