/**
 * Mock implementation of Supabase for testing
 */

export const supabase = {
  auth: {
    signUp: jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@cosmicinsights.com',
        },
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
        }
      },
      error: null
    }),
    
    signIn: jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@cosmicinsights.com',
        },
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
        }
      },
      error: null
    }),
    
    signInWithPassword: jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@cosmicinsights.com',
        },
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
        }
      },
      error: null
    }),
    
    signOut: jest.fn().mockResolvedValue({
      error: null
    }),
    
    getUser: jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@cosmicinsights.com',
        }
      },
      error: null
    }),
    
    getSession: jest.fn().mockResolvedValue({
      data: {
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
        }
      },
      error: null
    }),
    
    onAuthStateChange: jest.fn((callback) => {
      // Simulate auth state change
      callback('SIGNED_IN', {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
      });
      
      return {
        data: { subscription: { unsubscribe: jest.fn() } }
      };
    })
  },
  
  from: jest.fn((table: string) => {
    return {
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockResolvedValue({
        data: mockTableData[table] || {},
        error: null
      }),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: mockTableData[table] || {},
        error: null
      }),
      mockResolvedValue: jest.fn().mockResolvedValue({
        data: mockTableData[table] || [],
        error: null
      })
    };
  }),
  
  storage: {
    from: jest.fn((bucket: string) => ({
      upload: jest.fn().mockResolvedValue({
        data: { path: `${bucket}/mock-file.jpg` },
        error: null
      }),
      download: jest.fn().mockResolvedValue({
        data: new Blob(['mock file content']),
        error: null
      }),
      remove: jest.fn().mockResolvedValue({
        data: {},
        error: null
      }),
      getPublicUrl: jest.fn().mockReturnValue({
        data: { publicUrl: `https://storage.mock/${bucket}/file.jpg` }
      })
    }))
  }
};

// Mock data for different tables
const mockTableData: Record<string, any> = {
  user_profiles: {
    id: 'test-user-id',
    email: 'test@cosmicinsights.com',
    name: 'Test User',
    birth_date: '1990-05-15',
    birth_time: '14:30',
    birth_place: 'New York, NY',
    birth_latitude: 40.7128,
    birth_longitude: -74.0060,
    timezone: 'America/New_York',
    subscription_tier: 'premium',
    subscription_status: 'active',
    push_token: 'mock-push-token',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  subscriptions: {
    id: 'sub-123',
    user_id: 'test-user-id',
    tier: 'premium',
    status: 'active',
    started_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    stripe_subscription_id: 'sub_mock123',
    stripe_customer_id: 'cus_mock456'
  },
  
  daily_insights: {
    id: 'insight-123',
    user_id: 'test-user-id',
    date: new Date().toISOString().split('T')[0],
    cosmic_weather: 'The Sun in Leo brings confidence and creativity',
    personal_message: 'Your Leo Sun shines bright today',
    lucky_numbers: [7, 14, 21],
    lucky_colors: ['Gold', 'Orange'],
    affirmation: 'I embrace my inner light and share it with the world',
    created_at: new Date().toISOString()
  },
  
  educational_progress: {
    id: 'progress-123',
    user_id: 'test-user-id',
    module_id: 'astro-basics-101',
    completed: true,
    completed_at: new Date().toISOString(),
    time_spent: 300,
    quiz_score: 85
  },
  
  ai_conversations: {
    id: 'conv-123',
    user_id: 'test-user-id',
    messages: [
      {
        role: 'user',
        content: 'What is my sun sign?',
        timestamp: new Date().toISOString()
      },
      {
        role: 'assistant',
        content: 'Your Sun is in Leo, which represents your core essence.',
        timestamp: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

export default supabase;