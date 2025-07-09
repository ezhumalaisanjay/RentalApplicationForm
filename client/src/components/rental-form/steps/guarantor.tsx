import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface GuarantorProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function Guarantor({ data, onUpdate }: GuarantorProps) {
  const handleHasGuarantorChange = (checked: boolean) => {
    onUpdate({ 
      hasGuarantor: checked,
      guarantor: checked ? data.guarantor || {} : undefined
    });
  };

  const handleInputChange = (field: string, value: string) => {
    onUpdate({
      guarantor: {
        ...data.guarantor,
        [field]: value
      }
    });
  };

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Guarantor Information</h2>
      
      {/* Guarantor Checkbox */}
      <div className="mb-6">
        <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Checkbox
            id="hasGuarantor"
            checked={data.hasGuarantor}
            onCheckedChange={handleHasGuarantorChange}
          />
          <div className="ml-3">
            <Label htmlFor="hasGuarantor" className="text-sm font-medium text-gray-900 cursor-pointer">
              Add Guarantor
            </Label>
            <div className="text-sm text-gray-600">
              Check this box if you need a guarantor for this rental application
            </div>
          </div>
        </div>
      </div>

      {/* Income Requirement Notice */}
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <h3 className="text-sm font-medium text-blue-800 mb-2">Income Requirements</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
            <li>Applicants must show income of 40 TIMES the monthly rent</li>
            <li>Guarantors must show income of 80 TIMES the monthly rent</li>
            <li>Guarantor income may NOT be combined with applicant income</li>
          </ul>
        </AlertDescription>
      </Alert>

      {data.hasGuarantor && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Guarantor Details</h3>
          
          <div className="mb-4">
            <Label htmlFor="guarantorRelationship">Relationship to Applicant(s) *</Label>
            <Select 
              value={data.guarantor?.relationship || ''} 
              onValueChange={(value) => handleInputChange('relationship', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="family">Family Member</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <Label htmlFor="guarantorName">Full Name *</Label>
              <Input
                id="guarantorName"
                placeholder="Enter full name"
                value={data.guarantor?.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="guarantorSex">Sex *</Label>
              <Select 
                value={data.guarantor?.sex || ''} 
                onValueChange={(value) => handleInputChange('sex', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="guarantorSSN">Social Security Number *</Label>
              <Input
                id="guarantorSSN"
                placeholder="XXX-XX-XXXX"
                value={data.guarantor?.ssn || ''}
                onChange={(e) => handleInputChange('ssn', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="guarantorDOB">Date of Birth *</Label>
              <Input
                id="guarantorDOB"
                type="date"
                value={data.guarantor?.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="guarantorEmail">Email Address *</Label>
            <Input
              id="guarantorEmail"
              type="email"
              placeholder="example@email.com"
              value={data.guarantor?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="guarantorHomePhone">Home Phone</Label>
              <Input
                id="guarantorHomePhone"
                type="tel"
                placeholder="(000) 000-0000"
                value={data.guarantor?.homePhone || ''}
                onChange={(e) => handleInputChange('homePhone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="guarantorCellPhone">Cell Phone *</Label>
              <Input
                id="guarantorCellPhone"
                type="tel"
                placeholder="(000) 000-0000"
                value={data.guarantor?.cellPhone || ''}
                onChange={(e) => handleInputChange('cellPhone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600 italic border-t pt-4">
            Note: Additional address and landlord information fields would be shown here for the guarantor.
          </div>
        </div>
      )}
    </CardContent>
  );
}
