'use client'

import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from '@/lib/analytics'
import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'

// Re-export analytics utilities for convenience
export { analytics, reportWebVitals, trackEvent, trackPageView } from '@/lib/analytics'

/**
 * Google Analytics component using @next/third-parties
 * Optimized for performance with proper environment checking
 */
export default function GoogleAnalytics() {
  // Only render when analytics is enabled (not in development)
  if (!isAnalyticsEnabled()) {
    return null
  }
  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />
}