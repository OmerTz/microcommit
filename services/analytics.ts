/**
 * Analytics Service
 * Provides event tracking for user interactions and screen views
 * TODO: Integrate with actual analytics service (Segment, Mixpanel, etc.)
 */

export const track = (eventName: string, properties?: Record<string, any>) => {
  console.log(`[ANALYTICS] ${eventName}:`, properties);
  // TODO: Integrate with actual analytics service (Segment, Mixpanel, etc.)
};
