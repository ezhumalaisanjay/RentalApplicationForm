
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
  // Create a temporary div with the same styling as your form
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '210mm'; // A4 width
  tempDiv.style.backgroundColor = 'white';
  tempDiv.style.padding = '20px';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.fontSize = '12px';
  tempDiv.style.lineHeight = '1.4';
  
  tempDiv.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; background: white; padding: 20px;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
        <h1 style="font-size: 24px; font-weight: bold; margin: 0; color: #333;">LIBERTY PLACE</h1>
        <p style="margin: 5px 0; color: #666;">122 East 42nd Street, Suite 1903</p>
        <p style="margin: 5px 0; color: #666;">New York, NY 10168</p>
        <p style="margin: 5px 0; color: #666;">Tel: 646-545-6700 | Fax: 646-304-3100</p>
        <h2 style="font-size: 18px; margin-top: 15px; color: #333;">RENTAL APPLICATION</h2>
      </div>

      <!-- Primary Applicant -->
      <div style="margin-bottom: 25px;">
        <h3 style="background: #f5f5f5; padding: 10px; margin: 0 0 15px 0; border-left: 4px solid #333; font-size: 16px;">PRIMARY APPLICANT INFORMATION</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">First Name:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.firstName}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Last Name:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.lastName}</div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Email:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.email}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Phone:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.phone}</div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Date of Birth:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.dateOfBirth}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Social Security:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.socialSecurity}</div>
          </div>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold; display: block; margin-bottom: 5px;">Current Address:</label>
          <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.currentAddress}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">City:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.city}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">State:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.state}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Zip Code:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.zipCode}</div>
          </div>
        </div>
      </div>

      <!-- Financial Information -->
      <div style="margin-bottom: 25px;">
        <h3 style="background: #f5f5f5; padding: 10px; margin: 0 0 15px 0; border-left: 4px solid #333; font-size: 16px;">FINANCIAL INFORMATION</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Employer:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.employer}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Job Title:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.jobTitle}</div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Employment Length:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.employmentLength}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Monthly Income:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">$${data.monthlyIncome}</div>
          </div>
        </div>
      </div>

      <!-- Application Details -->
      <div style="margin-bottom: 25px;">
        <h3 style="background: #f5f5f5; padding: 10px; margin: 0 0 15px 0; border-left: 4px solid #333; font-size: 16px;">APPLICATION DETAILS</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Move-in Date:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.moveInDate}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Lease Length:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.leaseLength}</div>
          </div>
        </div>
        <div>
          <label style="font-weight: bold; display: block; margin-bottom: 5px;">Number of Occupants:</label>
          <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.numberOfOccupants}</div>
        </div>
      </div>

      ${data.coApplicant ? `
      <!-- Co-Applicant -->
      <div style="margin-bottom: 25px;">
        <h3 style="background: #f5f5f5; padding: 10px; margin: 0 0 15px 0; border-left: 4px solid #333; font-size: 16px;">CO-APPLICANT INFORMATION</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">First Name:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.coApplicant.firstName}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Last Name:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.coApplicant.lastName}</div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Email:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.coApplicant.email}</div>
          </div>
          <div>
            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Relationship:</label>
            <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.coApplicant.relationship}</div>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Legal Questions -->
      <div style="margin-bottom: 25px;">
        <h3 style="background: #f5f5f5; padding: 10px; margin: 0 0 15px 0; border-left: 4px solid #333; font-size: 16px;">LEGAL QUESTIONS</h3>
        <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block; margin-bottom: 5px;">Have you ever been convicted of a felony?</label>
          <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.felonyConviction}</div>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block; margin-bottom: 5px;">Have you ever been evicted?</label>
          <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.evictionHistory}</div>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block; margin-bottom: 5px;">Have you ever filed for bankruptcy?</label>
          <div style="border-bottom: 1px solid #333; padding: 5px 0; min-height: 20px;">${data.bankruptcyHistory}</div>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
        <p style="font-size: 10px; color: #666; margin: 0;">This application was submitted on ${new Date().toLocaleDateString()}</p>
        <p style="font-size: 10px; color: #666; margin: 5px 0 0 0;">All information provided is subject to verification.</p>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);

  try {
    // Convert the HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      height: tempDiv.scrollHeight,
      width: tempDiv.scrollWidth
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;
    
    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / imgAspectRatio;
    
    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * imgAspectRatio;
    }
    
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;
    
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    
    // Download the PDF
    pdf.save(`rental-application-${data.firstName}-${data.lastName}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
}
