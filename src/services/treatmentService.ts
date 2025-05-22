import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface TreatmentParams {
  page: number;
  pageSize: number;
  status?: string;
  dateRange?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Mock data for development
const mockTreatments = [
  {
    id: 'T1',
    patientId: 'P001',
    startDate: '2024-02-20',
    endDate: null,
    status: 'active',
    progress: 35,
    procedures: [
      {
        name: 'Root Canal',
        cost: 1200,
        insuranceCoverage: 80,
        status: 'pending',
        urgency: 'High'
      }
    ]
  },
  {
    id: 'T2',
    patientId: 'P002',
    startDate: '2024-02-15',
    endDate: null,
    status: 'active',
    progress: 60,
    procedures: [
      {
        name: 'Crown',
        cost: 900,
        insuranceCoverage: 70,
        status: 'completed',
        urgency: 'Medium'
      }
    ]
  }
];

export const useTreatments = (params: TreatmentParams) => {
  return useQuery({
    queryKey: ['treatments', params],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter and paginate mock data
      let filtered = [...mockTreatments];
      
      if (params.searchTerm) {
        filtered = filtered.filter(t => 
          t.id.toLowerCase().includes(params.searchTerm?.toLowerCase() || '') ||
          t.patientId.toLowerCase().includes(params.searchTerm?.toLowerCase() || '')
        );
      }
      
      if (params.status) {
        filtered = filtered.filter(t => t.status === params.status);
      }
      
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize;
      
      return {
        treatments: filtered.slice(start, end),
        totalCount: filtered.length,
        pageCount: Math.ceil(filtered.length / params.pageSize)
      };
    },
    keepPreviousData: true
  });
};

export const useCreateTreatment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (treatment: any) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newTreatment = {
        id: `T${mockTreatments.length + 1}`,
        ...treatment,
        startDate: new Date().toISOString().split('T')[0],
        status: 'active',
        progress: 0
      };
      mockTreatments.push(newTreatment);
      return newTreatment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
    }
  });
};

export const useUpdateTreatment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const index = mockTreatments.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Treatment not found');
      mockTreatments[index] = { ...mockTreatments[index], ...data };
      return mockTreatments[index];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
    }
  });
};

export const useDeleteTreatment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const index = mockTreatments.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Treatment not found');
      mockTreatments.splice(index, 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
    }
  });
};

// Virtual list helper for efficient rendering
export const getVirtualizedTreatments = (
  treatments: any[],
  startIndex: number,
  endIndex: number
) => {
  return treatments.slice(startIndex, endIndex);
};