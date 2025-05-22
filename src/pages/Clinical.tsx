import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ImageUploader from '../components/clinical/ImageUploader';
import RadiographViewer from '../components/clinical/RadiographViewer';
import ToothDiagram from '../components/clinical/ToothDiagram';

const Clinical = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  const handleImageUpload = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
    // Reset diagnosis when new image is uploaded
    setDiagnosisResult(null);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Radiograph</h2>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>

          {selectedImage && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Radiograph Preview</h2>
              <RadiographViewer imageUrl={selectedImage} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {diagnosisResult && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Radiograph Diagnosis Result</h2>
              <p className="text-gray-700">{diagnosisResult}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Tooth Diagram</h2>
            <ToothDiagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinical;