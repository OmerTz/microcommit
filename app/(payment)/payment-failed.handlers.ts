/**
 * Payment Failed Screen Handlers
 * Business logic for payment retry and recovery actions
 */

import { Alert } from 'react-native';
import { paymentRetryService } from '@/services/paymentRetryService';
import type { RetryPaymentResult } from '@/services/paymentRetryService';
import { t } from '@/constants/translations';

interface RetryHandlerParams {
  paymentIntentId: string;
  paymentMethodId: string;
  userId: string;
  goalId?: string;
  commitmentAmount: string;
  cardLast4?: string;
  cardBrand?: string;
  onSuccess: () => void;
  onSameError: () => void;
  onDifferentError: () => void;
  onTimeout: () => void;
  onMaxAttempts: () => void;
}

export async function handlePaymentRetry(params: RetryHandlerParams): Promise<void> {
  const {
    paymentIntentId,
    paymentMethodId,
    userId,
    goalId,
    commitmentAmount,
    cardLast4,
    cardBrand,
    onSuccess,
    onSameError,
    onDifferentError,
    onTimeout,
    onMaxAttempts,
  } = params;

  console.log('[PAYMENT_RETRY_HANDLER] Starting retry', {
    paymentIntentId,
    cardLast4,
    goalId,
  });

  const amount = parseInt(commitmentAmount, 10) * 100;

  const result: RetryPaymentResult = await paymentRetryService.retryPayment({
    paymentIntentId,
    paymentMethodId,
    userId,
    goalId,
    amount,
    currency: 'usd',
    cardLast4,
    cardBrand,
  });

  if (result.success) {
    console.log('[PAYMENT_RETRY_HANDLER] Retry successful');
    Alert.alert(
      t('payment.retry.success.title'),
      t('payment.retry.success.message'),
      [{ text: t('payment.retry.success.action'), onPress: onSuccess }]
    );
    return;
  }

  if (result.outcome === 'same_error') {
    console.log('[PAYMENT_RETRY_HANDLER] Same error encountered');
    Alert.alert(
      t('payment.retry.sameError.title'),
      t('payment.retry.sameError.message'),
      [{ text: t('payment.retry.sameError.action'), onPress: onSameError }]
    );
    return;
  }

  if (result.outcome === 'different_error') {
    console.log('[PAYMENT_RETRY_HANDLER] Different error', result.errorType);

    if (result.requiresAction && result.clientSecret) {
      console.log('[PAYMENT_RETRY_HANDLER] 3D Secure required');
      Alert.alert(
        t('payment.retry.errors.requires_3ds'),
        t('payment.failed.suggestedActions.requires_3ds'),
        [{ text: 'OK', onPress: onDifferentError }]
      );
      return;
    }

    Alert.alert(
      t('payment.retry.differentError.title'),
      result.errorMessage || t('payment.retry.differentError.message'),
      [{ text: t('payment.retry.differentError.action'), onPress: onDifferentError }]
    );
    return;
  }

  if (result.outcome === 'timeout') {
    console.log('[PAYMENT_RETRY_HANDLER] Timeout');
    Alert.alert(
      t('payment.retry.timeout.title'),
      t('payment.retry.timeout.message'),
      [
        { text: t('payment.retry.timeout.actionContinue'), onPress: onSuccess },
        { text: t('payment.retry.timeout.actionWait'), style: 'cancel', onPress: onTimeout },
      ]
    );
    return;
  }

  if (result.outcome === 'max_attempts_reached') {
    console.log('[PAYMENT_RETRY_HANDLER] Max attempts reached');
    Alert.alert(
      t('payment.retry.maxAttempts.title'),
      t('payment.retry.maxAttempts.message'),
      [{ text: t('payment.retry.maxAttempts.action'), onPress: onMaxAttempts }]
    );
    return;
  }
}
