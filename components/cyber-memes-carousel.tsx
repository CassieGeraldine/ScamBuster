import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Smile, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDailyMemes, CyberMeme } from '@/lib/cyber-content';

interface CyberMemesCarouselProps {
  language: 'en' | 'zu' | 'xh';
}

export function CyberMemesCarousel({ language }: CyberMemesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memes, setMemes] = useState<CyberMeme[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const dailyMemes = getDailyMemes(language);
    setMemes(dailyMemes);
    setCurrentIndex(0);
  }, [language]);

  const nextMeme = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % memes.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevMeme = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToMeme = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const refreshMemes = () => {
    const shuffled = [...memes].sort(() => Math.random() - 0.5);
    setMemes(shuffled);
    setCurrentIndex(0);
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

  const getFunnyFactorEmojis = (factor: number) => {
    return '😂'.repeat(factor);
  };

  if (memes.length === 0) return null;

  const currentMeme = memes[currentIndex];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Smile className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-lg">
            {language === 'zu' ? 'Ama-Meme Okuphepha' :
             language === 'xh' ? 'Ii-Meme Zokhuseleko' :
             'Cyber Security Memes'}
          </h3>
        </div>
        <Button
          onClick={refreshMemes}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span>
            {language === 'zu' ? 'Vuselela' :
             language === 'xh' ? 'Vuselela' :
             'Shuffle'}
          </span>
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <Card className="border-2 border-dashed border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800">
          <CardContent className="p-6">
            {/* Navigation Arrows */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                onClick={prevMeme}
                variant="outline"
                size="sm"
                className="rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                disabled={isAnimating}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                onClick={nextMeme}
                variant="outline"
                size="sm"
                className="rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                disabled={isAnimating}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Meme Content */}
            <div className={`transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <div className="text-center space-y-4">
                {/* Category and Funny Factor */}
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Badge className={getCategoryColor(currentMeme.category)}>
                    {currentMeme.category}
                  </Badge>
                  <span className="text-lg">{getFunnyFactorEmojis(currentMeme.funnyFactor)}</span>
                </div>

                {/* Meme Text */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 shadow-sm">
                  <div className="text-lg font-medium whitespace-pre-line leading-relaxed">
                    {currentMeme.text}
                  </div>
                </div>

                {/* Meme Description */}
                <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {currentMeme.description}
                </div>

                {/* Fun indicator */}
                <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                  {language === 'zu' ? '🎭 Kujabulisa futhi kufundisa!' :
                   language === 'xh' ? '🎭 Kuyajabulisa kwaye kufundisa!' :
                   '🎭 Fun & Educational!'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {memes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMeme(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-yellow-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-yellow-300 dark:hover:bg-yellow-700'
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>

        {/* Meme Counter */}
        <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {memes.length}
        </div>
      </div>
    </div>
  );
}
