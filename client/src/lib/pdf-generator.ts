
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface RentalApplicationData {
  // Primary Applicant
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  socialSecurity: string;
  driversLicense: string;
  currentAddress: string;
  city: string;
  state: string;
  zipCode: string;
  landlordName?: string;
  landlordPhone?: string;
  monthlyRent?: string;
  reasonForMoving?: string;
  
  // Co-Applicant
  coApplicant?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    socialSecurity: string;
    relationship: string;
  };
  
  // Financial Information
  employer: string;
  jobTitle: string;
  employmentLength: string;
  monthlyIncome: string;
  additionalIncome?: string;
  bankName: string;
  accountType: string;
  
  // Application Details
  moveInDate: string;
  leaseLength: string;
  numberOfOccupants: string;
  pets?: string;
  petDetails?: string;
  
  // Legal Questions
  felonyConviction: string;
  evictionHistory: string;
  bankruptcyHistory: string;
  
  // Guarantor (if applicable)
  guarantor?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    relationship: string;
    monthlyIncome: string;
  };
}

export async function generatePDF(data: RentalApplicationData): Promise<void> {
  // Create a temporary div with professional styling
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '210mm'; // A4 width
  tempDiv.style.backgroundColor = 'white';
  tempDiv.style.fontFamily = '"Times New Roman", serif';
  tempDiv.style.fontSize = '11px';
  tempDiv.style.lineHeight = '1.4';
  tempDiv.style.color = '#000';
  
  tempDiv.innerHTML = `
    <div style="max-width: 190mm; margin: 0 auto; background: white; padding: 15mm;">
      <!-- Professional Header -->
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #2c3e50;">
        <h1 style="font-size: 22px; font-weight: bold; margin: 0; color: #2c3e50; letter-spacing: 1px;">LIBERTY PLACE</h1>
        <div style="margin: 8px 0; font-size: 10px; color: #34495e;">
          <div>122 East 42nd Street, Suite 1903</div>
          <div>New York, NY 10168</div>
          <div>Tel: 646-545-6700 | Fax: 646-304-3100</div>
        </div>
        <h2 style="font-size: 16px; margin: 15px 0 0 0; color: #2c3e50; font-weight: normal; letter-spacing: 0.5px;">RENTAL APPLICATION</h2>
      </div>

      <!-- Application Date -->
      <div style="text-align: right; margin-bottom: 20px; font-size: 10px; color: #7f8c8d;">
        Application Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>

      <!-- Primary Applicant Section -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h3 style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; padding: 8px 12px; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Primary Applicant Information</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">FIRST NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.firstName || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">LAST NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.lastName || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">EMAIL ADDRESS</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.email || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">PHONE NUMBER</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.phone || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">DATE OF BIRTH</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.dateOfBirth || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">SOCIAL SECURITY NUMBER</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.socialSecurity || ''}</div>
            </td>
          </tr>
        </table>

        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">CURRENT ADDRESS</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.currentAddress || ''}</div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 33.33%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">CITY</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.city || ''}</div>
            </td>
            <td style="width: 33.33%; padding: 6px 5px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">STATE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.state || ''}</div>
            </td>
            <td style="width: 33.33%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">ZIP CODE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.zipCode || ''}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Employment & Financial Information -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h3 style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; padding: 8px 12px; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Employment & Financial Information</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">EMPLOYER</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.employer || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">JOB TITLE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.jobTitle || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">EMPLOYMENT LENGTH</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.employmentLength || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">MONTHLY INCOME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">$${data.monthlyIncome || ''}</div>
            </td>
          </tr>
        </table>

        ${data.additionalIncome ? `
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">ADDITIONAL INCOME</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">$${data.additionalIncome}</div>
        </div>
        ` : ''}

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">BANK NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.bankName || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">ACCOUNT TYPE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.accountType || ''}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Rental Details -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h3 style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; padding: 8px 12px; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Rental Details</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">DESIRED MOVE-IN DATE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.moveInDate || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">LEASE LENGTH</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.leaseLength || ''}</div>
            </td>
          </tr>
        </table>

        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">NUMBER OF OCCUPANTS</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.numberOfOccupants || ''}</div>
        </div>

        ${data.pets ? `
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">PETS</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.pets}</div>
        </div>
        ` : ''}

        ${data.petDetails ? `
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">PET DETAILS</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.petDetails}</div>
        </div>
        ` : ''}
      </div>

      ${data.coApplicant ? `
      <!-- Co-Applicant Information -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h3 style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; padding: 8px 12px; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Co-Applicant Information</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">FIRST NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.coApplicant.firstName || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">LAST NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.coApplicant.lastName || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">EMAIL</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.coApplicant.email || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">PHONE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.coApplicant.phone || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">DATE OF BIRTH</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.coApplicant.dateOfBirth || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">RELATIONSHIP</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.coApplicant.relationship || ''}</div>
            </td>
          </tr>
        </table>
      </div>
      ` : ''}

      ${data.guarantor ? `
      <!-- Guarantor Information -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h3 style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; padding: 8px 12px; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Guarantor Information</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">FIRST NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.guarantor.firstName || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">LAST NAME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.guarantor.lastName || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">EMAIL</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.guarantor.email || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">PHONE</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.guarantor.phone || ''}</div>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr>
            <td style="width: 50%; padding: 6px 10px 6px 0; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">RELATIONSHIP</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.guarantor.relationship || ''}</div>
            </td>
            <td style="width: 50%; padding: 6px 0 6px 10px; vertical-align: top;">
              <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">MONTHLY INCOME</div>
              <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">$${data.guarantor.monthlyIncome || ''}</div>
            </td>
          </tr>
        </table>
      </div>
      ` : ''}

      <!-- Legal Disclosure -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h3 style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; padding: 8px 12px; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Legal Disclosure</h3>
        
        <div style="margin-bottom: 12px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">HAVE YOU EVER BEEN CONVICTED OF A FELONY?</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.felonyConviction || ''}</div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">HAVE YOU EVER BEEN EVICTED?</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.evictionHistory || ''}</div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-weight: bold; font-size: 10px; color: #2c3e50; margin-bottom: 3px;">HAVE YOU EVER FILED FOR BANKRUPTCY?</div>
          <div style="border-bottom: 1px solid #bdc3c7; padding: 4px 0; min-height: 18px; font-size: 11px;">${data.bankruptcyHistory || ''}</div>
        </div>
      </div>

      <!-- Professional Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #34495e; text-align: center;">
        <div style="font-size: 9px; color: #7f8c8d; margin-bottom: 5px;">
          This application was completed and submitted on ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div style="font-size: 9px; color: #7f8c8d; margin-bottom: 10px;">
          All information provided is subject to verification and credit/background check.
        </div>
        <div style="font-size: 8px; color: #95a5a6; font-style: italic;">
          © ${new Date().getFullYear()} Liberty Place Management. All rights reserved.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);

  try {
    // Wait a moment for styles to apply
    await new Promise(resolve => setTimeout(resolve, 100));

    // Convert the HTML to canvas with higher quality
    const canvas = await html2canvas(tempDiv, {
      backgroundColor: '#ffffff',
      scale: 3, // Higher quality
      useCORS: true,
      allowTaint: true,
      height: tempDiv.scrollHeight,
      width: tempDiv.scrollWidth,
      logging: false,
      imageTimeout: 15000,
      removeContainer: false
    });

    // Create PDF with better sizing
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit the page properly
    const imgAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;
    
    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / imgAspectRatio;
    
    // If the image is taller than the page, we need to handle pagination
    if (imgHeight > pdfHeight) {
      const scale = pdfHeight / imgHeight;
      imgHeight = pdfHeight;
      imgWidth = imgWidth * scale;
    }
    
    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;
    
    pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `rental-application-${data.firstName}-${data.lastName}-${timestamp}.pdf`;
    
    // Download the PDF
    pdf.save(filename);
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
}
