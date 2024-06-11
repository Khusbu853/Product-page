import { useState, useEffect, useRef, useCallback } from 'react';

interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useInfiniteScroll = (callback: () => void, options: Options = {}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
            callback();
          }
        },
        options
      );
      if (node) observerRef.current.observe(node);
    },
    [loading, options, callback]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const setLoadingState = (state: boolean) => setLoading(state);

  return { loading, lastElementRef, setLoadingState };
};

export default useInfiniteScroll;

