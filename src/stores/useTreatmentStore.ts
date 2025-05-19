import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Treatment {
  id: string;
  patientId: string;
  startDate: string;
  endDate: string | null;
  status: 'active' | 'completed' | 'cancelled';
  progress: number;
  procedures: {
    name: string;
    cost: number;
    insuranceCoverage: number;
    status: 'pending' | 'completed';
    urgency: 'High' | 'Medium' | 'Low';
  }[];
}

interface AnimationState {
  isPlaying: boolean;
  currentStep: number;
  speed: number;
}

interface VisualizationState {
  mode: '3d' | '2d';
  zoom: number;
  rotation: { x: number; y: number; z: number };
  highlightedTeeth: string[];
}

interface TreatmentFilters {
  status: string;
  dateRange: string;
  searchTerm: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface TreatmentPagination {
  page: number;
  pageSize: number;
  total: number;
}

interface TreatmentState {
  treatments: Treatment[];
  filters: TreatmentFilters;
  pagination: TreatmentPagination;
  animation: AnimationState;
  visualization: VisualizationState;
  setFilters: (filters: Partial<TreatmentFilters>) => void;
  setPagination: (pagination: Partial<TreatmentPagination>) => void;
  addTreatment: (treatment: Treatment) => void;
  updateTreatment: (id: string, treatment: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
  setAnimationState: (state: Partial<AnimationState>) => void;
  setVisualizationState: (state: Partial<VisualizationState>) => void;
  toggleAnimation: () => void;
  nextStep: () => void;
  previousStep: () => void;
  resetAnimation: () => void;
  highlightTeeth: (teethIds: string[]) => void;
}

export const useTreatmentStore = create<TreatmentState>()(
  persist(
    (set) => ({
      treatments: [],
      filters: {
        status: 'all',
        dateRange: 'all',
        searchTerm: '',
        sortBy: 'startDate',
        sortOrder: 'desc',
      },
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      animation: {
        isPlaying: false,
        currentStep: 0,
        speed: 1,
      },
      visualization: {
        mode: '3d',
        zoom: 1,
        rotation: { x: 0, y: 0, z: 0 },
        highlightedTeeth: [],
      },
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, page: 1 },
        })),
      setPagination: (pagination) =>
        set((state) => ({
          pagination: { ...state.pagination, ...pagination },
        })),
      addTreatment: (treatment) =>
        set((state) => ({
          treatments: [treatment, ...state.treatments],
          pagination: {
            ...state.pagination,
            total: state.pagination.total + 1,
          },
        })),
      updateTreatment: (id, updatedTreatment) =>
        set((state) => ({
          treatments: state.treatments.map((treatment) =>
            treatment.id === id
              ? { ...treatment, ...updatedTreatment }
              : treatment
          ),
        })),
      deleteTreatment: (id) =>
        set((state) => ({
          treatments: state.treatments.filter((treatment) => treatment.id !== id),
          pagination: {
            ...state.pagination,
            total: state.pagination.total - 1,
          },
        })),
      setAnimationState: (animationState) =>
        set((state) => ({
          animation: { ...state.animation, ...animationState },
        })),
      setVisualizationState: (visualizationState) =>
        set((state) => ({
          visualization: { ...state.visualization, ...visualizationState },
        })),
      toggleAnimation: () =>
        set((state) => ({
          animation: { ...state.animation, isPlaying: !state.animation.isPlaying },
        })),
      nextStep: () =>
        set((state) => ({
          animation: {
            ...state.animation,
            currentStep: state.animation.currentStep + 1,
          },
        })),
      previousStep: () =>
        set((state) => ({
          animation: {
            ...state.animation,
            currentStep: Math.max(0, state.animation.currentStep - 1),
          },
        })),
      resetAnimation: () =>
        set((state) => ({
          animation: { ...state.animation, currentStep: 0, isPlaying: false },
        })),
      highlightTeeth: (teethIds) =>
        set((state) => ({
          visualization: { ...state.visualization, highlightedTeeth: teethIds },
        })),
    }),
    {
      name: 'treatment-store',
    }
  )
);