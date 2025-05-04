import { useRef, useEffect, useState, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

export function useInfiniteScroll({
  onIntersect,
  root = null,
  rootMargin = '200px',
  threshold = 0,
  enabled = true,
}: UseInfiniteScrollOptions): [React.RefObject<HTMLDivElement | null>, boolean] {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsIntersecting(true);
      onIntersect();
    } else {
      setIsIntersecting(false);
    }
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled) return;    
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, enabled, handleIntersect]);

  return [sentinelRef, isIntersecting];
} 