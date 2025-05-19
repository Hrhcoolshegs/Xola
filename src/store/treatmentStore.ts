import { create } from 'zustand';
import { TreatmentPlan, TreatmentStep } from '../types/treatment';

interface TreatmentState {
  activePlan: TreatmentPlan | null;
  isLoading: boolean;
  error: string | null;
  setActivePlan: (plan: TreatmentPlan | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateStep: (stepId: string, updates: Partial<TreatmentStep>) => void;
  addStep: (step: TreatmentStep) => void;
  removeStep: (stepId: string) => void;
}

export const useTreatmentStore = create<TreatmentState>((set) => ({
  activePlan: null,
  isLoading: false,
  error: null,
  
  setActivePlan: (plan) => set({ activePlan: plan }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  updateStep: (stepId, updates) => set((state) => {
    if (!state.activePlan) return state;
    
    const updatedSteps = state.activePlan.steps.map((step) =>
      step.id === stepId ? { ...step, ...updates } : step
    );
    
    return {
      activePlan: {
        ...state.activePlan,
        steps: updatedSteps,
        updatedAt: new Date().toISOString(),
      },
    };
  }),
  
  addStep: (step) => set((state) => {
    if (!state.activePlan) return state;
    
    return {
      activePlan: {
        ...state.activePlan,
        steps: [...state.activePlan.steps, step],
        updatedAt: new Date().toISOString(),
      },
    };
  }),
  
  removeStep: (stepId) => set((state) => {
    if (!state.activePlan) return state;
    
    return {
      activePlan: {
        ...state.activePlan,
        steps: state.activePlan.steps.filter((step) => step.id !== stepId),
        updatedAt: new Date().toISOString(),
      },
    };
  }),
}));