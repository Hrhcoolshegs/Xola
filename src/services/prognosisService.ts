import { clinicalData } from '../utils/sampleData';

interface PrognosisResult {
  successRate: number;
  factors: {
    positive: string[];
    negative: string[];
  };
  timeline: {
    phase: string;
    duration: string;
    milestones: string[];
  }[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    action: string;
    rationale: string;
  }[];
}

export const calculatePrognosis = (
  condition: string,
  patientAge: number,
  hasMedicalConditions: boolean,
  compliance: number
): PrognosisResult => {
  // Base success rate for common dental procedures
  let baseRate = 0.85;

  // Adjust for patient age
  if (patientAge > 60) baseRate *= 0.9;
  if (patientAge < 18) baseRate *= 1.1;

  // Adjust for medical conditions
  if (hasMedicalConditions) baseRate *= 0.85;

  // Adjust for expected compliance
  baseRate *= (0.5 + compliance * 0.5);

  // Ensure rate stays within bounds
  const successRate = Math.min(Math.max(baseRate, 0), 1);

  return {
    successRate: Math.round(successRate * 100),
    factors: {
      positive: [
        'Early detection and intervention',
        'Modern treatment techniques',
        'Regular follow-up schedule'
      ],
      negative: [
        ...(hasMedicalConditions ? ['Existing medical conditions'] : []),
        ...(patientAge > 60 ? ['Age-related healing factors'] : []),
        ...(compliance < 0.8 ? ['Potential compliance challenges'] : [])
      ]
    },
    timeline: [
      {
        phase: 'Initial Treatment',
        duration: '1-2 weeks',
        milestones: [
          'Complete initial procedure',
          'Post-treatment evaluation',
          'Adjust medication if needed'
        ]
      },
      {
        phase: 'Recovery',
        duration: '2-4 weeks',
        milestones: [
          'Monitor healing progress',
          'Follow-up appointments',
          'Assess treatment effectiveness'
        ]
      },
      {
        phase: 'Maintenance',
        duration: 'Ongoing',
        milestones: [
          'Regular check-ups',
          'Preventive care',
          'Long-term monitoring'
        ]
      }
    ],
    recommendations: [
      {
        priority: 'high',
        action: 'Maintain strict oral hygiene routine',
        rationale: 'Critical for treatment success and prevention of complications'
      },
      {
        priority: 'medium',
        action: 'Regular follow-up appointments',
        rationale: 'Enables early detection of potential issues'
      },
      {
        priority: 'low',
        action: 'Dietary modifications',
        rationale: 'Supports overall treatment effectiveness'
      }
    ]
  };
};

export const getAlternativeTreatments = (condition: string) => {
  return clinicalData.treatments
    .filter(treatment => treatment.category === condition)
    .map(treatment => ({
      name: treatment.name,
      description: treatment.description,
      pros: ['High success rate', 'Minimally invasive', 'Quick recovery'],
      cons: ['Higher cost', 'Multiple visits required', 'Temporary discomfort'],
      cost: treatment.averageCost,
      insuranceCoverage: treatment.insuranceCoverage,
      duration: treatment.duration,
      recoveryTime: treatment.recoveryTime
    }));
};