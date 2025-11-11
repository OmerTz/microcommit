// Mock ephemeris module for testing
module.exports = {
  getAllPlanets: jest.fn((date, options) => {
    // Return mock planetary positions
    return {
      observed: {
        sun: { apparentLongitudeDd: 280.5 },
        moon: { apparentLongitudeDd: 120.3 },
        mercury: { apparentLongitudeDd: 275.2 },
        venus: { apparentLongitudeDd: 310.8 },
        mars: { apparentLongitudeDd: 45.6 },
        jupiter: { apparentLongitudeDd: 150.2 },
        saturn: { apparentLongitudeDd: 190.4 },
        uranus: { apparentLongitudeDd: 220.1 },
        neptune: { apparentLongitudeDd: 350.7 },
        pluto: { apparentLongitudeDd: 290.3 }
      }
    };
  }),
  
  getPlanet: jest.fn((planetName, date, options) => {
    // Mock data for individual planets
    const mockPositions = {
      sun: { apparentLongitudeDd: 280.5 },
      moon: { apparentLongitudeDd: 120.3 },
      mercury: { apparentLongitudeDd: 275.2 },
      venus: { apparentLongitudeDd: 310.8 },
      mars: { apparentLongitudeDd: 45.6 },
      jupiter: { apparentLongitudeDd: 150.2 },
      saturn: { apparentLongitudeDd: 190.4 },
      uranus: { apparentLongitudeDd: 220.1 },
      neptune: { apparentLongitudeDd: 350.7 },
      pluto: { apparentLongitudeDd: 290.3 }
    };
    
    return {
      observed: mockPositions[planetName.toLowerCase()] || { apparentLongitudeDd: 0 }
    };
  })
};