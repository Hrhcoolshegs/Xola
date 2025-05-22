import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Clinical() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Clinical Analysis</h1>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Radiograph
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border rounded p-2 w-full"
          />
        </div>

        {selectedImage && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Image Preview</h2>
            <img
              src={selectedImage}
              alt="Uploaded radiograph"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        {diagnosisResult && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Radiograph Diagnosis Result</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-800">{diagnosisResult}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clinical;