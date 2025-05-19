import { TreatmentType } from '../types/treatment';

export interface ChartEntry {
  toothNumber: number;
  type: TreatmentType;
  findings?: {
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
  notes?: string;
  date: string;
}

class ChartService {
  private entries: ChartEntry[] = [];
  private subscribers: ((entry: ChartEntry) => void)[] = [];

  addEntry(entry: Omit<ChartEntry, 'date'>) {
    const newEntry = {
      ...entry,
      date: new Date().toISOString()
    };
    this.entries.push(newEntry);
    this.notifySubscribers(newEntry);
  }

  getEntries(toothNumber?: number) {
    if (toothNumber) {
      return this.entries.filter(entry => entry.toothNumber === toothNumber);
    }
    return this.entries;
  }

  subscribe(callback: (entry: ChartEntry) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(entry: ChartEntry) {
    this.subscribers.forEach(callback => callback(entry));
  }
}

export const chartService = new ChartService();