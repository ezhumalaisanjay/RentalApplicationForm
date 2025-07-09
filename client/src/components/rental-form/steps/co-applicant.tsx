import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CoApplicantProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function CoApplicant({ data, onUpdate }: CoApplicantProps) {
  const handleHasCoApplicantChange = (checked: boolean) => {
    onUpdate({ 
      hasCoApplicant: checked,
      coApplicant: checked ? data.coApplicant || {} : undefined
    });
  };

  const handleSameAddressChange = (checked: boolean) => {
    onUpdate({ coApplicantSameAddress: checked });
  };

  const handleInputChange = (field: string, value: string) => {
    onUpdate({
      coApplicant: {
        ...data.coApplicant,
        [field]: value
      }
    });
  };

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Co-Applicant Information</h2>
      
      {/* Co-Applicant Checkbox */}
      <div className="mb-6">
        <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Checkbox
            id="hasCoApplicant"
            checked={data.hasCoApplicant}
            onCheckedChange={handleHasCoApplicantChange}
          />
          <div className="ml-3">
            <Label htmlFor="hasCoApplicant" className="text-sm font-medium text-gray-900 cursor-pointer">
              Add Co-Applicant
            </Label>
            <div className="text-sm text-gray-600">
              Check this box if you have a co-applicant for this rental application
            </div>
          </div>
        </div>
      </div>

      {data.hasCoApplicant && (
        <>
          {/* Same Address Checkbox */}
          <div className="mb-6">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                id="coApplicantSameAddress"
                checked={data.coApplicantSameAddress}
                onCheckedChange={handleSameAddressChange}
              />
              <div className="ml-3">
                <Label htmlFor="coApplicantSameAddress" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Address & Landlord same as primary applicant
                </Label>
                <div className="text-sm text-gray-600">
                  Check if the co-applicant has the same current address and landlord
                </div>
              </div>
            </div>
          </div>

          {/* Co-Applicant Form */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Co-Applicant Details</h3>
            
            <div className="mb-4">
              <Label htmlFor="relationship">Relationship to Primary Applicant *</Label>
              <Select 
                value={data.coApplicant?.relationship || ''} 
                onValueChange={(value) => handleInputChange('relationship', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="roommate">Roommate</SelectItem>
                  <SelectItem value="family">Family Member</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="coApplicantName">Full Name *</Label>
                <Input
                  id="coApplicantName"
                  placeholder="Enter full name"
                  value={data.coApplicant?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coApplicantSex">Sex *</Label>
                <Select 
                  value={data.coApplicant?.sex || ''} 
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
                <Label htmlFor="coApplicantSSN">Social Security Number *</Label>
                <Input
                  id="coApplicantSSN"
                  placeholder="XXX-XX-XXXX"
                  value={data.coApplicant?.ssn || ''}
                  onChange={(e) => handleInputChange('ssn', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coApplicantDOB">Date of Birth *</Label>
                <Input
                  id="coApplicantDOB"
                  type="date"
                  value={data.coApplicant?.dateOfBirth || ''}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="coApplicantEmail">Email Address *</Label>
              <Input
                id="coApplicantEmail"
                type="email"
                placeholder="example@email.com"
                value={data.coApplicant?.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="coApplicantHomePhone">Home Phone</Label>
                <Input
                  id="coApplicantHomePhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  value={data.coApplicant?.homePhone || ''}
                  onChange={(e) => handleInputChange('homePhone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coApplicantCellPhone">Cell Phone *</Label>
                <Input
                  id="coApplicantCellPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  value={data.coApplicant?.cellPhone || ''}
                  onChange={(e) => handleInputChange('cellPhone', e.target.value)}
                  required
                />
              </div>
            </div>

            {!data.coApplicantSameAddress && (
              <div className="mt-6 text-sm text-gray-600 italic border-t pt-4">
                Note: Additional address and landlord information fields would be shown here if different from primary applicant.
              </div>
            )}
          </div>
        </>
      )}
    </CardContent>
  );
}
