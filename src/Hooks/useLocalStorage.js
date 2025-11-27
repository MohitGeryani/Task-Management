import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Get initial value safely
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("LocalStorage read error:", err);
      return initialValue;
    }
  });

  // Sync to localStorage on every update
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("LocalStorage write error:", err);
    }
  }, [key, value]);

  return [value, setValue];
}
