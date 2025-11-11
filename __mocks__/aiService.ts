/**
 * Simple mock implementation of AIService for testing
 */

export interface AIMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface AIResponse {
  message: string;
  confidence: number;
}

export class AIService {
  async generateResponse(userMessage: string): Promise<AIResponse> {
    return {
      message: 'Mock AI response for testing',
      confidence: 0.8
    };
  }

  async getConversationHistory(): Promise<AIMessage[]> {
    return [];
  }
}

export const aiService = new AIService();