import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import FileUpload from "../file-upload";

interface LegalQuestionsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function LegalQuestions({ data, onUpdate }: LegalQuestionsProps) {
  const [showLegalActionExplanation, setShowLegalActionExplanation] = useState(false);

  const handleLegalQuestionChange = (field: string, value: string) => {
    const updates = {
      legalQuestions: {
        ...data.legalQuestions,
        [field]: value
      }
    };

    // Show/hide explanation fields
    if (field === 'legalAction') {
      setShowLegalActionExplanation(value === 'yes');
      if (value === 'no') {
        updates.legalQuestions.legalActionExplanation = '';
      }
    }

    onUpdate(updates);
  };

  const handleDocumentUpload = (category: string, files: File[]) => {
    onUpdate({
      documents: {
        ...data.documents,
        [category]: files
      }
    });
  };

  const legalQuestions = data.legalQuestions || {};

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Legal Questions & Supporting Documents</h2>
      
      {/* Legal Questions */}
      <div className="space-y-6 mb-8">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Have you ever been in landlord/tenant legal action? *
          </Label>
          <RadioGroup 
            value={legalQuestions.legalAction || ''} 
            onValueChange={(value) => handleLegalQuestionChange('legalAction', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="legalAction-yes" />
              <Label htmlFor="legalAction-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="legalAction-no" />
              <Label htmlFor="legalAction-no">No</Label>
            </div>
          </RadioGroup>
          
          {showLegalActionExplanation && (
            <div className="mt-3">
              <Label htmlFor="legalActionExplanation">If yes, please explain:</Label>
              <Textarea
                id="legalActionExplanation"
                rows={3}
                placeholder="Please provide details..."
                value={legalQuestions.legalActionExplanation || ''}
                onChange={(e) => handleLegalQuestionChange('legalActionExplanation', e.target.value)}
              />
            </div>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Have you ever broken a lease? *
          </Label>
          <RadioGroup 
            value={legalQuestions.brokenLease || ''} 
            onValueChange={(value) => handleLegalQuestionChange('brokenLease', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="brokenLease-yes" />
              <Label htmlFor="brokenLease-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="brokenLease-no" />
              <Label htmlFor="brokenLease-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Have you ever declared bankruptcy? *
          </Label>
          <RadioGroup 
            value={legalQuestions.bankruptcy || ''} 
            onValueChange={(value) => handleLegalQuestionChange('bankruptcy', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="bankruptcy-yes" />
              <Label htmlFor="bankruptcy-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="bankruptcy-no" />
              <Label htmlFor="bankruptcy-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Have you ever been convicted of a felony? *
          </Label>
          <RadioGroup 
            value={legalQuestions.felony || ''} 
            onValueChange={(value) => handleLegalQuestionChange('felony', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="felony-yes" />
              <Label htmlFor="felony-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="felony-no" />
              <Label htmlFor="felony-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Supporting Documents Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Supporting Documents</h3>
        <p className="text-sm text-gray-600 mb-6">
          Please upload the required documents. All documents must be clear and legible.
        </p>
        
        {/* Processing Fee Notice */}
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <h3 className="text-sm font-medium text-yellow-800">Processing Fee Required</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>A non-refundable processing fee is required:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>$50.00 per adult applicant</li>
                <li>$50.00 per guarantor</li>
                <li>Money order or cashier's check ONLY</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-6">
          {/* Primary Applicant Documents */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-4">Primary Applicant Documents</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                title="Driver's License / Photo ID"
                description="Upload front and back (Required)"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onFilesSelected={(files) => handleDocumentUpload('primaryApplicantID', files)}
              />
              
              <FileUpload
                title="Social Security Card"
                description="Clear photo or scan (Required)"
                accept=".pdf,.jpg,.jpeg,.png"
                onFilesSelected={(files) => handleDocumentUpload('primaryApplicantSSN', files)}
              />
              
              <FileUpload
                title="Bank Statements"
                description="First page only (Required)"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onFilesSelected={(files) => handleDocumentUpload('primaryApplicantBank', files)}
              />
              
              <FileUpload
                title="Tax Returns"
                description="Previous year, first page (Required)"
                accept=".pdf,.jpg,.jpeg,.png"
                onFilesSelected={(files) => handleDocumentUpload('primaryApplicantTax', files)}
              />
              
              <FileUpload
                title="Employment Letter"
                description="Company letterhead with salary info"
                accept=".pdf,.jpg,.jpeg,.png"
                onFilesSelected={(files) => handleDocumentUpload('primaryApplicantEmployment', files)}
              />
              
              <FileUpload
                title="Pay Stubs"
                description="Last 2-4 recent pay stubs"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onFilesSelected={(files) => handleDocumentUpload('primaryApplicantPayStubs', files)}
              />
            </div>
          </div>

          {/* Co-Applicant Documents (conditional) */}
          {data.hasCoApplicant && (
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Co-Applicant Documents</h4>
              <div className="text-sm text-gray-600 italic">
                Co-applicant document uploads follow the same pattern...
              </div>
            </div>
          )}

          {/* Guarantor Documents (conditional) */}
          {data.hasGuarantor && (
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Guarantor Documents</h4>
              <div className="text-sm text-gray-600 italic">
                Guarantor document uploads follow the same pattern...
              </div>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
}
