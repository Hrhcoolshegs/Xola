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
  setFilters: (filters: Partial<TreatmentFilters>) => void;
  setPagination: (pagination: Partial<TreatmentPagination>) => void;
  addTreatment: (treatment: Treatment) => void;
  updateTreatment: (id: string, treatment: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
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
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, page: 1 }, // Reset to first page on filter change
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
    }),
    {
      name: 'treatment-store',
    }
  )
);