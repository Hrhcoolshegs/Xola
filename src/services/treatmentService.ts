import { TreatmentPlan, TreatmentStep } from '../types/treatment';

// Simulated database
let treatmentPlans: TreatmentPlan[] = [];

export const treatmentService = {
  getPlans: async (): Promise<TreatmentPlan[]> => {
    return treatmentPlans;
  },

  getPlanById: async (id: string): Promise<TreatmentPlan | undefined> => {
    return treatmentPlans.find(plan => plan.id === id);
  },

  getPatientPlans: async (patientId: string): Promise<TreatmentPlan[]> => {
    return treatmentPlans.filter(plan => plan.patientId === patientId);
  },

  createPlan: async (plan: Omit<TreatmentPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<TreatmentPlan> => {
    const newPlan: TreatmentPlan = {
      ...plan,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    treatmentPlans.push(newPlan);
    return newPlan;
  },

  updatePlan: async (id: string, updates: Partial<TreatmentPlan>): Promise<TreatmentPlan> => {
    const index = treatmentPlans.findIndex(plan => plan.id === id);
    if (index === -1) throw new Error('Treatment plan not found');

    const updatedPlan = {
      ...treatmentPlans[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    treatmentPlans[index] = updatedPlan;
    return updatedPlan;
  },

  deletePlan: async (id: string): Promise<void> => {
    treatmentPlans = treatmentPlans.filter(plan => plan.id !== id);
  },

  addStep: async (planId: string, step: Omit<TreatmentStep, 'id'>): Promise<TreatmentStep> => {
    const plan = treatmentPlans.find(p => p.id === planId);
    if (!plan) throw new Error('Treatment plan not found');

    const newStep: TreatmentStep = {
      ...step,
      id: crypto.randomUUID(),
    };
    plan.steps.push(newStep);
    plan.updatedAt = new Date().toISOString();
    return newStep;
  },

  updateStep: async (planId: string, stepId: string, updates: Partial<TreatmentStep>): Promise<TreatmentStep> => {
    const plan = treatmentPlans.find(p => p.id === planId);
    if (!plan) throw new Error('Treatment plan not found');

    const stepIndex = plan.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) throw new Error('Treatment step not found');

    const updatedStep = {
      ...plan.steps[stepIndex],
      ...updates,
    };
    plan.steps[stepIndex] = updatedStep;
    plan.updatedAt = new Date().toISOString();
    return updatedStep;
  },

  deleteStep: async (planId: string, stepId: string): Promise<void> => {
    const plan = treatmentPlans.find(p => p.id === planId);
    if (!plan) throw new Error('Treatment plan not found');

    plan.steps = plan.steps.filter(s => s.id !== stepId);
    plan.updatedAt = new Date().toISOString();
  },
};