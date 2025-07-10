
import jsPDF from 'jspdf';

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
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
      doc.setFontSize(fontSize);
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      const lines = doc.splitTextToSize(text, maxWidth);
      if (yPosition + (lines.length * fontSize * 0.4) > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * fontSize * 0.4 + 5;
    };

    const addSection = (title: string, content: string) => {
      addText(title, 14, true);
      addText(content, 10, false);
      yPosition += 5;
    };

    // Title
    addText('LIBERTY PLACE RENTAL APPLICATION', 18, true);
    addText('122 East 42nd Street, Suite 1903, New York, NY 10168', 12, false);
    addText('Tel: 646-545-6700', 12, false);
    yPosition += 10;

    // Application Details
    addSection('APPLICATION DETAILS', '');
    addText(`Building Address: ${data.applicationDetails.buildingAddress || 'Not specified'}`, 10, false);
    addText(`Apartment: ${data.applicationDetails.apartmentNumber || 'Not specified'}`, 10, false);
    addText(`Monthly Rent: $${data.applicationDetails.monthlyRent || '0'}`, 10, false);
    addText(`Move-in Date: ${data.applicationDetails.moveInDate || 'Not specified'}`, 10, false);
    yPosition += 10;

    // Primary Applicant
    addSection('PRIMARY APPLICANT', '');
    const primary = data.primaryApplicant || {};
    addText(`Name: ${primary.name || 'Not specified'}`, 10, false);
    addText(`Email: ${primary.email || 'Not specified'}`, 10, false);
    addText(`Phone: ${primary.cellPhone || 'Not specified'}`, 10, false);
    addText(`Date of Birth: ${primary.dateOfBirth || 'Not specified'}`, 10, false);
    addText(`Social Security: ${primary.socialSecurity || 'Not specified'}`, 10, false);
    addText(`Current Address: ${primary.currentAddress || 'Not specified'}`, 10, false);
    yPosition += 10;

    // Co-Applicant (if exists)
    if (data.hasCoApplicant && data.coApplicant) {
      addSection('CO-APPLICANT', '');
      const coApp = data.coApplicant;
      addText(`Name: ${coApp.name || 'Not specified'}`, 10, false);
      addText(`Email: ${coApp.email || 'Not specified'}`, 10, false);
      addText(`Phone: ${coApp.cellPhone || 'Not specified'}`, 10, false);
      addText(`Date of Birth: ${coApp.dateOfBirth || 'Not specified'}`, 10, false);
      addText(`Social Security: ${coApp.socialSecurity || 'Not specified'}`, 10, false);
      yPosition += 10;
    }

    // Guarantor (if exists)
    if (data.hasGuarantor && data.guarantor) {
      addSection('GUARANTOR', '');
      const guarantor = data.guarantor;
      addText(`Name: ${guarantor.name || 'Not specified'}`, 10, false);
      addText(`Email: ${guarantor.email || 'Not specified'}`, 10, false);
      addText(`Phone: ${guarantor.cellPhone || 'Not specified'}`, 10, false);
      addText(`Relationship: ${guarantor.relationship || 'Not specified'}`, 10, false);
      yPosition += 10;
    }

    // Financial Information
    addSection('FINANCIAL INFORMATION', '');
    const financial = data.financialInfo?.primaryApplicant || {};
    addText(`Employer: ${financial.employer || 'Not specified'}`, 10, false);
    addText(`Position: ${financial.position || 'Not specified'}`, 10, false);
    addText(`Income: $${financial.income || '0'} ${financial.incomeFrequency || ''}`, 10, false);
    addText(`Employment Length: ${financial.employmentLength || 'Not specified'}`, 10, false);
    yPosition += 10;

    // Legal Questions
    addSection('LEGAL QUESTIONS', '');
    const legal = data.legalQuestions || {};
    addText(`Legal Action: ${legal.legalAction || 'Not answered'}`, 10, false);
    addText(`Broken Lease: ${legal.brokenLease || 'Not answered'}`, 10, false);
    addText(`Bankruptcy: ${legal.bankruptcy || 'Not answered'}`, 10, false);
    addText(`Felony: ${legal.felony || 'Not answered'}`, 10, false);
    yPosition += 10;

    // Signatures
    addSection('SIGNATURES', '');
    const signatures = data.signatures || {};
    if (signatures.primaryApplicant) {
      addText(`Primary Applicant: ${signatures.primaryApplicant.name || 'Not signed'}`, 10, false);
      addText(`Date: ${signatures.primaryApplicant.date || 'Not signed'}`, 10, false);
    }
    
    if (data.hasCoApplicant && signatures.coApplicant) {
      addText(`Co-Applicant: ${signatures.coApplicant.name || 'Not signed'}`, 10, false);
      addText(`Date: ${signatures.coApplicant.date || 'Not signed'}`, 10, false);
    }
    
    if (data.hasGuarantor && signatures.guarantor) {
      addText(`Guarantor: ${signatures.guarantor.name || 'Not signed'}`, 10, false);
      addText(`Date: ${signatures.guarantor.date || 'Not signed'}`, 10, false);
    }

    // Convert to blob
    const pdfBlob = new Blob([doc.output('blob')], { type: 'application/pdf' });
    resolve(pdfBlob);
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
