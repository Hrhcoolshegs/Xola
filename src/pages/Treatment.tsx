import React from 'react';
import { useNavigate } from 'react-router-dom';

// Assuming these components exist based on the file structure
import { TreatmentList } from '../components/treatment/TreatmentList';
import { TreatmentReport } from '../components/treatment/TreatmentReport';
import { TreatmentTimeline } from '../components/treatment/TreatmentTimeline';
import { TreatmentStepDetails } from '../components/treatment/TreatmentStepDetails';
import { BeforeAfterGallery } from '../components/treatment/BeforeAfterGallery';
import { TreatmentVisualizer } from '../components/treatment/TreatmentVisualizer';
import { PrognosisCard } from '../components/treatment/PrognosisCard';
import { NoteTemplate } from '../components/treatment/NoteTemplate';

function Treatment() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <span className="mr-2">←</span> Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TreatmentList />
          <TreatmentTimeline />
          <TreatmentStepDetails />
          <BeforeAfterGallery />
        </div>

        <div className="space-y-6">
          <TreatmentReport />
          <TreatmentVisualizer />
          <PrognosisCard />
          <NoteTemplate />
        </div>
      </div>
    </div>
  );
}

export default Treatment;