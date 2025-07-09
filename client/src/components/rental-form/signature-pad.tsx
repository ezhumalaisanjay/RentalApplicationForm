import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SignaturePadProps {
  onSignatureChange: (signature: string) => void;
}

export default function SignaturePad({ onSignatureChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set drawing properties
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setContext(ctx);
  }, []);

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDrawing(true);

    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing || !context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Convert canvas to base64 and notify parent
    const canvas = canvasRef.current;
    if (canvas) {
      const signature = canvas.toDataURL();
      onSignatureChange(signature);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange('');
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-32 border-2 border-gray-300 rounded-lg bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={clearSignature}
        className="absolute top-2 right-2 text-xs text-gray-500 hover:text-gray-700"
      >
        Clear
      </Button>
    </div>
  );
}
