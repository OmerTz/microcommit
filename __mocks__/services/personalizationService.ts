// Mock for personalization service
export interface UserBirthData {
  birthDate: Date;
  birthTime: string;
  birthPlace: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

export interface NatalChart {
  sun: { sign: string; degree: number };
  moon: { sign: string; degree: number };
  rising: { sign: string; degree: number };
  mercury: { sign: string; degree: number };
  venus: { sign: string; degree: number };
  mars: { sign: string; degree: number };
  jupiter: { sign: string; degree: number };
  saturn: { sign: string; degree: number };
  uranus: { sign: string; degree: number };
  neptune: { sign: string; degree: number };
  pluto: { sign: string; degree: number };
}

export interface PersonalizedDailyInsights {
  primaryInsight: {
    title: string;
    description: string;
    intensity: 'low' | 'medium' | 'high';
  };
  focusAreas: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  affirmation: string;
  challenges: string[];
  opportunities: string[];
}

export const calculateNatalChart = jest.fn((birthData: UserBirthData): NatalChart => ({
  sun: { sign: 'Leo', degree: 15.5 },
  moon: { sign: 'Gemini', degree: 23.2 },
  rising: { sign: 'Cancer', degree: 8.7 },
  mercury: { sign: 'Leo', degree: 12.1 },
  venus: { sign: 'Virgo', degree: 28.9 },
  mars: { sign: 'Aries', degree: 5.3 },
  jupiter: { sign: 'Taurus', degree: 18.7 },
  saturn: { sign: 'Capricorn', degree: 22.4 },
  uranus: { sign: 'Aquarius', degree: 11.8 },
  neptune: { sign: 'Pisces', degree: 25.6 },
  pluto: { sign: 'Scorpio', degree: 7.2 },
}));

export const generatePersonalizedInsights = jest.fn((natalChart: NatalChart): PersonalizedDailyInsights => ({
  primaryInsight: {
    title: 'Creative Energy Peak',
    description: 'Your Leo sun energy is amplified today, making it an excellent time for creative expression and leadership opportunities.',
    intensity: 'high' as const,
  },
  focusAreas: ['Creativity', 'Leadership', 'Self-expression'],
  luckyNumbers: [7, 15, 23],
  luckyColors: ['Gold', 'Purple', 'Red'],
  affirmation: 'I shine my light brightly and inspire others with my authentic self.',
  challenges: ['Overconfidence', 'Ego clashes'],
  opportunities: ['Creative projects', 'Public speaking', 'Romance'],
}));