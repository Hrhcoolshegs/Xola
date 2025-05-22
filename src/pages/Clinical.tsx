import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Plus, Search, Filter, Eye, Edit, MoreHorizontal, Brain,
  ArrowLeft, ArrowRight, AlertTriangle, Clock, RefreshCw,
  Loader, X, Check, User, FileText
} from 'lucide-react';
import { ImageUploader } from '../components/clinical/ImageUploader';
import { dentalSymptoms, dentalAllergies, flattenedMedications } from '../utils/clinicalData';
import { patients } from '../utils/sampleData';

const Clinical = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for symptoms, medications, and allergies
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  // Input states
  const [symptomInput, setSymptomInput] = useState('');
  const [medicationInput, setMedicationInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');

  // Custom items states
  const [customSymptoms, setCustomSymptoms] = useState<string[]>([]);
  const [customMedications, setCustomMedications] = useState<string[]>([]);
  const [customAllergies, setCustomAllergies] = useState<string[]>([]);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (
    item: string,
    items: string[],
    setItems: (items: string[]) => void,
    customItems: string[],
    setCustomItems: (items: string[]) => void,
    predefinedItems: string[],
    inputSetter: (value: string) => void
  ) => {
    if (!item.trim()) return;

    if (!items.includes(item)) {
      setItems([...items, item]);
      
      // If it's not in predefined items, add to custom items
      if (!predefinedItems.includes(item) && !customItems.includes(item)) {
        setCustomItems([...customItems, item]);
      }
    }
    
    inputSetter('');
  };

  const handleRemoveItem = (
    itemToRemove: string,
    items: string[],
    setItems: (items: string[]) => void,
    customItems: string[],
    setCustomItems: (items: string[]) => void
  ) => {
    setItems(items.filter(item => item !== itemToRemove));
    
    // If it's a custom item, remove from custom items too
    if (customItems.includes(itemToRemove)) {
      setCustomItems(customItems.filter(item => item !== itemToRemove));
    }
  };

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

  const renderSelectionSection = () => (
    <div className="space-y-6">
      {/* Symptoms Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Symptoms
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            list="symptoms-list"
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            placeholder="Select or enter symptoms..."
          />
          <Button
            variant="outline"
            onClick={() => handleAddItem(
              symptomInput,
              symptoms,
              setSymptoms,
              customSymptoms,
              setCustomSymptoms,
              dentalSymptoms,
              setSymptomInput
            )}
          >
            Add
          </Button>
        </div>
        <datalist id="symptoms-list">
          {[...dentalSymptoms, ...customSymptoms].map((symptom) => (
            <option key={symptom} value={symptom} />
          ))}
        </datalist>
        <div className="flex flex-wrap gap-2 mt-2">
          {symptoms.map((symptom) => (
            <Badge
              key={symptom}
              variant="primary"
              className="flex items-center gap-1"
            >
              {symptom}
              <button
                onClick={() => handleRemoveItem(
                  symptom,
                  symptoms,
                  setSymptoms,
                  customSymptoms,
                  setCustomSymptoms
                )}
                className="ml-1 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Medications Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Medications
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            list="medications-list"
            value={medicationInput}
            onChange={(e) => setMedicationInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            placeholder="Select or enter medications..."
          />
          <Button
            variant="outline"
            onClick={() => handleAddItem(
              medicationInput,
              medications,
              setMedications,
              customMedications,
              setCustomMedications,
              flattenedMedications,
              setMedicationInput
            )}
          >
            Add
          </Button>
        </div>
        <datalist id="medications-list">
          {[...flattenedMedications, ...customMedications].map((medication) => (
            <option key={medication} value={medication} />
          ))}
        </datalist>
        <div className="flex flex-wrap gap-2 mt-2">
          {medications.map((medication) => (
            <Badge
              key={medication}
              variant="primary"
              className="flex items-center gap-1"
            >
              {medication}
              <button
                onClick={() => handleRemoveItem(
                  medication,
                  medications,
                  setMedications,
                  customMedications,
                  setCustomMedications
                )}
                className="ml-1 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Allergies Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allergies
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            list="allergies-list"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            placeholder="Select or enter allergies..."
          />
          <Button
            variant="outline"
            onClick={() => handleAddItem(
              allergyInput,
              allergies,
              setAllergies,
              customAllergies,
              setCustomAllergies,
              dentalAllergies,
              setAllergyInput
            )}
          >
            Add
          </Button>
        </div>
        <datalist id="allergies-list">
          {[...dentalAllergies, ...customAllergies].map((allergy) => (
            <option key={allergy} value={allergy} />
          ))}
        </datalist>
        <div className="flex flex-wrap gap-2 mt-2">
          {allergies.map((allergy) => (
            <Badge
              key={allergy}
              variant="primary"
              className="flex items-center gap-1"
            >
              {allergy}
              <button
                onClick={() => handleRemoveItem(
                  allergy,
                  allergies,
                  setAllergies,
                  customAllergies,
                  setCustomAllergies
                )}
                className="ml-1 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('clinical.title')}</h1>
          <p className="text-gray-500">{t('clinical.diagnostics')}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`relative w-full sm:w-1/3 p-6 ${
                  step === stepNum
                    ? 'bg-[#0073b9] text-white'
                    : step > stepNum
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                      step === stepNum
                        ? 'bg-white text-[#0073b9]'
                        : step > stepNum
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    } mr-3`}
                  >
                    {step > stepNum ? <Check size={16} /> : stepNum}
                  </div>
                  <div>
                    <p className="font-medium">
                      {stepNum === 1
                        ? 'Image Upload & Analysis'
                        : stepNum === 2
                        ? 'Patient Data Collection'
                        : 'Radiograph Diagnosis Result'}
                    </p>
                    <p className={`text-sm mt-1 ${step === stepNum ? 'text-blue-100' : 'text-gray-500'}`}>
                      {stepNum === 1
                        ? 'Upload and analyze dental images'
                        : stepNum === 2
                        ? 'Select patient and enter symptoms'
                        : 'Review radiograph analysis'}
                    </p>
                  </div>
                </div>
                {stepNum < 3 && (
                  <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 rotate-45 border-t border-r border-gray-200 bg-inherit z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload Dental Images</h2>
                <p className="text-gray-600">Upload clear, high-quality images for accurate analysis</p>
              </div>

              <ImageUploader
                onImagesChange={handleFileUpload}
                initialImages={uploadedFiles}
              />
              
              <div className="flex justify-end mt-8">
                <Button 
                  variant="primary" 
                  disabled={uploadedFiles.length === 0 || uploadProgress < 100}
                  onClick={() => setStep(2)}
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Continue to Patient Selection
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-2">
                      {filteredPatients.map(patient => (
                        <div 
                          key={patient.id}
                          onClick={() => setSelectedPatient(patient.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedPatient === patient.id 
                              ? 'border-[#0073b9] bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="mr-3">
                              <div className="h-12 w-12 rounded-full bg-[#0073b9] flex items-center justify-center text-white">
                                <User size={24} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{patient.name}</h4>
                              <p className="text-sm text-gray-500">ID: {patient.id}</p>
                              <div className="flex items-center mt-1">
                                <Badge
                                  variant={patient.status === 'active' ? 'success' : 'danger'}
                                  size="sm"
                                >
                                  {patient.status}
                                </Badge>
                                <span className="text-xs text-gray-500 ml-2">
                                  Last visit: {patient.lastVisit || 'Never'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  {selectedPatient ? (
                    <div className="space-y-6">
                      {renderSelectionSection()}
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setStep(1)}
                          icon={<ArrowLeft size={16} />}
                        >
                          Back
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={() => setStep(3)}
                          icon={<ArrowRight size={16} />}
                          iconPosition="right"
                        >
                          Start Analysis
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <User size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Select a Patient</h3>
                      <p className="text-gray-500 text-center max-w-md">
                        Choose a patient from the list to continue with the diagnosis process
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-[#0073b9] rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loader size={32} className="text-[#0073b9] animate-pulse" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Analysis in Progress</h2>
              <p className="text-gray-500 mb-8 text-center max-w-md">
                Our system is analyzing the uploaded images and patient data to generate a comprehensive diagnosis
              </p>
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0073b9] animate-[progress_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clinical;