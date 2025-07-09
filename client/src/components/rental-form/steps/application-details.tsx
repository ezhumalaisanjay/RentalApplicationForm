import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ApplicationDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function ApplicationDetails({ data, onUpdate }: ApplicationDetailsProps) {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleHearAboutChange = (value: string) => {
    onUpdate({ 
      hearAbout: value,
      brokerName: value !== 'broker' ? '' : data.brokerName,
      brokerPhone: value !== 'broker' ? '' : data.brokerPhone
    });
  };

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="applicationDate">Today's Date *</Label>
          <Input
            id="applicationDate"
            type="date"
            value={data.applicationDate}
            onChange={(e) => handleInputChange('applicationDate', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="moveInDate">Desired Move-in Date *</Label>
          <Input
            id="moveInDate"
            type="date"
            value={data.moveInDate}
            onChange={(e) => handleInputChange('moveInDate', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="buildingAddress">Building Address *</Label>
          <Input
            id="buildingAddress"
            placeholder="Enter building address"
            value={data.buildingAddress}
            onChange={(e) => handleInputChange('buildingAddress', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="apartmentNumber">Apartment Number *</Label>
          <Input
            id="apartmentNumber"
            placeholder="Apt #"
            value={data.apartmentNumber}
            onChange={(e) => handleInputChange('apartmentNumber', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="monthlyRent">Monthly Rent *</Label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <Input
              id="monthlyRent"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.monthlyRent}
              onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="apartmentType">Apartment Type *</Label>
          <Select value={data.apartmentType} onValueChange={(value) => handleInputChange('apartmentType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select apartment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1bedroom">1 Bedroom</SelectItem>
              <SelectItem value="2bedroom">2 Bedroom</SelectItem>
              <SelectItem value="3bedroom">3 Bedroom</SelectItem>
              <SelectItem value="4bedroom">4 Bedroom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">How did you hear about us?</Label>
        <RadioGroup value={data.hearAbout} onValueChange={handleHearAboutChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="building-sign" id="building-sign" />
            <Label htmlFor="building-sign">Building Sign</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="craigslist" id="craigslist" />
            <Label htmlFor="craigslist">Craigslist</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="broker" id="broker" />
            <Label htmlFor="broker">Broker</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      {data.hearAbout === 'broker' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="brokerName">Broker Name</Label>
            <Input
              id="brokerName"
              placeholder="Enter broker name"
              value={data.brokerName || ''}
              onChange={(e) => handleInputChange('brokerName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="brokerPhone">Broker Phone</Label>
            <Input
              id="brokerPhone"
              type="tel"
              placeholder="(000) 000-0000"
              value={data.brokerPhone || ''}
              onChange={(e) => handleInputChange('brokerPhone', e.target.value)}
            />
          </div>
        </div>
      )}
    </CardContent>
  );
}
