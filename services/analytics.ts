/**
 * Analytics Service
 * Provides event tracking for user interactions and screen views
 * TODO: Integrate with actual analytics service (Segment, Mixpanel, etc.)
 */

export const track = (eventName: string, properties?: Record<string, any>) => {
  console.log(`[ANALYTICS] ${eventName}:`, properties);

  if (eventName === 'payment_failed') {
    console.error('[ANALYTICS] Payment Failed Event:', {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  // TODO: Integrate with actual analytics service (Segment, Mixpanel, etc.)
};
