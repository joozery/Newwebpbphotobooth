import React, { useEffect } from 'react';
import { 
  HiCheckCircle, 
  HiXCircle, 
  HiInformationCircle, 
  HiExclamation 
} from 'react-icons/hi';

const Notification = ({ 
  type = 'success', 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <HiXCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <HiExclamation className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <HiInformationCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <HiCheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-green-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center p-4 rounded-lg border shadow-lg max-w-sm ${getBgColor()}`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onClose}
            className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'success' ? 'focus:ring-green-500' :
              type === 'error' ? 'focus:ring-red-500' :
              type === 'warning' ? 'focus:ring-yellow-500' :
              'focus:ring-blue-500'
            }`}
          >
            <span className="sr-only">ปิด</span>
            <HiXCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification; 