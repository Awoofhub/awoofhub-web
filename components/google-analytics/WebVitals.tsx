'use client'

import { reportWebVitals } from '@/lib/analytics'
import { useReportWebVitals } from 'next/web-vitals'

/**
 * Web Vitals tracking component
 * Automatically reports Core Web Vitals to Google Analytics
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric)
  })
  return null
}