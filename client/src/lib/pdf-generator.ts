
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
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      let yPosition = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);

      // Helper function to check if we need a new page
      const checkNewPage = (additionalHeight: number = 20) => {
        if (yPosition + additionalHeight > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
      };

      // Helper function to add text with word wrapping
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        
        const lines = doc.splitTextToSize(text, maxWidth);
        checkNewPage(lines.length * fontSize * 0.4);
        
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * fontSize * 0.4 + 5;
      };

      const addSection = (title: string) => {
        checkNewPage(25);
        addText(title, 14, true);
        yPosition += 5;
      };

      const addField = (label: string, value: string) => {
        addText(`${label}: ${value || 'Not specified'}`, 10, false);
      };

      // Header
      addText('LIBERTY PLACE RENTAL APPLICATION', 18, true);
      addText('122 East 42nd Street, Suite 1903, New York, NY 10168', 12, false);
      addText('Tel: 646-545-6700', 12, false);
      yPosition += 15;

      // Application Details
      addSection('APPLICATION DETAILS');
      addField('Building Address', data.applicationDetails?.buildingAddress);
      addField('Apartment', data.applicationDetails?.apartmentNumber);
      addField('Monthly Rent', `$${data.applicationDetails?.monthlyRent || '0'}`);
      addField('Move-in Date', data.applicationDetails?.moveInDate);
      yPosition += 10;

      // Primary Applicant
      addSection('PRIMARY APPLICANT');
      const primary = data.primaryApplicant || {};
      addField('Name', primary.name);
      addField('Email', primary.email);
      addField('Phone', primary.cellPhone);
      addField('Date of Birth', primary.dateOfBirth);
      addField('Social Security', primary.socialSecurity);
      addField('Current Address', primary.currentAddress);
      yPosition += 10;

      // Co-Applicant (if exists)
      if (data.hasCoApplicant && data.coApplicant) {
        addSection('CO-APPLICANT');
        const coApp = data.coApplicant;
        addField('Name', coApp.name);
        addField('Email', coApp.email);
        addField('Phone', coApp.cellPhone);
        addField('Date of Birth', coApp.dateOfBirth);
        addField('Social Security', coApp.socialSecurity);
        yPosition += 10;
      }

      // Guarantor (if exists)
      if (data.hasGuarantor && data.guarantor) {
        addSection('GUARANTOR');
        const guarantor = data.guarantor;
        addField('Name', guarantor.name);
        addField('Email', guarantor.email);
        addField('Phone', guarantor.cellPhone);
        addField('Relationship', guarantor.relationship);
        yPosition += 10;
      }

      // Financial Information
      addSection('FINANCIAL INFORMATION');
      const financial = data.financialInfo?.primaryApplicant || {};
      addField('Employer', financial.employer);
      addField('Position', financial.position);
      addField('Income', `$${financial.income || '0'} ${financial.incomeFrequency || ''}`);
      addField('Employment Length', financial.employmentLength);
      yPosition += 10;

      // Legal Questions
      addSection('LEGAL QUESTIONS');
      const legal = data.legalQuestions || {};
      addField('Legal Action', legal.legalAction);
      addField('Broken Lease', legal.brokenLease);
      addField('Bankruptcy', legal.bankruptcy);
      addField('Felony', legal.felony);
      yPosition += 10;

      // Signatures
      addSection('SIGNATURES');
      const signatures = data.signatures || {};
      if (signatures.primaryApplicant) {
        addField('Primary Applicant', signatures.primaryApplicant.name);
        addField('Date', signatures.primaryApplicant.date);
      }
      
      if (data.hasCoApplicant && signatures.coApplicant) {
        addField('Co-Applicant', signatures.coApplicant.name);
        addField('Date', signatures.coApplicant.date);
      }
      
      if (data.hasGuarantor && signatures.guarantor) {
        addField('Guarantor', signatures.guarantor.name);
        addField('Date', signatures.guarantor.date);
      }

      // Convert to blob
      const pdfOutput = doc.output('blob');
      resolve(pdfOutput);
    } catch (error) {
      console.error('PDF generation error:', error);
      reject(error);
    }
  });
}

export function downloadPDF(blob: Blob, filename: string = 'rental-application.pdf') {
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF download error:', error);
    throw error;
  }
}

export function previewPDF(blob: Blob) {
  try {
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Don't revoke URL immediately - let the browser handle it
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error('PDF preview error:', error);
    throw error;
  }
}
