'use client';

import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', Icon: CheckCircle, iconColor: 'text-green-500' },
    error: { bg: 'bg-red-50 border-red-200', text: 'text-red-800', Icon: AlertCircle, iconColor: 'text-red-500' },
    info: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', Icon: AlertCircle, iconColor: 'text-blue-500' },
  };

  const { bg, text, Icon, iconColor } = styles[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
      <div className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg max-w-sm ${bg}`}>
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
        <p className={`text-sm font-medium ${text}`}>{message}</p>
        <button
          onClick={onClose}
          className={`ml-auto shrink-0 rounded p-0.5 hover:bg-black/5 ${text}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
