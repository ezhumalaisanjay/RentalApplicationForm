import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FinancialInfoProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function FinancialInfo({ data, onUpdate }: FinancialInfoProps) {
  const handlePrimaryFinancialChange = (field: string, value: string) => {
    onUpdate({
      financialInfo: {
        ...data.financialInfo,
        primaryApplicant: {
          ...data.financialInfo?.primaryApplicant,
          [field]: value
        }
      }
    });
  };

  const handleBankInfoChange = (applicantType: string, bankType: string, field: string, value: string) => {
    onUpdate({
      financialInfo: {
        ...data.financialInfo,
        [applicantType]: {
          ...data.financialInfo?.[applicantType],
          [bankType]: {
            ...data.financialInfo?.[applicantType]?.[bankType],
            [field]: value
          }
        }
      }
    });
  };

  const primaryFinancial = data.financialInfo?.primaryApplicant || {};
  const checking = primaryFinancial.checking || {};
  const savings = primaryFinancial.savings || {};
  const investment = primaryFinancial.investment || {};

  return (
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Information</h2>
      
      {/* Primary Applicant Financial */}
      <div className="border-b pb-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Applicant Financial Information</h3>
        
        {/* Employment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="employer">Current Employer *</Label>
            <Input
              id="employer"
              placeholder="Company name"
              value={primaryFinancial.employer || ''}
              onChange={(e) => handlePrimaryFinancialChange('employer', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="position">Current Position *</Label>
            <Input
              id="position"
              placeholder="Job title"
              value={primaryFinancial.position || ''}
              onChange={(e) => handlePrimaryFinancialChange('position', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="employerAddress">Employer Address *</Label>
          <Input
            id="employerAddress"
            placeholder="Employer address"
            value={primaryFinancial.employerAddress || ''}
            onChange={(e) => handlePrimaryFinancialChange('employerAddress', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="employedSince">Employed Since *</Label>
            <Input
              id="employedSince"
              type="date"
              value={primaryFinancial.employedSince || ''}
              onChange={(e) => handlePrimaryFinancialChange('employedSince', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="supervisor">Supervisor</Label>
            <Input
              id="supervisor"
              placeholder="Supervisor name"
              value={primaryFinancial.supervisor || ''}
              onChange={(e) => handlePrimaryFinancialChange('supervisor', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="income">Employment Income *</Label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <Input
                id="income"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={primaryFinancial.income || ''}
                onChange={(e) => handlePrimaryFinancialChange('income', e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="incomeFrequency">Income Frequency *</Label>
            <Select 
              value={primaryFinancial.incomeFrequency || ''} 
              onValueChange={(value) => handlePrimaryFinancialChange('incomeFrequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="supervisorPhone">Supervisor Phone</Label>
            <Input
              id="supervisorPhone"
              type="tel"
              placeholder="(000) 000-0000"
              value={primaryFinancial.supervisorPhone || ''}
              onChange={(e) => handlePrimaryFinancialChange('supervisorPhone', e.target.value)}
            />
          </div>
        </div>

        {/* Other Income */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="otherIncomeAmount">Other Income Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <Input
                id="otherIncomeAmount"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={primaryFinancial.otherIncomeAmount || ''}
                onChange={(e) => handlePrimaryFinancialChange('otherIncomeAmount', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="otherIncomePer">Per</Label>
            <Select 
              value={primaryFinancial.otherIncomePer || ''} 
              onValueChange={(value) => handlePrimaryFinancialChange('otherIncomePer', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="otherIncomeSource">Source</Label>
            <Input
              id="otherIncomeSource"
              placeholder="Income source"
              value={primaryFinancial.otherIncomeSource || ''}
              onChange={(e) => handlePrimaryFinancialChange('otherIncomeSource', e.target.value)}
            />
          </div>
        </div>

        {/* Financial Institution Information */}
        <h4 className="text-base font-medium text-gray-900 mb-4">Financial Institution Information</h4>
        
        {/* Checking Account */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Checking Account</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="checkingBank">Bank Name</Label>
              <Input
                id="checkingBank"
                placeholder="Bank name"
                className="text-sm"
                value={checking.bank || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'checking', 'bank', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="checkingAddress">Bank Address</Label>
              <Input
                id="checkingAddress"
                placeholder="Bank address"
                className="text-sm"
                value={checking.address || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'checking', 'address', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="checkingPhone">Phone Number</Label>
              <Input
                id="checkingPhone"
                type="tel"
                placeholder="(000) 000-0000"
                className="text-sm"
                value={checking.phone || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'checking', 'phone', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Savings Account */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Savings Account</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="savingsBank">Bank Name</Label>
              <Input
                id="savingsBank"
                placeholder="Bank name"
                className="text-sm"
                value={savings.bank || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'savings', 'bank', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="savingsAddress">Bank Address</Label>
              <Input
                id="savingsAddress"
                placeholder="Bank address"
                className="text-sm"
                value={savings.address || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'savings', 'address', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="savingsPhone">Phone Number</Label>
              <Input
                id="savingsPhone"
                type="tel"
                placeholder="(000) 000-0000"
                className="text-sm"
                value={savings.phone || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'savings', 'phone', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Investment Account */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Investment Account</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="investmentInstitution">Institution Name</Label>
              <Input
                id="investmentInstitution"
                placeholder="Institution name"
                className="text-sm"
                value={investment.institution || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'investment', 'institution', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="investmentAddress">Institution Address</Label>
              <Input
                id="investmentAddress"
                placeholder="Institution address"
                className="text-sm"
                value={investment.address || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'investment', 'address', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="investmentPhone">Phone Number</Label>
              <Input
                id="investmentPhone"
                type="tel"
                placeholder="(000) 000-0000"
                className="text-sm"
                value={investment.phone || ''}
                onChange={(e) => handleBankInfoChange('primaryApplicant', 'investment', 'phone', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Co-Applicant Financial (conditional) */}
      {data.hasCoApplicant && (
        <div className="border-b pb-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Co-Applicant Financial Information</h3>
          <div className="text-sm text-gray-600 italic">
            Co-applicant financial information follows the same structure as primary applicant...
          </div>
        </div>
      )}

      {/* Guarantor Financial (conditional) */}
      {data.hasGuarantor && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Guarantor Financial Information</h3>
          <div className="text-sm text-gray-600 italic">
            Guarantor financial information follows the same structure as primary applicant...
          </div>
        </div>
      )}
    </CardContent>
  );
}
