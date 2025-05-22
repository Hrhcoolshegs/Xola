import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ImageUploader } from '../components/clinical/ImageUploader';
import { RadiographViewer } from '../components/clinical/RadiographViewer';
import { ArrowLeft, Bot, Upload } from 'lucide-react';

const Clinical = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [diagnosticData, setDiagnosticData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImagesChange = (files: File[]) => {
    setUploadedImages(files);
  };

  const handleAnalysis = async () => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setDiagnosticData({
        findings: [
          {
            condition: 'Dental Caries',
            probability: 86,
            location: 'Tooth #29',
            recommendations: [
              'Composite filling recommended',
              'Consider fluoride treatment'
            ]
          },
          {
            condition: 'Mild Gingivitis',
            probability: 67,
            location: 'Upper Right Quadrant',
            recommendations: [
              'Professional cleaning recommended',
              'Improve oral hygiene routine'
            ]
          }
        ],
        recommendations: [
          {
            treatment: 'Composite Filling',
            urgency: 'High',
            cost: 250,
            insuranceCoverage: 80,
            medication: 'None'
          },
          {
            treatment: 'Professional Cleaning',
            urgency: 'Medium',
            cost: 120,
            insuranceCoverage: 100,
            medication: 'None'
          }
        ]
      });
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const handleStartTreatment = () => {
    navigate('/treatment/new', {
      state: {
        diagnosticData,
        uploadedImages
      }
    });
  };

  const handleViewReport = () => {
    navigate('/report', {
      state: {
        diagnosticData,
        uploadedImages,
        patientData: {
          name: 'Emma Thompson',
          id: 'P001',
          dob: '1985-06-15',
          phone: '(416) 555-1234',
          insurance: 'Sun Life Financial'
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('clinical.title')}</h1>
            <p className="text-gray-500">{t('clinical.diagnostics')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">
                {t('clinical.step1')}
              </h2>
              {uploadedImages.length > 0 && (
                <Button
                  variant="primary"
                  onClick={handleAnalysis}
                  disabled={isProcessing}
                  icon={<Bot size={16} />}
                >
                  {isProcessing ? 'Processing...' : 'Analyze Images'}
                </Button>
              )}
            </div>

            <ImageUploader
              onImagesChange={handleImagesChange}
              initialImages={uploadedImages}
            />
          </div>
        </Card>

        {diagnosticData && (
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bot size={20} className="text-[#0073b9] mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">
                    Radiograph Diagnosis Result
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleViewReport}
                    icon={<Upload size={16} />}
                  >
                    View Report
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleStartTreatment}
                  >
                    Start Treatment
                  </Button>
                </div>
              </div>

              <RadiographViewer
                imageUrl={uploadedImages[0] ? URL.createObjectURL(uploadedImages[0]) : ''}
                findings={diagnosticData.findings}
                onAddTreatment={(finding) => {
                  handleStartTreatment();
                }}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Clinical;