/**
 * Integration Tests for Payment Attempts Service
 * Tests database operations with mocked Supabase client
 */

import { paymentAttemptsService } from '../paymentAttemptsService';
import { mockStripeErrors } from '../../__mocks__/stripeErrors';

jest.mock('../../utils/supabase');
jest.mock('../analytics');

import { supabase } from '../../utils/supabase';
import { track } from '../analytics';

const mockSupabase = supabase as jest.Mocked<typeof supabase>;
const mockTrack = track as jest.MockedFunction<typeof track>;

describe('PaymentAttemptsService Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPaymentAttempt', () => {
    it('should create payment attempt and track analytics', async () => {
      const mockData = {
        id: 'attempt-123',
        error_type: 'insufficient_funds',
        error_message: "Your card doesn't have enough funds for this commitment",
        amount: 5000,
      };

      (mockSupabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockData,
              error: null,
            }),
          }),
        }),
      });

      const result = await paymentAttemptsService.createPaymentAttempt({
        userId: 'user-123',
        goalId: 'goal-456',
        stripeError: mockStripeErrors.insufficient_funds,
        amount: 5000,
        currency: 'usd',
        cardLast4: '4242',
        cardBrand: 'visa',
      });

      expect(result).toEqual(mockData);
      expect(mockTrack).toHaveBeenCalledWith(
        'payment_failed',
        expect.objectContaining({
          goal_id: 'goal-456',
          error_type: 'insufficient_funds',
          amount: 5000,
        })
      );
    });
  });

  describe('markGoalPaymentFailed', () => {
    it('should update goal status', async () => {
      (mockSupabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      const result = await paymentAttemptsService.markGoalPaymentFailed('goal-123');
      expect(result).toBe(true);
    });
  });
});
