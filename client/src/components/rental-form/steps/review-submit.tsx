import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import SignaturePad from "../signature-pad";

interface ReviewSubmitProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function ReviewSubmit({ data, onUpdate }: ReviewSubmitProps) {
  const handleSignatureChange = (applicantType: string, field: string, value: string) => {
    onUpdate({
      signatures: {
        ...data.signatures,
        [applicantType]: {
          ...data.signatures?.[applicantType],
          [field]: value
        }
      }
    });
  };

  const primarySignature = data.signatures?.primaryApplicant || {};

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Submit Application</h2>
      
      {/* Application Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Application Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p><span className="font-medium">Building:</span> {data.buildingAddress || 'Not specified'}</p>
            <p><span className="font-medium">Apartment:</span> {data.apartmentNumber || 'Not specified'}</p>
            <p><span className="font-medium">Monthly Rent:</span> ${data.monthlyRent || '0'}</p>
          </div>
          <div>
            <p><span className="font-medium">Move-in Date:</span> {data.moveInDate || 'Not specified'}</p>
            <p><span className="font-medium">Primary Applicant:</span> {data.primaryApplicant?.name || 'Not specified'}</p>
            {data.hasCoApplicant && (
              <p><span className="font-medium">Co-Applicant:</span> {data.coApplicant?.name || 'Not specified'}</p>
            )}
            {data.hasGuarantor && (
              <p><span className="font-medium">Guarantor:</span> {data.guarantor?.name || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>

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

      {/* Terms and Conditions */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Terms and Conditions</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <p>Please read carefully before signing:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The Landlord will in no event be bound, nor will possession be given, unless and until a lease executed by the Landlord has been delivered to the Tenant.</li>
            <li>The applicant and his/her references must be satisfactory to the Landlord.</li>
            <li>The date on page one of the lease is not your move-in date. Your move-in date will be arranged after approval.</li>
            <li>Applications will not remove apartments from the market.</li>
            <li>Lease signings must be scheduled within three (3) days of approval or the backup applicant will be considered.</li>
            <li>Only complete applications will be reviewed and considered for tenancy.</li>
          </ul>
        </div>
      </div>

      {/* Digital Signatures */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Digital Signatures</h3>
        
        {/* Primary Applicant Signature */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-base font-medium text-gray-900 mb-4">Primary Applicant Signature</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <Label htmlFor="primarySignatureName">Full Name *</Label>
              <Input
                id="primarySignatureName"
                placeholder="Type your full name"
                value={primarySignature.name || ''}
                onChange={(e) => handleSignatureChange('primaryApplicant', 'name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="primarySignatureDate">Date *</Label>
              <Input
                id="primarySignatureDate"
                type="date"
                value={primarySignature.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleSignatureChange('primaryApplicant', 'date', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Digital Signature *</Label>
            <SignaturePad
              onSignatureChange={(signature) => handleSignatureChange('primaryApplicant', 'signature', signature)}
            />
            <p className="text-xs text-gray-500 mt-1">Sign above using your mouse or touch screen</p>
          </div>
        </div>

        {/* Co-Applicant Signature (conditional) */}
        {data.hasCoApplicant && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Co-Applicant Signature</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label htmlFor="coSignatureName">Full Name *</Label>
                <Input
                  id="coSignatureName"
                  placeholder="Type your full name"
                  value={data.signatures?.coApplicant?.name || ''}
                  onChange={(e) => handleSignatureChange('coApplicant', 'name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coSignatureDate">Date *</Label>
                <Input
                  id="coSignatureDate"
                  type="date"
                  value={data.signatures?.coApplicant?.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleSignatureChange('coApplicant', 'date', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Digital Signature *</Label>
              <SignaturePad
                onSignatureChange={(signature) => handleSignatureChange('coApplicant', 'signature', signature)}
              />
              <p className="text-xs text-gray-500 mt-1">Sign above using your mouse or touch screen</p>
            </div>
          </div>
        )}

        {/* Guarantor Signature (conditional) */}
        {data.hasGuarantor && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Guarantor Signature</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label htmlFor="guarantorSignatureName">Full Name *</Label>
                <Input
                  id="guarantorSignatureName"
                  placeholder="Type your full name"
                  value={data.signatures?.guarantor?.name || ''}
                  onChange={(e) => handleSignatureChange('guarantor', 'name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guarantorSignatureDate">Date *</Label>
                <Input
                  id="guarantorSignatureDate"
                  type="date"
                  value={data.signatures?.guarantor?.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleSignatureChange('guarantor', 'date', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Digital Signature *</Label>
              <SignaturePad
                onSignatureChange={(signature) => handleSignatureChange('guarantor', 'signature', signature)}
              />
              <p className="text-xs text-gray-500 mt-1">Sign above using your mouse or touch screen</p>
            </div>
          </div>
        )}
      </div>

      {/* Final Confirmation */}
      <div className="mt-8">
        <div className="flex items-start">
          <Checkbox id="finalConfirmation" required />
          <div className="ml-3">
            <Label htmlFor="finalConfirmation" className="text-sm font-medium text-gray-900">
              I confirm that all information provided is true and accurate
            </Label>
            <div className="text-sm text-gray-600">
              I understand that providing false information may result in application rejection and acknowledge that I have read and agree to all terms and conditions.
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
