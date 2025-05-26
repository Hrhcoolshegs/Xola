import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  Brain,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Clock,
  RefreshCw,
  Loader,
  Pill,
  Plus,
  X,
  Check,
  User,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { patients, clinicalData } from '../utils/sampleData';
import { ImageUploader } from '../components/clinical/ImageUploader';

// Predefined lists
const commonSymptoms = [
  'Toothache / Dental pain',
  'Swollen or bleeding gums',
  'Tooth sensitivity',
  'Bad breath',
  'Dry mouth',
  'Jaw pain',
  'Loose teeth',
  'Mouth sores',
  'Swelling in face/jaw',
  'Cracked/chipped teeth',
  'Discolored teeth',
  'Gum recession',
  'Abscess',
  'Difficulty chewing',
  'Post-procedure pain'
];

const commonMedications = {
  'Antibiotics': [
    'Amoxicillin',
    'Clindamycin',
    'Metronidazole',
    'Erythromycin',
    'Azithromycin'
  ],
  'Pain Relievers': [
    'Ibuprofen',
    'Acetaminophen',
    'Aspirin',
    'Naproxen',
    'Hydrocodone'
  ],
  'Local Anesthetics': [
    'Lidocaine',
    'Articaine',
    'Mepivacaine'
  ],
  'Other': [
    'Chlorhexidine',
    'Fluoride'
  ]
};

const commonAllergies = [
  'Penicillin',
  'Latex',
  'Local anesthetics',
  'Aspirin/NSAIDs',
  'Metals (e.g., nickel)',
  'Acrylic/Resin materials',
  'Eugenol',
  'Iodine',
  'Sulfa drugs'
];

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
  const [customSymptom, setCustomSymptom] = useState('');
  const [customMedication, setCustomMedication] = useState('');
  const [customAllergy, setCustomAllergy] = useState('');
  const [showCustomSymptom, setShowCustomSymptom] = useState(false);
  const [showCustomMedication, setShowCustomMedication] = useState(false);
  const [showCustomAllergy, setShowCustomAllergy] = useState(false);

  const [painLevel, setPainLevel] = useState<number>(5);
  const [duration, setDuration] = useState<string>('');
  const [selectedLifestyleFactors, setSelectedLifestyleFactors] = useState<Set<string>>(new Set());

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

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim()) {
      setSymptoms([...symptoms, customSymptom.trim()]);
      setCustomSymptom('');
      setShowCustomSymptom(false);
    }
  };

  const handleAddCustomMedication = () => {
    if (customMedication.trim()) {
      setMedications([...medications, customMedication.trim()]);
      setCustomMedication('');
      setShowCustomMedication(false);
    }
  };

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim()) {
      setAllergies([...allergies, customAllergy.trim()]);
      setCustomAllergy('');
      setShowCustomAllergy(false);
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const toggleMedication = (medication: string) => {
    setMedications(prev =>
      prev.includes(medication)
        ? prev.filter(m => m !== medication)
        : [...prev, medication]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev =>
      prev.includes(allergy)
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
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
                  onClick={nextStep}
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search patients..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                      />
                    </div>

                    <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-2">
                      {patients.filter(patient => 
                        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map(patient => (
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
                      <div className="border-b pb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Symptoms & Complaints</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Common Symptoms
                            </label>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {commonSymptoms.map((symptom) => (
                                <button
                                  key={symptom}
                                  onClick={() => toggleSymptom(symptom)}
                                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                    symptoms.includes(symptom)
                                      ? 'bg-[#0073b9] text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {symptom}
                                </button>
                              ))}
                            </div>
                            {showCustomSymptom ? (
                              <div className="flex gap-2 mt-2">
                                <input
                                  type="text"
                                  value={customSymptom}
                                  onChange={(e) => setCustomSymptom(e.target.value)}
                                  placeholder="Enter custom symptom"
                                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                                />
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={handleAddCustomSymptom}
                                >
                                  Add
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowCustomSymptom(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                icon={<Plus size={16} />}
                                onClick={() => setShowCustomSymptom(true)}
                              >
                                Add Custom Symptom
                              </Button>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Pain Level
                            </label>
                            <div className="flex items-center space-x-4">
                              <input
                                type="range"
                                min="0"
                                max="10"
                                value={painLevel}
                                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0073b9]"
                              />
                              <span className="w-12 text-center font-medium text-gray-700">
                                {painLevel}/10
                              </span>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>No Pain</span>
                              <span>Severe Pain</span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Duration
                            </label>
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                            >
                              <option value="">Select duration</option>
                              <option value="today">Today</option>
                              <option value="few_days">Few days</option>
                              <option value="week">About a week</option>
                              <option value="month">About a month</option>
                              <option value="several_months">Several months</option>
                              <option value="chronic">Chronic (years)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="border-b pb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Medications
                            </label>
                            {Object.entries(commonMedications).map(([category, meds]) => (
                              <div key={category} className="mb-4">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {meds.map((medication) => (
                                    <button
                                      key={medication}
                                      onClick={() => toggleMedication(medication)}
                                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                        medications.includes(medication)
                                          ? 'bg-[#0073b9] text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {medication}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {showCustomMedication ? (
                              <div className="flex gap-2 mt-2">
                                <input
                                  type="text"
                                  value={customMedication}
                                  onChange={(e) => setCustomMedication(e.target.value)}
                                  placeholder="Enter custom medication"
                                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                                />
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={handleAddCustomMedication}
                                >
                                  Add
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowCustomMedication(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                icon={<Plus size={16} />}
                                onClick={() => setShowCustomMedication(true)}
                              >
                                Add Custom Medication
                              </Button>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Allergies
                            </label>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {commonAllergies.map((allergy) => (
                                <button
                                  key={allergy}
                                  onClick={() => toggleAllergy(allergy)}
                                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                    allergies.includes(allergy)
                                      ? 'bg-[#0073b9] text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {allergy}
                                </button>
                              ))}
                            </div>
                            {showCustomAllergy ? (
                              <div className="flex gap-2 mt-2">
                                <input
                                  type="text"
                                  value={customAllergy}
                                  onChange={(e) => setCustomAllergy(e.target.value)}
                                  placeholder="Enter custom allergy"
                                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                                />
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={handleAddCustomAllergy}
                                >
                                  Add
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowCustomAllergy(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                icon={<Plus size={16} />}
                                onClick={() => setShowCustomAllergy(true)}
                              >
                                Add Custom Allergy
                              </Button>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Lifestyle Factors
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {[
                                'Smoking/Tobacco use',
                                'Regular alcohol consumption',
                                'High sugar diet',
                                'Teeth grinding/clenching',
                                'Poor oral hygiene',
                                'Regular dental checkups'
                              ].map((factor) => (
                                <div
                                  key={factor}
                                  onClick={() => {
                                    const newFactors = new Set(selectedLifestyleFactors);
                                    if (newFactors.has(factor)) {
                                      newFactors.delete(factor);
                                    } else {
                                      newFactors.add(factor);
                                    }
                                    setSelectedLifestyleFactors(newFactors);
                                  }}
                                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                    selectedLifestyleFactors.has(factor)
                                      ? 'border-[#0073b9] bg-blue-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className={`w-4 h-4 rounded border ${
                                      selectedLifestyleFactors.has(factor)
                                        ? 'bg-[#0073b9] border-[#0073b9]'
                                        : 'border-gray-300'
                                    } mr-2 flex items-center justify-center`}>
                                      {selectedLifestyleFactors.has(factor) && (
                                        <Check size={12} className="text-white" />
                                      )}
                                    </div>
                                    <span className="text-sm">{factor}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={prevStep}
                          icon={<ArrowLeft size={16} />}
                        >
                          Back
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={nextStep}
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
            <div className="space-y-6">
              {isProcessing ? (
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
              ) : !analysisResults ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <AlertTriangle size={64} className="text-red-500 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Error</h2>
                  <p className="text-gray-500 mb-6">There was an error processing the analysis. Please try again.</p>
                  <Button variant="primary" onClick={() => setStep(1)}>
                    Start Over
                  </Button>
                </div>
              ) : (
                <>
                  {/* Uploaded Images Display */}
                  <Card title="Uploaded Images">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Uploaded image ${index + 1}`}
                              className="w-full h-full object-contain"
                              onLoad={(e) => {
                                // Clean up object URL after image loads
                                const target = e.target as HTMLImageElement;
                                URL.revokeObjectURL(target.src);
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center rounded-lg">
                            <Button
                              variant="primary"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              icon={<Eye size={16} />}
                            >
                              View
                            </Button>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Radiograph Diagnosis Result */}
                  <Card>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center space-x-2">
                            <Brain size={24} className="text-[#0073b9]" />
                            <h3 className="text-lg font-medium text-gray-800">Radiograph Diagnosis Result</h3>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {analysisResults.findings.map((finding: any, index: number) => (
                            <div key={index} className="p-4 bg-white border rounded-lg hover:border-[#0073b9] transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-800">{finding.condition}</h4>
                                  <p className="text-sm text-gray-500">Location: {finding.location}</p>
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
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      finding.probability > 80 ? 'bg-red-500' :
                                      finding.probability > 50 ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`}
                                    style={{ width: `${finding.probability}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Treatment Recommendations */}
                  <Card title="Treatment Recommendations">
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {analysisResults.recommendations.map((recommendation: any, index: number) => (
                          <div key={index} className="p-4 bg-white border rounded-lg hover:border-[#0073b9] transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">{recommendation.treatment}</h4>
                                <div className="flex items-center mt-2">
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
                                    Coverage: {recommendation.insuranceCoverage}%
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold text-[#0073b9]">
                                  ${recommendation.cost}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Est. out-of-pocket: ${(recommendation.cost * (1 - recommendation.insuranceCoverage / 100)).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            {recommendation.medication !== 'None' && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center">
                                  <Pill size={16} className="text-[#0073b9] mr-2" />
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-700">
                                      Recommended Medication
                                    </h5>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {recommendation.medication}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button
                          variant="outline"
                          icon={<Plus size={16} />}
                          onClick={() => navigate('/treatment/new', {
                            state: {
                              patientId: selectedPatient,
                              isManual: true
                            }
                          })}
                        >
                          Create Treatment Plan
                        </Button>
                        <Button
                          variant="primary"
                          icon={<ArrowRight size={16} />}
                          onClick={() => navigate('/treatment/new', {
                            state: {
                              diagnosticData: analysisResults,
                              patientId: selectedPatient,
                              recommendations: analysisResults.recommendations
                            }
                          })}
                        >
                          Proceed to Treatment
                        </Button>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clinical;