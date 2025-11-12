/**
 * Payment Attempts Service
 * Handles creation and retrieval of payment attempt records
 */

import { supabase } from '../utils/supabase';
import type { PaymentAttempt, StripeError } from './paymentErrorTypes';
import { stripeErrorCategorizationService } from './stripeErrorCategorizationService';
import { track } from './analytics';

interface CreatePaymentAttemptParams {
  goalId?: string;
  userId: string;
  stripePaymentIntentId?: string;
  stripeError: StripeError;
  amount: number;
  currency?: string;
  cardLast4?: string;
  cardBrand?: string;
}

class PaymentAttemptsService {
  /**
   * Create payment attempt record in database and track analytics
   */
  async createPaymentAttempt(
    params: CreatePaymentAttemptParams
  ): Promise<PaymentAttempt | null> {
    try {
      const categorized = stripeErrorCategorizationService.categorizeError(
        params.stripeError
      );

      const attemptData = {
        goal_id: params.goalId,
        user_id: params.userId,
        stripe_payment_intent_id: params.stripePaymentIntentId,
        error_code: params.stripeError.code || 'unknown',
        error_type: categorized.type,
        error_message: categorized.userMessage,
        raw_stripe_error: params.stripeError,
        amount: params.amount,
        currency: params.currency || 'usd',
        card_last4: params.cardLast4,
        card_brand: params.cardBrand,
      };

      const { data, error } = await supabase
        .from('payment_attempts')
        .insert(attemptData)
        .select()
        .single();

      if (error) {
        console.error('[PaymentAttempts] Database error:', error);
        return null;
      }

      track('payment_failed', {
        goal_id: params.goalId,
        error_code: params.stripeError.code,
        error_type: categorized.type,
        error_message: categorized.userMessage,
        amount: params.amount,
        currency: params.currency || 'usd',
        retryable: categorized.retryable,
        card_brand: params.cardBrand,
        suggested_action: categorized.suggestedAction,
      });

      return data;
    } catch (err) {
      console.error('[PaymentAttempts] Exception:', err);
      return null;
    }
  }

  /**
   * Update goal status to payment_failed
   */
  async markGoalPaymentFailed(goalId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          status: 'payment_failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', goalId);

      if (error) {
        console.error('[PaymentAttempts] Error updating goal:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('[PaymentAttempts] Exception updating goal:', err);
      return false;
    }
  }

  /**
   * Get all payment attempts for a specific goal
   */
  async getPaymentAttemptsForGoal(goalId: string): Promise<PaymentAttempt[]> {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .select('*')
        .eq('goal_id', goalId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[PaymentAttempts] Error fetching attempts:', error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('[PaymentAttempts] Exception fetching attempts:', err);
      return [];
    }
  }

  /**
   * Get payment attempts for a user with optional limit
   */
  async getPaymentAttemptsForUser(
    userId: string,
    limit: number = 50
  ): Promise<PaymentAttempt[]> {
    try {
      const { data, error } = await supabase
        .from('payment_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[PaymentAttempts] Error fetching user attempts:', error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('[PaymentAttempts] Exception fetching user attempts:', err);
      return [];
    }
  }

  /**
   * Get count of payment attempts for a goal (useful for retry logic)
   */
  async getPaymentAttemptCountForGoal(goalId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('payment_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('goal_id', goalId);

      if (error) {
        console.error('[PaymentAttempts] Error counting attempts:', error);
        return 0;
      }

      return count || 0;
    } catch (err) {
      console.error('[PaymentAttempts] Exception counting attempts:', err);
      return 0;
    }
  }
}

export const paymentAttemptsService = new PaymentAttemptsService();
