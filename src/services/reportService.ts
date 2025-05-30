import jsPDF from 'jspdf';
import { TreatmentPlan } from '../types/treatment';

export const generateTreatmentReport = async (plan?: TreatmentPlan) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Treatment Report', 20, 20);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  if (plan) {
    // Add plan details
    doc.text(`Patient: ${plan.patientId}`, 20, 50);
    doc.text(`Status: ${plan.status}`, 20, 60);
    doc.text(`Estimated Cost: $${plan.estimatedCost}`, 20, 70);
    
    // Add steps
    doc.text('Treatment Steps:', 20, 90);
    plan.steps.forEach((step, index) => {
      const y = 100 + (index * 10);
      doc.text(`${index + 1}. ${step.type} - ${step.status}`, 30, y);
    });
  } else {
    // Add summary statistics
    doc.text('Treatment Summary', 20, 50);
    doc.text('Total Plans: 125', 20, 60);
    doc.text('Success Rate: 92%', 20, 70);
    doc.text('Upcoming Steps: 28', 20, 80);
  }
  
  // Add footer
  doc.setFontSize(10);
  doc.text('Generated by Xola SmartCare', 20, doc.internal.pageSize.height - 20);
  
  // Save the PDF
  doc.save('treatment-report.pdf');
};