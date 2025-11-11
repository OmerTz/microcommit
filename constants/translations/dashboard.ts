// Dashboard and main app translations
export const dashboardTranslations = {
  header: {
    greeting: {
      morning: "Good Morning",
      afternoon: "Good Afternoon", 
      evening: "Good Evening",
      night: "Good Night"
    },
    dailyNumber: "Today's Number",
    energyLevel: "Energy Level",
  },
  
  quickActions: {
    title: "Quick Actions",
    dailyGuidance: "Daily Guidance",
    compatibility: "Compatibility", 
    askOracle: "Ask Oracle",
    viewProfile: "View Profile",
  },
  
  dailyCard: {
    title: "Daily Insights",
    personalDay: "Personal Day",
    luckyNumbers: "Lucky Numbers",
    favorableTime: "Favorable Time",
    affirmation: "Today's Affirmation",
    viewMore: "View Full Reading",
  },
  
  recentInsights: {
    title: "Recent Insights",
    viewAll: "View All",
    noInsights: "No recent insights",
  },
  
  numbers: {
    title: "Your Numbers",
    lifePath: {
      label: "Life Path",
      description: "Your life's purpose and journey"
    },
    expression: {
      label: "Expression", 
      description: "Your natural talents and abilities"
    },
    soulUrge: {
      label: "Soul Urge",
      description: "Your heart's deepest desires"
    },
    personalityNumber: {
      label: "Personality",
      description: "How others perceive you"
    },
    birthdayNumber: {
      label: "Birthday",
      description: "Your special gift to the world"
    }
  },
  
  errors: {
    missingBirthInfo: "Missing birth information. Please complete onboarding.",
    loadingFailed: "Failed to load dashboard data. Please try again.",
    authRequired: "Authentication required to access dashboard.",
    noDataFound: "No data found. Please complete onboarding first.",
  }
};