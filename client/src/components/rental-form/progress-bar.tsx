import { Card, CardContent } from "@/components/ui/card";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

const STEP_LABELS = [
  "Application",
  "Primary Applicant", 
  "Co-Applicant",
  "Guarantor",
  "Financial",
  "Legal",
  "Submit"
];

export default function ProgressBar({ currentStep, totalSteps, stepName }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">{stepName}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          {STEP_LABELS.map((label, index) => (
            <span 
              key={label}
              className={`${index < currentStep ? 'text-primary' : ''}`}
            >
              {label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
