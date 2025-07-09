export interface PDFData {
  applicationDetails: any;
  primaryApplicant: any;
  coApplicant?: any;
  guarantor?: any;
  financialInfo: any;
  legalQuestions: any;
  signatures: any;
  hasCoApplicant: boolean;
  hasGuarantor: boolean;
}

export function generatePDF(data: PDFData): Promise<Blob> {
  return new Promise((resolve) => {
    // This is a simplified PDF generation
    // In a real implementation, you would use libraries like jsPDF or PDFKit
    
    const content = `
      LIBERTY PLACE RENTAL APPLICATION
      ================================
      
      Building Address: ${data.applicationDetails.buildingAddress || 'Not specified'}
      Apartment: ${data.applicationDetails.apartmentNumber || 'Not specified'}
      Monthly Rent: $${data.applicationDetails.monthlyRent || '0'}
      Move-in Date: ${data.applicationDetails.moveInDate || 'Not specified'}
      
      PRIMARY APPLICANT
      ================
      Name: ${data.primaryApplicant?.name || 'Not specified'}
      Email: ${data.primaryApplicant?.email || 'Not specified'}
      Phone: ${data.primaryApplicant?.cellPhone || 'Not specified'}
      
      ${data.hasCoApplicant ? `
      CO-APPLICANT
      ============
      Name: ${data.coApplicant?.name || 'Not specified'}
      Email: ${data.coApplicant?.email || 'Not specified'}
      Phone: ${data.coApplicant?.cellPhone || 'Not specified'}
      ` : ''}
      
      ${data.hasGuarantor ? `
      GUARANTOR
      =========
      Name: ${data.guarantor?.name || 'Not specified'}
      Email: ${data.guarantor?.email || 'Not specified'}
      Phone: ${data.guarantor?.cellPhone || 'Not specified'}
      ` : ''}
      
      FINANCIAL INFORMATION
      ====================
      Employer: ${data.financialInfo?.primaryApplicant?.employer || 'Not specified'}
      Position: ${data.financialInfo?.primaryApplicant?.position || 'Not specified'}
      Income: $${data.financialInfo?.primaryApplicant?.income || '0'} ${data.financialInfo?.primaryApplicant?.incomeFrequency || ''}
      
      LEGAL QUESTIONS
      ===============
      Legal Action: ${data.legalQuestions?.legalAction || 'Not answered'}
      Broken Lease: ${data.legalQuestions?.brokenLease || 'Not answered'}
      Bankruptcy: ${data.legalQuestions?.bankruptcy || 'Not answered'}
      Felony: ${data.legalQuestions?.felony || 'Not answered'}
      
      SIGNATURES
      ==========
      Primary Applicant: ${data.signatures?.primaryApplicant?.name || 'Not signed'}
      Date: ${data.signatures?.primaryApplicant?.date || 'Not signed'}
      
      ${data.hasCoApplicant && data.signatures?.coApplicant ? `
      Co-Applicant: ${data.signatures.coApplicant.name}
      Date: ${data.signatures.coApplicant.date}
      ` : ''}
      
      ${data.hasGuarantor && data.signatures?.guarantor ? `
      Guarantor: ${data.signatures.guarantor.name}
      Date: ${data.signatures.guarantor.date}
      ` : ''}
    `;

    // Convert text to PDF-like blob (simplified)
    const blob = new Blob([content], { type: 'application/pdf' });
    resolve(blob);
  });
}

export function downloadPDF(blob: Blob, filename: string = 'rental-application.pdf') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
