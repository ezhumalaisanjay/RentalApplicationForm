import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface PrimaryApplicantProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function PrimaryApplicant({ data, onUpdate }: PrimaryApplicantProps) {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({
      primaryApplicant: {
        ...data.primaryApplicant,
        [field]: value
      }
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    onUpdate({
      primaryApplicant: {
        ...data.primaryApplicant,
        currentAddress: {
          ...data.primaryApplicant?.currentAddress,
          [field]: value
        }
      }
    });
  };

  const handleLandlordChange = (field: string, value: string) => {
    onUpdate({
      primaryApplicant: {
        ...data.primaryApplicant,
        landlord: {
          ...data.primaryApplicant?.landlord,
          [field]: value
        }
      }
    });
  };

  const handleLengthChange = (field: string, value: string) => {
    onUpdate({
      primaryApplicant: {
        ...data.primaryApplicant,
        lengthAtAddress: {
          ...data.primaryApplicant?.lengthAtAddress,
          [field]: parseInt(value) || 0
        }
      }
    });
  };

  const applicant = data.primaryApplicant || {};
  const address = applicant.currentAddress || {};
  const landlord = applicant.landlord || {};
  const length = applicant.lengthAtAddress || {};

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Primary Applicant Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter full name"
            value={applicant.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="sex">Sex *</Label>
          <Select value={applicant.sex || ''} onValueChange={(value) => handleInputChange('sex', value)}>
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
          <Label htmlFor="ssn">Social Security Number *</Label>
          <Input
            id="ssn"
            placeholder="XXX-XX-XXXX"
            value={applicant.ssn || ''}
            onChange={(e) => handleInputChange('ssn', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={applicant.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={applicant.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="homePhone">Home Phone</Label>
          <Input
            id="homePhone"
            type="tel"
            placeholder="(000) 000-0000"
            value={applicant.homePhone || ''}
            onChange={(e) => handleInputChange('homePhone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cellPhone">Cell Phone *</Label>
          <Input
            id="cellPhone"
            type="tel"
            placeholder="(000) 000-0000"
            value={applicant.cellPhone || ''}
            onChange={(e) => handleInputChange('cellPhone', e.target.value)}
            required
          />
        </div>
      </div>

      <Separator className="my-6" />
      
      {/* Current Address Section */}
      <h3 className="text-lg font-medium text-gray-900 mb-4">Current Address</h3>
      
      <div className="mb-4">
        <Label htmlFor="street">Street Address *</Label>
        <Input
          id="street"
          placeholder="Enter current address"
          value={address.street || ''}
          onChange={(e) => handleAddressChange('street', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="City"
            value={address.city || ''}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            placeholder="State"
            value={address.state || ''}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="zip">ZIP Code *</Label>
          <Input
            id="zip"
            placeholder="ZIP"
            value={address.zip || ''}
            onChange={(e) => handleAddressChange('zip', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="licenseNumber">Driver's License Number</Label>
          <Input
            id="licenseNumber"
            placeholder="License number"
            value={applicant.licenseNumber || ''}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="licenseState">License State</Label>
          <Input
            id="licenseState"
            placeholder="State"
            value={applicant.licenseState || ''}
            onChange={(e) => handleInputChange('licenseState', e.target.value)}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Current Landlord Section */}
      <h3 className="text-lg font-medium text-gray-900 mb-4">Current Landlord</h3>
      
      <div className="mb-4">
        <Label htmlFor="landlordName">Landlord Name</Label>
        <Input
          id="landlordName"
          placeholder="Enter landlord name"
          value={landlord.name || ''}
          onChange={(e) => handleLandlordChange('name', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="landlordAddress">Landlord Address</Label>
        <Textarea
          id="landlordAddress"
          placeholder="Enter landlord address"
          rows={2}
          value={landlord.address || ''}
          onChange={(e) => handleLandlordChange('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="years">Years at Address</Label>
          <Input
            id="years"
            type="number"
            placeholder="0"
            min="0"
            value={length.years || ''}
            onChange={(e) => handleLengthChange('years', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="months">Months at Address</Label>
          <Input
            id="months"
            type="number"
            placeholder="0"
            min="0"
            max="11"
            value={length.months || ''}
            onChange={(e) => handleLengthChange('months', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="currentRent">Monthly Rent</Label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <Input
              id="currentRent"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={applicant.currentRent || ''}
              onChange={(e) => handleInputChange('currentRent', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="reasonForMoving">Reason for Moving</Label>
        <Textarea
          id="reasonForMoving"
          placeholder="Please explain why you are moving"
          rows={3}
          value={applicant.reasonForMoving || ''}
          onChange={(e) => handleInputChange('reasonForMoving', e.target.value)}
        />
      </div>
    </CardContent>
  );
}
