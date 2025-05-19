import { useQuery, useMutation } from '@tanstack/react-query';
import { analyzeImage, generateTreatmentPlan, getEvidenceBasedGuidelines } from '../services/openaiService';

export const useImageAnalysis = (imageUrl: string, patientHistory?: string, symptoms?: string[]) => {
  return useQuery({
    queryKey: ['imageAnalysis', imageUrl],
    queryFn: () => analyzeImage({ imageUrl, patientHistory, symptoms }),
    enabled: !!imageUrl,
  });
};

export const useTreatmentPlanGeneration = () => {
  return useMutation({
    mutationFn: ({ condition, patientData }: { condition: string; patientData: any }) =>
      generateTreatmentPlan(condition, patientData),
  });
};

export const useEvidenceBasedGuidelines = (condition: string) => {
  return useQuery({
    queryKey: ['guidelines', condition],
    queryFn: () => getEvidenceBasedGuidelines(condition),
    enabled: !!condition,
  });
};