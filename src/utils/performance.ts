/**
 * Performance Monitoring Utilities
 * Production-ready performance tracking and optimization helpers
 * @module utils/performance
 */

/**
 * Measure component render time
 * Logs warning if render exceeds 16.67ms (60fps threshold)
 */
export const measureRender = (componentName: string) => {
  if (import.meta.env.DEV) {
    const startMark = `${componentName}-render-start`;
    const endMark = `${componentName}-render-end`;
    const measureName = `${componentName}-render`;

    performance.mark(startMark);

    return () => {
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);

      const measures = performance.getEntriesByName(measureName);
      const duration = measures[measures.length - 1]?.duration || 0;

      // Warn if render exceeds 16.67ms (60fps threshold)
      if (duration > 16.67) {
        console.warn(
          `🐌 ${componentName} slow render: ${duration.toFixed(2)}ms`,
          `(Target: <16.67ms for 60fps)`
        );
      }

      // Clean up marks and measures
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
    };
  }

  // No-op in production
  return () => {};
};

/**
 * React hook for measuring component render performance
 * Usage:
 * ```typescript
 * const Component = () => {
 *   useRenderPerformance('Component');
 *   return <div>...</div>;
 * };
 * ```
 */
export const useRenderPerformance = (componentName: string) => {
  if (import.meta.env.DEV) {
    const renderCount = React.useRef(0);
    const startTime = React.useRef(performance.now());

    React.useEffect(() => {
      renderCount.current += 1;
      const endTime = performance.now();
      const duration = endTime - startTime.current;

      if (duration > 16.67) {
        console.warn(
          `🐌 ${componentName} render #${renderCount.current}: ${duration.toFixed(2)}ms`
        );
      }

      startTime.current = performance.now();
    });
  }
};

/**
 * Debounce function for performance optimization
 * Delays function execution until after wait milliseconds have elapsed
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Throttle function for performance optimization
 * Ensures function is called at most once per specified time period
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 300
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastResult: ReturnType<T>;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }

    return lastResult;
  };
}

/**
 * Memoize expensive function results
 * Caches results based on arguments to avoid repeated calculations
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * Monitor expensive operations and log if they exceed threshold
 */
export const trackOperation = async <T>(
  operationName: string,
  operation: () => Promise<T> | T,
  threshold: number = 1000
): Promise<T> => {
  const start = performance.now();

  try {
    const result = await operation();
    const duration = performance.now() - start;

    if (duration > threshold) {
      console.warn(
        `⏱️ ${operationName} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`
      );
    }

    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(
      `❌ ${operationName} failed after ${duration.toFixed(2)}ms`,
      error
    );
    throw error;
  }
};

/**
 * Bundle size tracker (for development)
 * Reports imported module sizes
 */
export const trackBundleSize = (moduleName: string, module: any) => {
  if (import.meta.env.DEV) {
    const size = new TextEncoder().encode(JSON.stringify(module)).length;
    const sizeKB = (size / 1024).toFixed(2);

    if (size > 10240) {
      // >10KB
      console.warn(`📦 Large module import: ${moduleName} (${sizeKB}KB)`);
    }
  }
};

/**
 * React DevTools Profiler helper
 * Logs render phase information
 */
export const logProfilerData = (
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  if (import.meta.env.DEV) {
    console.log(`[Profiler] ${id} ${phase}:`, {
      actualDuration: `${actualDuration.toFixed(2)}ms`,
      baseDuration: `${baseDuration.toFixed(2)}ms`,
      renderTime: `${(commitTime - startTime).toFixed(2)}ms`,
    });
  }
};

/**
 * Memory usage tracker (for development)
 * Reports current memory usage if available
 */
export const logMemoryUsage = () => {
  if (import.meta.env.DEV && 'memory' in performance) {
    const memory = (performance as any).memory;
    const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
    const totalMB = (memory.totalJSHeapSize / 1048576).toFixed(2);
    const limitMB = (memory.jsHeapSizeLimit / 1048576).toFixed(2);

    console.log(`💾 Memory: ${usedMB}MB / ${totalMB}MB (Limit: ${limitMB}MB)`);

    // Warn if using >80% of limit
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
      console.warn('⚠️ High memory usage detected');
    }
  }
};

/**
 * Export all utilities for convenient import
 */
export default {
  measureRender,
  useRenderPerformance,
  debounce,
  throttle,
  memoize,
  trackOperation,
  trackBundleSize,
  logProfilerData,
  logMemoryUsage,
};

// For React import
import * as React from 'react';
