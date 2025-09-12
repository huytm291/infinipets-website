import { useState, useEffect } from 'react';

/**
 * Hook debounce giá trị input.
 * @param value Giá trị đầu vào cần debounce
 * @param delay Thời gian debounce tính bằng ms (mặc định 300ms)
 * @returns Giá trị đã được debounce
 */
export default function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup nếu value hoặc delay thay đổi hoặc component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}