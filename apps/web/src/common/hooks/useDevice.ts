import { useState, useEffect, useCallback, useRef } from 'react';

// ---------------------------------------------------------------------------
// Breakpoints (px) — strict, non-overlapping ranges
// ---------------------------------------------------------------------------
const BREAKPOINTS = {
  TABLET: 768, // mobile  : < 768
  LAPTOP: 1024, // tablet  : 768 – 1023
  DESKTOP: 1280, // laptop  : 1024 – 1279
} as const;

// Minimum width delta (px) to accept a resize as a real layout change,
// not a pinch-zoom gesture shrinking the visual viewport.
const ZOOM_NOISE_THRESHOLD = 10;

// Debounce delay for resize events (ms).
const DEBOUNCE_MS = 150;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface DeviceFlags {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  /**
   * Returns the current viewport dimensions.
   *
   * @warn Do NOT destructure this into reactive state or call it inside render
   * logic. Reading layout dimensions can cause reflow in some environments.
   * Call it only inside event handlers or `useEffect` when you genuinely need
   * the raw size.
   */
  getDimensions: () => { width: number; height: number };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Reflow-safe width: visualViewport → screen → 0 (SSR guard) */
function getWidth(): number {
  if (typeof window === 'undefined') return 0;
  return window.visualViewport?.width ?? screen.width ?? 0;
}

/** Reflow-safe height: visualViewport → screen → 0 (SSR guard) */
function getHeight(): number {
  if (typeof window === 'undefined') return 0;
  return window.visualViewport?.height ?? screen.height ?? 0;
}

function classifyWidth(
  width: number
): Pick<DeviceFlags, 'isMobile' | 'isTablet' | 'isLaptop' | 'isDesktop'> {
  return {
    isMobile: width < BREAKPOINTS.TABLET,
    isTablet: width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.LAPTOP,
    isLaptop: width >= BREAKPOINTS.LAPTOP && width < BREAKPOINTS.DESKTOP,
    isDesktop: width >= BREAKPOINTS.DESKTOP,
  };
}

/**
 * Custom hook to detect device type based on screen width.
 * Provides reactive flags for mobile, tablet, laptop, and desktop.
 */
export function useDevice(): DeviceFlags {
  const [flags, setFlags] = useState(() => classifyWidth(getWidth()));

  // Track the last accepted width to filter pinch-zoom noise.
  const lastWidthRef = useRef<number>(getWidth());

  const handleResize = useCallback(() => {
    const nextWidth = getWidth();
    const delta = Math.abs(nextWidth - lastWidthRef.current);

    // Ignore sub-threshold changes (pinch-zoom artefacts).
    if (delta < ZOOM_NOISE_THRESHOLD) return;

    lastWidthRef.current = nextWidth;
    setFlags(classifyWidth(nextWidth));
  }, []);

  useEffect(() => {
    // Debounced resize dispatcher
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(handleResize, DEBOUNCE_MS);
    };

    // Primary: visualViewport resize (no forced layout, mobile-accurate)
    const vp = window.visualViewport;
    if (vp) {
      vp.addEventListener('resize', onResize);
    } else {
      // Fallback for browsers without visualViewport support
      window.addEventListener('resize', onResize);
    }

    // Supplementary: iOS Safari orientationchange (visualViewport resize
    // is not reliably fired there on orientation flip)
    window.addEventListener('orientationchange', onResize);

    return () => {
      clearTimeout(timer);
      if (vp) {
        vp.removeEventListener('resize', onResize);
      } else {
        window.removeEventListener('resize', onResize);
      }
      window.removeEventListener('orientationchange', onResize);
    };
  }, [handleResize]);

  const getDimensions = useCallback(
    () => ({ width: getWidth(), height: getHeight() }),
    [] // stable reference — no reactive deps
  );

  return { ...flags, getDimensions };
}
