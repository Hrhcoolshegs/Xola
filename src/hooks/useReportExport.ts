import { useState } from 'react';
import { downloadReport } from '../services/reportService';
import toast from 'react-hot-toast';

export const useReportExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportReport = async (elementId: string, title: string) => {
    setIsExporting(true);
    try {
      await downloadReport(elementId, title);
      toast.success('Report exported successfully');
    } catch (error) {
      console.error('Error exporting report:', error);
      toast.error('Failed to export report');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportReport,
    isExporting
  };
};