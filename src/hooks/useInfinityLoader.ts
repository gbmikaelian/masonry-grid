import { useCallback, useEffect, useRef, useState } from 'react';

type ItemWithId = { id: string | number };

type UseInfiniteLoaderParams<T> = {
  limit?: number;
  fetchFn: (page: number, limit: number) => Promise<{ items: T[]; hasMore: boolean }>;
};

export function useInfiniteLoader<T extends ItemWithId>({
  limit = 20,
  fetchFn,
}: UseInfiniteLoaderParams<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const seenIds = useRef(new Set<string | number>());

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setItems([]);
    seenIds.current.clear();
    setPage(1);
    setHasMore(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const { items: newItems, hasMore: more } = await fetchFn(page, limit);

      const filtered = newItems.filter((item) => {
        if (seenIds.current.has(item.id)) return false;
        seenIds.current.add(item.id);
        return true;
      });

      setItems((prev) => [...prev, ...filtered]);
      setHasMore(more);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, page, limit, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    items,
    loading,
    hasMore,
    loadMore,
    reset,
  };
}
