// use-toast.ts
import { useState, useCallback } from "react";

// Тут можемо зробити простий хук useToast
export const useToast = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const addToast = useCallback((msg: string) => {
    setMessages(prev => [...prev, msg]);
    // Тут можна додати автоматичне зникнення після 3 сек
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m !== msg));
    }, 3000);
  }, []);

  return { messages, addToast };
};

// Простий глобальний toast
export const toast = (msg: string) => {
  // Можна замінити на EventEmitter або Zustand, якщо треба глобально
  console.log("Toast:", msg);
};