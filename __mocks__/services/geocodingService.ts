// Mock for geocoding service
export interface GeoLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const getBirthPlaceCoordinates = jest.fn(async (birthData: any): Promise<GeoLocation> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  
  return {
    city: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
  };
});