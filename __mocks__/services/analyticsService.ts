// Mock for analytics service
export const trackScreenView = jest.fn((screenName: string, properties?: any) => {
  console.log(`Mock tracking screen view: ${screenName}`, properties);
});

export const trackEvent = jest.fn((eventName: string, properties?: any) => {
  console.log(`Mock tracking event: ${eventName}`, properties);
});