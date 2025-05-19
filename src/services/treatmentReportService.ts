interface TreatmentReport {
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
}

export const generateTreatmentReport = (treatmentId: string): TreatmentReport => {
  // This would normally fetch data from an API
  return {
    id: treatmentId,
    patientId: 'P001',
    startDate: '2023-09-15',
    procedures: [
      {
        name: 'Initial Consultation',
        status: 'completed',
        notes: ['Patient reported mild discomfort'],
        cost: 150,
        insuranceCoverage: 80
      },
      {
        name: 'Deep Cleaning',
        status: 'completed',
        notes: ['Procedure completed successfully', 'Follow-up scheduled'],
        cost: 300,
        insuranceCoverage: 70
      },
      {
        name: 'Root Canal',
        status: 'pending',
        cost: 800,
        insuranceCoverage: 60
      }
    ],
    notes: [
      {
        date: '2023-09-15',
        author: 'Dr. Sarah Chen',
        content: 'Initial examination completed. Treatment plan discussed with patient.',
        type: 'progress'
      },
      {
        date: '2023-09-22',
        author: 'Dr. Sarah Chen',
        content: 'Deep cleaning performed. Patient tolerated procedure well.',
        type: 'observation'
      },
      {
        date: '2023-09-22',
        author: 'Dr. Sarah Chen',
        content: 'Recommend scheduling root canal within next 2 weeks.',
        type: 'recommendation'
      }
    ]
  };
};

export const cloneTreatmentPlan = (treatmentId: string): string => {
  // This would normally create a copy in the database
  return `CLONE-${treatmentId}`;
};

export const generatePDF = async (report: TreatmentReport): Promise<Blob> => {
  // This would normally generate a PDF using a library
  return new Blob(['PDF content'], { type: 'application/pdf' });
};

export const shareTreatmentPlan = async (
  treatmentId: string,
  recipientEmail: string
): Promise<boolean> => {
  // This would normally send the report via email or generate a sharing link
  console.log(`Sharing treatment ${treatmentId} with ${recipientEmail}`);
  return true;
};