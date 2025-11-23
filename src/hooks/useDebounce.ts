import { useEffect, useMemo, useRef } from "react";

function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  timer: number = 500
): T {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<T>) => {
      ref.current(...args);
    };

    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), timer);
    }) as T;
  }, [timer]);

  return debouncedCallback;
}

export default useDebounce;
