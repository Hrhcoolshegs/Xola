import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, ArrowRight, AlertCircle, Trash2, Loader, Pill, Clipboard, Search, Eye, Edit, Check, User, FileText } from 'lucide-react';
import { patients, clinicalData } from '../utils/sampleData';
import { ImageUploader } from '../components/clinical/ImageUploader';

const Clinical = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    simulateUploadProgress();
  };

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

  const nextStep = () => {
    if (step === 1 && uploadedFiles.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedPatient) {
      setStep(3);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const randomDiagnostic = clinicalData.diagnostics[
          Math.floor(Math.random() * clinicalData.diagnostics.length)
        ];
        setAnalysisResults(randomDiagnostic);
      }, 3000);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
      setIsProcessing(false);
      setAnalysisResults(null);
    }
  };

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

  const handleInitiateTreatment = () => {
    if (!analysisResults || !selectedPatient) return;
    
    navigate('/treatment/new', {
      state: {
        diagnosticData: analysisResults,
        patientId: selectedPatient,
        recommendations: analysisResults.recommendations
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('clinical.title')}</h1>
          <p className="text-gray-500">{t('clinical.diagnostics')}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row">
            <div className={`w-full sm:w-1/3 p-4 text-center ${step === 1 ? 'bg-[#0073b9] text-white' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                  step === 1 ? 'bg-white text-[#0073b9]' : 'bg-gray-300 text-gray-700'
                } mr-2`}>
                  1
                </div>
                <span className="font-medium">{t('clinical.step1')}</span>
              </div>
            </div>
            <div className={`w-full sm:w-1/3 p-4 text-center ${step === 2 ? 'bg-[#0073b9] text-white' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                  step === 2 ? 'bg-white text-[#0073b9]' : 'bg-gray-300 text-gray-700'
                } mr-2`}>
                  2
                </div>
                <span className="font-medium">{t('clinical.step2')}</span>
              </div>
            </div>
            <div className={`w-full sm:w-1/3 p-4 text-center ${step === 3 ? 'bg-[#0073b9] text-white' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                  step === 3 ? 'bg-white text-[#0073b9]' : 'bg-gray-300 text-gray-700'
                } mr-2`}>
                  3
                </div>
                <span className="font-medium">{t('clinical.step3')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div className="flex flex-col items-center">
              <ImageUploader
                onImagesChange={handleFileUpload}
                initialImages={uploadedFiles}
              />
              
              <div className="w-full max-w-2xl">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Historical Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {clinicalData.diagnostics[0].images.map((image, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={`Historical ${image.type}`} 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-xs text-gray-500">{image.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end w-full max-w-2xl mt-6">
                <Button 
                  variant="primary" 
                  disabled={uploadedFiles.length === 0 || uploadProgress < 100}
                  onClick={nextStep}
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card title="Select Patient">
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          placeholder="Search patients..."
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                        />
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto space-y-2">
                        {patients.map(patient => (
                          <div 
                            key={patient.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedPatient === patient.id 
                                ? 'border-[#0073b9] bg-[#0073b9]/5' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedPatient(patient.id)}
                          >
                            <div className="flex items-center">
                              <div className="mr-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                  <User size={20} />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{patient.name}</h4>
                                <p className="text-sm text-gray-500">{patient.id}</p>
                              </div>
                              {selectedPatient === patient.id && (
                                <div className="text-[#0073b9]">
                                  <Check size={20} />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card title="Patient Data Collection">
                    {selectedPatient ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Symptoms & Complaints</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chief Complaint
                              </label>
                              <textarea
                                rows={3}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                                placeholder="Describe the main issue..."
                              ></textarea>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pain Level (0-10)
                              </label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="range"
                                  min="0"
                                  max="10"
                                  defaultValue="5"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-sm font-medium">5</span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Symptom Duration
                              </label>
                              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent">
                                <option value="">Select duration</option>
                                <option value="recent">Today</option>
                                <option value="days">Few days</option>
                                <option value="week">About a week</option>
                                <option value="month">About a month</option>
                                <option value="months">Several months</option>
                                <option value="chronic">Chronic (years)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Medications
                              </label>
                              <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                                placeholder="List all current medications..."
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Allergies
                              </label>
                              <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                                placeholder="List any allergies..."
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lifestyle Factors
                              </label>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <input type="checkbox" id="smoking" className="mr-2" />
                                  <label htmlFor="smoking" className="text-sm">Smoking/Tobacco use</label>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" id="alcohol" className="mr-2" />
                                  <label htmlFor="alcohol" className="text-sm">Regular alcohol consumption</label>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" id="diet" className="mr-2" />
                                  <label htmlFor="diet" className="text-sm">High sugar diet</label>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" id="grinding" className="mr-2" />
                                  <label htmlFor="grinding" className="text-sm">Teeth grinding/clenching</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <AlertCircle size={48} className="text-yellow-500 mb-4" />
                        <h3 className="text-xl font-medium text-gray-800 mb-2">Please Select a Patient</h3>
                        <p className="text-gray-500">Select a patient from the list to continue.</p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  icon={<ArrowLeft size={16} />}
                >
                  {t('common.previous')}
                </Button>
                <Button 
                  variant="primary" 
                  disabled={!selectedPatient}
                  onClick={nextStep}
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div>
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader size={64} className="text-[#0073b9] mb-6 animate-spin" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Analysis in Progress</h2>
                  <p className="text-gray-500 mb-4 text-center max-w-md">
                    Our AI is analyzing the uploaded images and patient data to generate a comprehensive diagnosis.
                  </p>
                  <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-[#0073b9] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">This may take a few moments...</p>
                </div>
              ) : analysisResults ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <Card title="Patient Information">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                <User size={24} />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {patients.find(p => p.id === selectedPatient)?.name || 'Patient'}
                              </h3>
                              <p className="text-sm text-gray-500">{selectedPatient}</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {uploadedFiles.map((file, index) => (
                                <div key={index} className="border rounded-lg p-1">
                                  <div className="aspect-square flex items-center justify-center bg-gray-50">
                                    <Eye size={20} className="text-gray-400" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis Date</h4>
                            <p className="text-gray-800">{new Date().toLocaleDateString()}</p>
                          </div>
                          
                          <Button variant="outline" size="sm" fullWidth icon={<FileText size={16} />}>
                            Export Report
                          </Button>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Card title="AI Diagnosis Results">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Detected Conditions</h3>
                            <div className="space-y-4">
                              {analysisResults.findings.map((finding: any, index: number) => (
                                <div key={index}>
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-800">{finding.condition}</span>
                                    <Badge
                                      variant={
                                        finding.probability > 80 ? 'danger' :
                                        finding.probability > 50 ? 'warning' : 'info'
                                      }
                                    >
                                      {finding.probability}% Probability
                                    </Badge>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        finding.probability > 80 ? 'bg-red-500' :
                                        finding.probability > 50 ? 'bg-yellow-500' : 'bg-blue-500'
                                      }`} 
                                      style={{ width: `${finding.probability}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">Location: {finding.location}</p>
                                  <p className="text-sm text-gray-600 mt-2">
                                    {finding.condition.includes('Caries') ? 
                                      'Dental caries, also known as tooth decay, are caused by acids produced by bacteria in dental plaque. The analysis shows areas of demineralization in the enamel.' :
                                      finding.condition.includes('Gingivitis') ?
                                      'Gingivitis is characterized by inflammation of the gums. The analysis shows redness and swelling of the gingival tissue.' :
                                      finding.condition.includes('Periodontitis') ?
                                      'Periodontitis is a serious gum infection that damages the soft tissue and can destroy the bone that supports your teeth. The analysis shows bone loss and deep periodontal pockets.' :
                                      'The condition affects the identified area and may require treatment. The AI has identified characteristic patterns associated with this condition.'}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Recommended Treatments</h3>
                            <div className="space-y-3">
                              {analysisResults.recommendations.map((recommendation: any, index: number) => (
                                <div key={index} className="p-4 border rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium text-gray-800">{recommendation.treatment}</h4>
                                      <div className="flex items-center mt-1">
                                        <Badge
                                          variant={
                                            recommendation.urgency === 'High' ? 'danger' :
                                            recommendation.urgency === 'Medium' ? 'warning' : 'info'
                                          }
                                          size="sm"
                                          className="mr-2"
                                        >
                                          {recommendation.urgency} Urgency
                                        </Badge>
                                        <span className="text-sm text-gray-500">
                                          Estimated Cost: ${recommendation.cost}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-medium text-gray-700">Insurance Coverage</p>
                                      <p className="text-lg font-semibold text-[#0073b9]">{recommendation.insuranceCoverage}%</p>
                                      <p className="text-xs text-gray-500">Est. out-of-pocket: ${(recommendation.cost * (1 - recommendation.insuranceCoverage / 100)).toFixed(2)}</p>
                                    </div>
                                  </div>
                                  
                                  {recommendation.medication !== 'None' && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                      <h5 className="text-sm font-medium text-gray-700 flex items-center">
                                        <Pill size={16} className="mr-1" />
                                        Medication Recommendation
                                      </h5>
                                      <p className="text-sm text-gray-600 mt-1">{recommendation.medication}</p>
                                    </div>
                                  )}
                                  
                                  <div className="mt-3 flex justify-end space-x-2">
                                    <Button variant="outline" size="sm">Details</Button>
                                    <Button variant="primary" size="sm">Schedule</Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      icon={<ArrowLeft size={16} />}
                    >
                      {t('common.previous')}
                    </Button>
                    <div className="space-x-3">
                      <Button 
                        variant="outline"
                        icon={<FileText size={16} />}
                        onClick={handleGenerateReport}
                      >
                        Generate Report
                      </Button>
                      <Button 
                        variant="primary"
                        icon={<Clipboard size={16} />}
                        onClick={handleInitiateTreatment}
                      >
                        Initiate Treatment Plan
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24">
                  <AlertCircle size={64} className="text-red-500 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Error</h2>
                  <p className="text-gray-500 mb-6">There was an error processing the analysis. Please try again.</p>
                  <Button variant="primary" onClick={() => setStep(1)}>
                    Start Over
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clinical;