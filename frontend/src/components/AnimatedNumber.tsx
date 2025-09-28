import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

export const AnimatedNumber = ({ value, duration = 2000, className = '' }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Extract numeric value and suffix
    const numericMatch = value.match(/(\d+(?:,\d+)*(?:\.\d+)?)/);
    const suffix = value.replace(/\d+(?:,\d+)*(?:\.\d+)?/, '').trim();
    
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const numericValue = parseFloat(numericMatch[1].replace(/,/g, ''));
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * easeOutCubic;
      
      // Format the number with commas
      const formattedValue = Math.floor(currentValue).toLocaleString();
      setDisplayValue(formattedValue + (suffix ? ` ${suffix}` : ''));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start animation when component becomes visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`animated-number-${value}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [value, duration, isVisible]);

  return (
    <span 
      id={`animated-number-${value}`}
      className={`font-bold ${className}`}
    >
      {displayValue}
    </span>
  );
};
