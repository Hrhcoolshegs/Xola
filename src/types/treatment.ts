export type TreatmentStatus = 'draft' | 'active' | 'completed' | 'cancelled';
export type TreatmentStepStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';
export type TreatmentType = 'filling' | 'extraction' | 'crown' | 'root_canal' | 'hygiene';

export interface TreatmentPlan {
  id: string;
  patientId: string;
  title: string;
  description?: string;
  status: TreatmentStatus;
  estimatedCost: number;
  insuranceCoverage: number;
  steps: TreatmentStep[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface TreatmentStep {
  id: string;
  type: TreatmentType;
  teeth: number[];
  description: string;
  status: TreatmentStepStatus;
  estimatedCost: number;
  scheduledDate?: string;
  completedDate?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  notes?: string;
  provider?: string;
}