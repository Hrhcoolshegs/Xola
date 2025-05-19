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

export const useTreatments = (params: TreatmentParams) => {
  return useQuery({
    queryKey: ['treatments', params],
    queryFn: async () => {
      // Simulate API pagination and filtering
      const response = await fetch(`/api/treatments?${new URLSearchParams({
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        status: params.status || '',
        dateRange: params.dateRange || '',
        searchTerm: params.searchTerm || '',
        sortBy: params.sortBy || '',
        sortOrder: params.sortOrder || '',
      })}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch treatments');
      }
      
      return response.json();
    },
    keepPreviousData: true, // Keep previous data while fetching new data
  });
};

export const useCreateTreatment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (treatment: any) => {
      const response = await fetch('/api/treatments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(treatment),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create treatment');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
    },
  });
};

export const useUpdateTreatment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/treatments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update treatment');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
    },
  });
};

export const useDeleteTreatment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/treatments/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete treatment');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatments'] });
    },
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