import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(words, {
  typeSpeed = 90,
  deleteSpeed = 50,
  pauseDelay = 2200,
} = {}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing
      const next = currentWord.slice(0, text.length + 1);
      setText(next);

      if (next === currentWord) {
        // Finished typing — pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseDelay);
        return;
      }
    } else {
      // Deleting
      const next = currentWord.slice(0, text.length - 1);
      setText(next);

      if (next === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, isDeleting, wordIndex, words, pauseDelay]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    // Add slight randomness for natural feel
    const jitter = Math.random() * 40 - 20;
    const timeout = setTimeout(tick, speed + jitter);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return { text, wordIndex, isDeleting };
}
