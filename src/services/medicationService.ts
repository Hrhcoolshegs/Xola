import { clinicalData } from '../utils/sampleData';

interface Medication {
  id: string;
  name: string;
  category: string;
  dosages: string[];
  commonUses: string[];
  contraindications: string[];
  sideEffects: string[];
}

interface TreatmentMedication extends Medication {
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export const getMedicationsByTreatment = (treatmentId: string): TreatmentMedication[] => {
  // This would normally fetch from an API
  return clinicalData.medications.map(med => ({
    ...med,
    dosage: med.dosages[0],
    frequency: '2 times daily',
    duration: '7 days',
    notes: 'Take with food'
  }));
};

export const getMedicationRecommendations = (
  condition: string,
  patientAllergies: string[]
): Medication[] => {
  return clinicalData.medications.filter(med => 
    !patientAllergies.some(allergy => 
      med.contraindications.includes(allergy)
    )
  );
};

export const validateMedicationCombination = (
  medications: string[]
): { safe: boolean; warnings: string[] } => {
  // This would normally check for drug interactions
  return {
    safe: true,
    warnings: []
  };
};

export const generatePrescription = (
  medication: TreatmentMedication,
  patientId: string
): string => {
  // This would normally generate a prescription document
  return `RX-${patientId}-${medication.id}`;
};