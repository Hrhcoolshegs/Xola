import { TreatmentPlan } from '../types/treatment';

export interface PrognosisInput {
  plan: TreatmentPlan;
  patientFactors: {
    age: number;
    healthScore: number;
    conditions?: string[];
    medications?: string[];
  };
}

export interface PrognosisOutput {
  successRate: number;
  recommendations: string[];
  fullJourney: string;
  guidelines: {
    source: 'ADA' | 'Cochrane' | 'NICE';
    reference: string;
    recommendation: string;
  }[];
  risks: {
    level: 'low' | 'medium' | 'high';
    description: string;
  }[];
}

export const prognosisService = {
  getPrognosis: async (input: PrognosisInput): Promise<PrognosisOutput> => {
    // Simulate API call to AI backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          successRate: 85,
          recommendations: [
            "Schedule initial consultation within 2 weeks",
            "Complete blood work before procedure",
            "Begin prescribed pre-treatment medications",
            "Maintain strict oral hygiene routine"
          ],
          fullJourney: "The treatment will begin with a comprehensive examination followed by...",
          guidelines: [
            {
              source: 'ADA',
              reference: 'ADA.2023.15.3',
              recommendation: "Follow standard protocol for antibiotic prophylaxis"
            },
            {
              source: 'NICE',
              reference: 'NICE.CG64',
              recommendation: "Regular monitoring of periodontal health recommended"
            }
          ],
          risks: [
            {
              level: 'low',
              description: "Temporary sensitivity to hot and cold"
            },
            {
              level: 'medium',
              description: "Potential need for additional procedures"
            }
          ]
        });
      }, 1000);
    });
  }
};