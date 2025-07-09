import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "./progress-bar";
import ApplicationDetails from "./steps/application-details";
import PrimaryApplicant from "./steps/primary-applicant";
import CoApplicant from "./steps/co-applicant";
import Guarantor from "./steps/guarantor";
import FinancialInfo from "./steps/financial-info";
import LegalQuestions from "./steps/legal-questions";
import ReviewSubmit from "./steps/review-submit";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Application Details
  applicationDate: string;
  buildingAddress: string;
  apartmentNumber: string;
  monthlyRent: string;
  apartmentType: string;
  moveInDate: string;
  hearAbout: string;
  brokerName?: string;
  brokerPhone?: string;
  
  // Conditionals
  hasCoApplicant: boolean;
  coApplicantSameAddress: boolean;
  hasGuarantor: boolean;
  
  // Applicant data
  primaryApplicant: any;
  coApplicant?: any;
  guarantor?: any;
  
  // Financial and other data
  financialInfo: any;
  legalQuestions: any;
  documents: any;
  signatures: any;
}

const STEP_NAMES = [
  "Application Details",
  "Primary Applicant", 
  "Co-Applicant",
  "Guarantor",
  "Financial Information",
  "Legal Questions",
  "Review & Submit"
];

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    applicationDate: new Date().toISOString().split('T')[0],
    buildingAddress: "",
    apartmentNumber: "",
    monthlyRent: "",
    apartmentType: "",
    moveInDate: "",
    hearAbout: "",
    hasCoApplicant: false,
    coApplicantSameAddress: false,
    hasGuarantor: false,
    primaryApplicant: {},
    financialInfo: {},
    legalQuestions: {},
    documents: {},
    signatures: {}
  });
  
  const { toast } = useToast();
  const totalSteps = 7;

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSaveProgress = () => {
    // Save to localStorage
    localStorage.setItem('rentalApplicationProgress', JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "Your application progress has been saved locally.",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ApplicationDetails data={formData} onUpdate={updateFormData} />;
      case 2:
        return <PrimaryApplicant data={formData} onUpdate={updateFormData} />;
      case 3:
        return <CoApplicant data={formData} onUpdate={updateFormData} />;
      case 4:
        return <Guarantor data={formData} onUpdate={updateFormData} />;
      case 5:
        return <FinancialInfo data={formData} onUpdate={updateFormData} />;
      case 6:
        return <LegalQuestions data={formData} onUpdate={updateFormData} />;
      case 7:
        return <ReviewSubmit data={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Liberty Place Rental Application
            </h1>
            <p className="text-sm text-gray-600">
              122 East 42nd Street, Suite 1903, New York, NY 10168
            </p>
            <p className="text-sm text-gray-600">
              Tel: (646) 545-6700 | Leasing Direct Line: (646) 545-6700
            </p>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          stepName={STEP_NAMES[currentStep - 1]} 
        />

        {/* Main Form */}
        <Card>
          {renderCurrentStep()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSaveProgress}>
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
