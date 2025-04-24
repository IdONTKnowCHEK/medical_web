import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { TypewriterProps } from '../types/types';


export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState<string>(''); // Holds the progressively revealed text
  const [index, setIndex] = useState<number>(0); // Tracks the current character index

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [index, text, speed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

