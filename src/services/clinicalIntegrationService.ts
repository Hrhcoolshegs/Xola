import { chartService, ChartEntry } from './chartService';
import { TreatmentType } from '../types/treatment';

interface ClinicalFinding {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendedTreatment?: TreatmentType;
}

class ClinicalIntegrationService {
  private findings: Record<number, ClinicalFinding[]> = {};

  addFinding(toothNumber: number, finding: ClinicalFinding) {
    if (!this.findings[toothNumber]) {
      this.findings[toothNumber] = [];
    }
    this.findings[toothNumber].push(finding);

    if (finding.recommendedTreatment) {
      chartService.addEntry({
        toothNumber,
        type: finding.recommendedTreatment,
        findings: [finding],
      });
    }
  }

  getFindings(toothNumber?: number) {
    if (toothNumber) {
      return this.findings[toothNumber] || [];
    }
    return this.findings;
  }

  clearFindings(toothNumber: number) {
    delete this.findings[toothNumber];
  }

  // Simulated AI analysis of radiograph
  async analyzeRadiograph(imageUrl: string): Promise<Record<number, ClinicalFinding[]>> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock findings for demonstration
    return {
      14: [{
        type: 'Dental Caries',
        severity: 'high',
        description: 'Deep cavity detected on distal surface',
        recommendedTreatment: 'filling'
      }],
      19: [{
        type: 'Crown Fracture',
        severity: 'medium',
        description: 'Vertical fracture detected',
        recommendedTreatment: 'crown'
      }],
      30: [{
        type: 'Periapical Lesion',
        severity: 'high',
        description: 'Large periapical radiolucency detected',
        recommendedTreatment: 'root_canal'
      }]
    };
  }
}

export const clinicalIntegrationService = new ClinicalIntegrationService();