import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatedFemaleAvatar } from './animated-female-avatar';
import { getDailyTip, getTrendingAlerts, DailyTip, SecurityAlert } from '@/lib/cyber-content';

interface DailyTipsAndAlertsProps {
  language: 'en' | 'zu' | 'xh';
  isExpanded: boolean;
  onToggle: () => void;
}

export function DailyTipsAndAlerts({ language, isExpanded, onToggle }: DailyTipsAndAlertsProps) {
  const [currentTip, setCurrentTip] = useState<DailyTip | null>(null);
  const [trendingAlerts, setTrendingAlerts] = useState<SecurityAlert[]>([]);
  const [currentAlert, setCurrentAlert] = useState<SecurityAlert | null>(null);
  const [alertIndex, setAlertIndex] = useState(0);

  // Load daily content based on language
  useEffect(() => {
    setCurrentTip(getDailyTip(language));
    const alerts = getTrendingAlerts(language);
    setTrendingAlerts(alerts);

    if (alerts.length > 0) {
      setCurrentAlert(alerts[0]);
      setAlertIndex(0);
    }
  }, [language]);

  // Cycle through alerts every 8 seconds
  useEffect(() => {
    if (trendingAlerts.length > 1 && isExpanded) {
      const interval = setInterval(() => {
        setAlertIndex((prev) => {
          const newIndex = (prev + 1) % trendingAlerts.length;
          setCurrentAlert(trendingAlerts[newIndex]);
          return newIndex;
        });
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [trendingAlerts, isExpanded]);

  const refreshContent = () => {
    setCurrentTip(getDailyTip(language));
    const alerts = getTrendingAlerts(language);
    setTrendingAlerts(alerts);
    setAlertIndex(0);
    if (alerts.length > 0) {
      setCurrentAlert(alerts[0]);
    }
  };

  const handleAlertDismiss = () => {
    setCurrentAlert(null);
    // Show next alert after a delay
    setTimeout(() => {
      if (trendingAlerts.length > 0) {
        const nextIndex = (alertIndex + 1) % trendingAlerts.length;
        setAlertIndex(nextIndex);
        setCurrentAlert(trendingAlerts[nextIndex]);
      }
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'phishing':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'passwords':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'social':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'mobile':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (!currentTip) return null;

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant="outline"
        className="w-full flex items-center justify-center space-x-2"
      >
        <span>
          {language === 'zu' ? 'Funda Kabanzi' :
           language === 'xh' ? 'Funda Ngakumbi' :
           'Learn More'}
        </span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
          {/* Animated Avatar with Alerts */}
          <div className="flex justify-center">
            <AnimatedFemaleAvatar
              alert={currentAlert}
              onAlertDismiss={handleAlertDismiss}
            />
          </div>

          {/* Daily Tip Card */}
          <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 rounded-bl-full opacity-30" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>
                    {language === 'zu' ? 'Ithiphu Yosuku' :
                     language === 'xh' ? 'Ithiphu Yosuku' :
                     'Daily Security Tip'}
                  </span>
                </div>
                <Badge className={getCategoryColor(currentTip.category)}>
                  {currentTip.category}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-300">{currentTip.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentTip.content}</p>
              </div>

              <Button
                onClick={refreshContent}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>
                  {language === 'zu' ? 'Thola Ithiphu Entsha' :
                   language === 'xh' ? 'Fumana Ithiphu Entsha' :
                   'Get New Tip'}
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Trending Alerts Summary */}
          {trendingAlerts.length > 0 && (
            <Card className="border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <span>
                      {language === 'zu' ? 'Izexwayiso Ezishisayo' :
                       language === 'xh' ? 'Izikhombisi Ezishushu' :
                       'Trending Security Alerts'}
                    </span>
                  </div>
                  <Badge variant="destructive" className="animate-pulse">
                    {trendingAlerts.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingAlerts.map((alert, index) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border transition-all duration-500 ${
                        index === alertIndex
                          ? 'bg-white dark:bg-gray-800 shadow-lg scale-105 border-orange-300 dark:border-orange-700'
                          : 'bg-gray-50 dark:bg-gray-900/50 opacity-70 hover:opacity-90 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span>{alert.title}</span>
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.severity}
                          </Badge>
                          {alert.trending && index === alertIndex && (
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse text-xs">
                              {language === 'zu' ? 'Kushisayo' :
                               language === 'xh' ? 'Kushushu' :
                               'Hot'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{alert.description}</p>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        <span className="font-medium">
                          {language === 'zu' ? 'Umthombo' :
                           language === 'xh' ? 'Umthombo' :
                           'Source'}: {alert.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alert Navigation */}
                <div className="flex justify-center mt-4 space-x-2">
                  {trendingAlerts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setAlertIndex(index);
                        setCurrentAlert(trendingAlerts[index]);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === alertIndex
                          ? 'bg-orange-500 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-orange-300 dark:hover:bg-orange-700'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
