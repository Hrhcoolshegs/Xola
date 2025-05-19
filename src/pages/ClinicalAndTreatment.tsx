import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ToothDiagram } from '../components/ui/ToothDiagram';
import { ClinicalNotes } from '../components/ui/ClinicalNotes';
import { 
  Upload, Image, User, FileText, Check, ArrowRight, ArrowLeft, 
  AlertCircle, Trash2, Loader, Pill, AlertTriangle 
} from 'lucide-react';
import { patients, clinicalData } from '../utils/sampleData';

const ClinicalAndTreatment = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [showTreatmentBanner, setShowTreatmentBanner] = useState(false);
  const [treatmentSuggestion, setTreatmentSuggestion] = useState<string>('');

  // Handle tooth condition changes
  const handleToothConditionChange = (toothNumber: number, condition: any) => {
    if (condition) {
      setShowTreatmentBanner(true);
      setTreatmentSuggestion(`${condition.type.charAt(0).toUpperCase() + condition.type.slice(1)} recommended for tooth #${toothNumber}`);
    }
  };

  // Handle file upload and generate previews
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      
      // Generate preview URLs
      const urls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
      
      simulateUploadProgress();
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      
      // Generate preview URLs
      const urls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
      
      simulateUploadProgress();
    }
  };

  // Cleanup preview URLs when component unmounts or files change
  const cleanupPreviews = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Simulate upload progress
  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Remove a file from the upload list
  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Go to next step
  const nextStep = () => {
    if (step === 1 && uploadedFiles.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedPatient) {
      setStep(3);
      // Simulate AI processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // Get random diagnostic data for demo
        const randomDiagnostic = clinicalData.diagnostics[
          Math.floor(Math.random() * clinicalData.diagnostics.length)
        ];
        setAnalysisResults(randomDiagnostic);
      }, 3000);
    }
  };

  // Go to previous step
  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
      setIsProcessing(false);
      setAnalysisResults(null);
    }
  };

  // Handle generating full report
  const handleGenerateReport = () => {
    const patientData = patients.find(p => p.id === selectedPatient);
    navigate('/report', { 
      state: { 
        diagnosticData: analysisResults,
        patientData,
        uploadedImages: uploadedFiles
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('clinicalTreatment.title')}</h1>
          <p className="text-gray-500">{t('clinicalTreatment.subtitle')}</p>
        </div>
      </div>

      {showTreatmentBanner && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="text-blue-500 mr-2" size={20} />
            <p className="text-blue-700">{treatmentSuggestion}</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowTreatmentBanner(false)}
          >
            Add to Treatment Plan
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Tooth Chart">
          <ToothDiagram onConditionChange={handleToothConditionChange} />
        </Card>

        <Card title="Clinical Documentation">
          <ClinicalNotes
            initialValue={clinicalNotes}
            onChange={setClinicalNotes}
          />
        </Card>
      </div>

      <Card title="Image Analysis">
        <div className="flex flex-col items-center">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 w-full max-w-2xl text-center cursor-pointer hover:border-[#0073b9] transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/dicom"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-800">{t('clinical.upload')}</h3>
            <p className="text-gray-500 mb-4">{t('clinical.dragdrop')}</p>
            <p className="text-xs text-gray-400">Supported formats: JPG, PNG, DICOM</p>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="w-full max-w-2xl">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{t('clinical.preview')}</h3>
              
              {uploadProgress < 100 ? (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t('clinical.processing')}...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#0073b9] h-2 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="border rounded-lg p-2 h-full aspect-square flex items-center justify-center bg-gray-50">
                        {previewUrls[index] ? (
                          <img 
                            src={previewUrls[index]} 
                            alt={`Preview ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <Image size={48} className="text-gray-400" />
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="p-1 bg-red-500 text-white rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-center truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          size="lg"
          icon={<FileText size={16} />}
          onClick={() => setStep(1)}
        >
          Save Draft
        </Button>
        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRight size={16} />}
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ClinicalAndTreatment;