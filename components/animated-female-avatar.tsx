import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { SecurityAlert } from '@/lib/cyber-content';

interface AnimatedFemaleAvatarProps {
  alert?: SecurityAlert;
  onAlertDismiss?: () => void;
}

export function AnimatedFemaleAvatar({ alert, onAlertDismiss }: AnimatedFemaleAvatarProps) {
  const [isWinking, setIsWinking] = useState(false);
  const [showShield, setShowShield] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      // Trigger wink animation
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 600);

      // Show shield animation
      setTimeout(() => setShowShield(true), 300);

      // Show alert popup
      setTimeout(() => setShowAlert(true), 800);
    }
  }, [alert]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50 dark:bg-red-950/20';
      case 'high':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-950/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  return (
    <div className="relative">
      {/* Avatar with pink and blue glowing background */}
      <div className="relative w-20 h-20 mx-auto">
        {/* Glowing background effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 animate-pulse opacity-30 blur-md"></div>
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 animate-pulse opacity-50 blur-sm"></div>

        {/* Avatar face */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center shadow-xl border-2 border-pink-300">
          {/* Pink hair effect */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-full opacity-80"></div>
          <div className="absolute -top-1 left-1/4 w-3 h-6 bg-pink-400 rounded-full opacity-60 transform rotate-12"></div>
          <div className="absolute -top-1 right-1/4 w-3 h-6 bg-pink-400 rounded-full opacity-60 transform -rotate-12"></div>

          {/* Face features */}
          <div className="relative">
            {/* Eyes */}
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-2.5 h-2.5 bg-white rounded-full transition-all duration-300 ${
                isWinking ? 'scale-y-0 transform rotate-45' : 'scale-y-100'
              }`} />
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>

            {/* Nose */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full opacity-60"></div>

            {/* Mouth - smiling */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-2 border-b-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Animated Shield */}
        {showShield && (
          <div className={`absolute -top-3 -right-3 transition-all duration-700 ${
            showShield ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
          }`}>
            <div className="relative">
              <Shield className="w-10 h-10 text-green-500 drop-shadow-lg animate-bounce" />
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30 scale-150" />
              <div className="absolute inset-1 bg-green-300 rounded-full animate-pulse opacity-40" />
            </div>
          </div>
        )}
      </div>

      {/* Alert Popup */}
      {alert && showAlert && (
        <div className={`absolute top-24 left-1/2 transform -translate-x-1/2 w-96 max-w-sm p-4 rounded-xl border-2 shadow-2xl transition-all duration-700 z-50 ${
          getSeverityColor(alert.severity)
        } ${showAlert ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-8'}`}>

          {/* Alert content */}
          <div className="flex items-start space-x-3">
            {getSeverityIcon(alert.severity)}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">{alert.title}</h3>
                <button
                  onClick={() => {
                    setShowAlert(false);
                    setShowShield(false);
                    onAlertDismiss?.();
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{alert.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Source: {alert.source}</span>
                {alert.trending && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full animate-pulse font-medium">
                    ⚡ Trending
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Alert arrow pointing to avatar */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className={`w-6 h-6 rotate-45 border-l-2 border-t-2 ${
              alert.severity === 'critical' ? 'bg-red-50 border-red-500 dark:bg-red-950/20' :
              alert.severity === 'high' ? 'bg-orange-50 border-orange-500 dark:bg-orange-950/20' :
              alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-950/20' :
              'bg-blue-50 border-blue-500 dark:bg-blue-950/20'
            }`} />
          </div>
        </div>
      )}
    </div>
  );
}
