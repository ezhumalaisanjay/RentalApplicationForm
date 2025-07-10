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

  const handleCoApplicantFinancialChange = (field: string, value: string) => {
    onUpdate({
      financialInfo: {
        ...data.financialInfo,
        coApplicant: {
          ...data.financialInfo?.coApplicant,
          [field]: value
        }
      }
    });
  };

  const handleGuarantorFinancialChange = (field: string, value: string) => {
    onUpdate({
      financialInfo: {
        ...data.financialInfo,
        guarantor: {
          ...data.financialInfo?.guarantor,
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
          
          {/* Employment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="coEmployer">Current Employer *</Label>
              <Input
                id="coEmployer"
                placeholder="Company name"
                value={data.financialInfo?.coApplicant?.employer || ''}
                onChange={(e) => handleCoApplicantFinancialChange('employer', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="coPosition">Current Position *</Label>
              <Input
                id="coPosition"
                placeholder="Job title"
                value={data.financialInfo?.coApplicant?.position || ''}
                onChange={(e) => handleCoApplicantFinancialChange('position', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="coEmployerAddress">Employer Address *</Label>
            <Input
              id="coEmployerAddress"
              placeholder="Employer address"
              value={data.financialInfo?.coApplicant?.employerAddress || ''}
              onChange={(e) => handleCoApplicantFinancialChange('employerAddress', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="coEmployedSince">Employed Since *</Label>
              <Input
                id="coEmployedSince"
                type="date"
                value={data.financialInfo?.coApplicant?.employedSince || ''}
                onChange={(e) => handleCoApplicantFinancialChange('employedSince', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="coSupervisor">Supervisor</Label>
              <Input
                id="coSupervisor"
                placeholder="Supervisor name"
                value={data.financialInfo?.coApplicant?.supervisor || ''}
                onChange={(e) => handleCoApplicantFinancialChange('supervisor', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="coIncome">Employment Income *</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <Input
                  id="coIncome"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={data.financialInfo?.coApplicant?.income || ''}
                  onChange={(e) => handleCoApplicantFinancialChange('income', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="coIncomeFrequency">Income Frequency *</Label>
              <Select 
                value={data.financialInfo?.coApplicant?.incomeFrequency || ''} 
                onValueChange={(value) => handleCoApplicantFinancialChange('incomeFrequency', value)}
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
              <Label htmlFor="coSupervisorPhone">Supervisor Phone</Label>
              <Input
                id="coSupervisorPhone"
                type="tel"
                placeholder="(000) 000-0000"
                value={data.financialInfo?.coApplicant?.supervisorPhone || ''}
                onChange={(e) => handleCoApplicantFinancialChange('supervisorPhone', e.target.value)}
              />
            </div>
          </div>

          {/* Other Income */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="coOtherIncomeAmount">Other Income Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <Input
                  id="coOtherIncomeAmount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={data.financialInfo?.coApplicant?.otherIncomeAmount || ''}
                  onChange={(e) => handleCoApplicantFinancialChange('otherIncomeAmount', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="coOtherIncomePer">Per</Label>
              <Select 
                value={data.financialInfo?.coApplicant?.otherIncomePer || ''} 
                onValueChange={(value) => handleCoApplicantFinancialChange('otherIncomePer', value)}
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
              <Label htmlFor="coOtherIncomeSource">Source</Label>
              <Input
                id="coOtherIncomeSource"
                placeholder="Income source"
                value={data.financialInfo?.coApplicant?.otherIncomeSource || ''}
                onChange={(e) => handleCoApplicantFinancialChange('otherIncomeSource', e.target.value)}
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
                <Label htmlFor="coCheckingBank">Bank Name</Label>
                <Input
                  id="coCheckingBank"
                  placeholder="Bank name"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.checking?.bank || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'checking', 'bank', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coCheckingAddress">Bank Address</Label>
                <Input
                  id="coCheckingAddress"
                  placeholder="Bank address"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.checking?.address || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'checking', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coCheckingPhone">Phone Number</Label>
                <Input
                  id="coCheckingPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.checking?.phone || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'checking', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Savings Account */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h5 className="text-sm font-medium text-gray-900 mb-3">Savings Account</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="coSavingsBank">Bank Name</Label>
                <Input
                  id="coSavingsBank"
                  placeholder="Bank name"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.savings?.bank || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'savings', 'bank', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coSavingsAddress">Bank Address</Label>
                <Input
                  id="coSavingsAddress"
                  placeholder="Bank address"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.savings?.address || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'savings', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coSavingsPhone">Phone Number</Label>
                <Input
                  id="coSavingsPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.savings?.phone || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'savings', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Investment Account */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-900 mb-3">Investment Account</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="coInvestmentInstitution">Institution Name</Label>
                <Input
                  id="coInvestmentInstitution"
                  placeholder="Institution name"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.investment?.institution || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'investment', 'institution', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coInvestmentAddress">Institution Address</Label>
                <Input
                  id="coInvestmentAddress"
                  placeholder="Institution address"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.investment?.address || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'investment', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coInvestmentPhone">Phone Number</Label>
                <Input
                  id="coInvestmentPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="text-sm"
                  value={data.financialInfo?.coApplicant?.investment?.phone || ''}
                  onChange={(e) => handleBankInfoChange('coApplicant', 'investment', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guarantor Financial (conditional) */}
      {data.hasGuarantor && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Guarantor Financial Information</h3>
          
          {/* Employment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="guarantorEmployer">Current Employer *</Label>
              <Input
                id="guarantorEmployer"
                placeholder="Company name"
                value={data.financialInfo?.guarantor?.employer || ''}
                onChange={(e) => handleGuarantorFinancialChange('employer', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="guarantorPosition">Current Position *</Label>
              <Input
                id="guarantorPosition"
                placeholder="Job title"
                value={data.financialInfo?.guarantor?.position || ''}
                onChange={(e) => handleGuarantorFinancialChange('position', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="guarantorEmployerAddress">Employer Address *</Label>
            <Input
              id="guarantorEmployerAddress"
              placeholder="Employer address"
              value={data.financialInfo?.guarantor?.employerAddress || ''}
              onChange={(e) => handleGuarantorFinancialChange('employerAddress', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="guarantorEmployedSince">Employed Since *</Label>
              <Input
                id="guarantorEmployedSince"
                type="date"
                value={data.financialInfo?.guarantor?.employedSince || ''}
                onChange={(e) => handleGuarantorFinancialChange('employedSince', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="guarantorSupervisor">Supervisor</Label>
              <Input
                id="guarantorSupervisor"
                placeholder="Supervisor name"
                value={data.financialInfo?.guarantor?.supervisor || ''}
                onChange={(e) => handleGuarantorFinancialChange('supervisor', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="guarantorIncome">Employment Income *</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <Input
                  id="guarantorIncome"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={data.financialInfo?.guarantor?.income || ''}
                  onChange={(e) => handleGuarantorFinancialChange('income', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="guarantorIncomeFrequency">Income Frequency *</Label>
              <Select 
                value={data.financialInfo?.guarantor?.incomeFrequency || ''} 
                onValueChange={(value) => handleGuarantorFinancialChange('incomeFrequency', value)}
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
              <Label htmlFor="guarantorSupervisorPhone">Supervisor Phone</Label>
              <Input
                id="guarantorSupervisorPhone"
                type="tel"
                placeholder="(000) 000-0000"
                value={data.financialInfo?.guarantor?.supervisorPhone || ''}
                onChange={(e) => handleGuarantorFinancialChange('supervisorPhone', e.target.value)}
              />
            </div>
          </div>

          {/* Other Income */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="guarantorOtherIncomeAmount">Other Income Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <Input
                  id="guarantorOtherIncomeAmount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={data.financialInfo?.guarantor?.otherIncomeAmount || ''}
                  onChange={(e) => handleGuarantorFinancialChange('otherIncomeAmount', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="guarantorOtherIncomePer">Per</Label>
              <Select 
                value={data.financialInfo?.guarantor?.otherIncomePer || ''} 
                onValueChange={(value) => handleGuarantorFinancialChange('otherIncomePer', value)}
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
              <Label htmlFor="guarantorOtherIncomeSource">Source</Label>
              <Input
                id="guarantorOtherIncomeSource"
                placeholder="Income source"
                value={data.financialInfo?.guarantor?.otherIncomeSource || ''}
                onChange={(e) => handleGuarantorFinancialChange('otherIncomeSource', e.target.value)}
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
                <Label htmlFor="guarantorCheckingBank">Bank Name</Label>
                <Input
                  id="guarantorCheckingBank"
                  placeholder="Bank name"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.checking?.bank || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'checking', 'bank', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guarantorCheckingAddress">Bank Address</Label>
                <Input
                  id="guarantorCheckingAddress"
                  placeholder="Bank address"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.checking?.address || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'checking', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guarantorCheckingPhone">Phone Number</Label>
                <Input
                  id="guarantorCheckingPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.checking?.phone || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'checking', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Savings Account */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h5 className="text-sm font-medium text-gray-900 mb-3">Savings Account</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="guarantorSavingsBank">Bank Name</Label>
                <Input
                  id="guarantorSavingsBank"
                  placeholder="Bank name"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.savings?.bank || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'savings', 'bank', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guarantorSavingsAddress">Bank Address</Label>
                <Input
                  id="guarantorSavingsAddress"
                  placeholder="Bank address"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.savings?.address || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'savings', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guarantorSavingsPhone">Phone Number</Label>
                <Input
                  id="guarantorSavingsPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.savings?.phone || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'savings', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Investment Account */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-900 mb-3">Investment Account</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="guarantorInvestmentInstitution">Institution Name</Label>
                <Input
                  id="guarantorInvestmentInstitution"
                  placeholder="Institution name"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.investment?.institution || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'investment', 'institution', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guarantorInvestmentAddress">Institution Address</Label>
                <Input
                  id="guarantorInvestmentAddress"
                  placeholder="Institution address"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.investment?.address || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'investment', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guarantorInvestmentPhone">Phone Number</Label>
                <Input
                  id="guarantorInvestmentPhone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="text-sm"
                  value={data.financialInfo?.guarantor?.investment?.phone || ''}
                  onChange={(e) => handleBankInfoChange('guarantor', 'investment', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
}
