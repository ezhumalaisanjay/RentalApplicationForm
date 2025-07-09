import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload, X } from "lucide-react";

interface FileUploadProps {
  title: string;
  description: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}

export default function FileUpload({ 
  title, 
  description, 
  accept = ".pdf,.jpg,.jpeg,.png", 
  multiple = false,
  onFilesSelected 
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <CloudUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button 
          type="button" 
          variant="default"
          size="sm"
          className="mt-2"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
        >
          Choose {multiple ? 'Files' : 'File'}
        </Button>
      </div>

      {/* Selected Files Display */}
      {selectedFiles.length > 0 && (
        <div className="mt-3 space-y-2">
          {selectedFiles.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
            >
              <span className="truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
