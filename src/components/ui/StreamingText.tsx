import { useState, useEffect } from 'react';

interface StreamingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function StreamingText({ 
  text, 
  delay = 0, 
  speed = 30, 
  className = '',
  onComplete 
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || currentIndex >= text.length) {
      if (currentIndex >= text.length && onComplete) {
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, started, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {started && currentIndex < text.length && (
        <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-pulse" />
      )}
    </span>
  );
}
