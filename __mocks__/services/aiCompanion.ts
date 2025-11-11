// Mock for AI Companion service

export interface NatalChart {
  id: string;
  data?: any;
}

export interface AICompanionResponse {
  message: string;
  suggestions?: string[];
  relatedModules?: string[];
  followUpQuestions?: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: string[];
  currentProgress: number;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export class AICompanionService {
  async initialize(natalChart?: NatalChart, preferences?: any): Promise<void> {
    // Mock initialization - just return resolved promise
    return Promise.resolve();
  }

  async askQuestion(question: string): Promise<AICompanionResponse> {
    return {
      message: `Mock response to: ${question}`,
      suggestions: ['Learn more', 'Ask another question'],
      relatedModules: ['astro-basics-101'],
      followUpQuestions: ['Tell me more about numerology']
    };
  }

  async generateLearningPath(userChart?: NatalChart, interests?: string[]): Promise<LearningPath[]> {
    return [{
      id: 'mock-path-1',
      title: 'Mock Learning Path',
      description: 'A mock learning path for testing',
      modules: ['mock-module-1', 'mock-module-2'],
      currentProgress: 0,
      estimatedTime: 30,
      difficulty: 'beginner'
    }];
  }

  async generateLearningPaths(userChart?: NatalChart, interests?: string[]): Promise<LearningPath[]> {
    return this.generateLearningPath(userChart, interests);
  }

  clearHistory(): void {
    // Mock clear history - no-op
  }
}

// Mock singleton instance
export const aiCompanion = new AICompanionService();