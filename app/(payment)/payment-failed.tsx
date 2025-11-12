import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { t } from '@/constants/translations';
import * as analytics from '@/services/analytics';
import { paymentRetryService } from '@/services/paymentRetryService';
import type { RetryPaymentResult } from '@/services/paymentRetryService';
import { styles } from './payment-failed.styles';

interface PaymentFailedScreenParams {
  errorType?: 'insufficient_funds' | 'card_declined' | 'invalid_details' |
             'expired_card' | '3ds_required' | 'network_error' | 'unknown';
  goalName?: string;
  commitmentAmount?: string;
  charityName?: string;
  goalId?: string;
  paymentIntentId?: string;
  paymentMethodId?: string;
  cardLast4?: string;
  cardBrand?: string;
  userId?: string;
}

export default function PaymentFailedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<PaymentFailedScreenParams>();

  const errorType = params.errorType || 'unknown';
  const goalName = params.goalName || t('payment.failed.fallbacks.goalName');
  const commitmentAmount = params.commitmentAmount || t('payment.failed.fallbacks.commitmentAmount');
  const charityName = params.charityName || t('payment.failed.fallbacks.charityName');
  const goalId = params.goalId;
  const paymentIntentId = params.paymentIntentId;
  const paymentMethodId = params.paymentMethodId;
  const cardLast4 = params.cardLast4;
  const cardBrand = params.cardBrand;
  const userId = params.userId;

  const [isRetrying, setIsRetrying] = useState(false);
  const [retryDisabled, setRetryDisabled] = useState(false);

  const canRetry = !!(paymentIntentId && paymentMethodId && userId);

  useEffect(() => {
    analytics.track('payment_failed', {
      error_type: errorType,
      goal_id: goalId || 'unknown',
      goal_name: goalName,
      commitment_amount: commitmentAmount,
      charity_name: charityName,
      timestamp: new Date().toISOString()
    });
  }, [errorType, goalId, goalName, commitmentAmount, charityName]);

  const getErrorMessage = () => {
    const errorMessages = {
      insufficient_funds: t('payment.failed.insufficient_funds').replace('{{amount}}', commitmentAmount),
      card_declined: t('payment.failed.card_declined'),
      invalid_details: t('payment.failed.invalid_details'),
      expired_card: t('payment.failed.expired_card'),
      '3ds_required': t('payment.failed.3ds_required'),
      network_error: t('payment.failed.network_error'),
      unknown: t('payment.failed.unknown'),
    };
    return errorMessages[errorType] || errorMessages.unknown;
  };

  const handleTryAgain = async () => {
    if (!canRetry) {
      console.log('[PAYMENT_FAILED] Cannot retry - missing payment details, navigating back');
      try {
        await router.back();
      } catch (error) {
        console.error('[PAYMENT_FAILED] Navigation error:', error);
        Alert.alert(t('payment.failed.errors.navigationError'), t('payment.failed.errors.navigationFailed'));
      }
      return;
    }

    if (isRetrying || retryDisabled) {
      console.warn('[PAYMENT_FAILED] Retry already in progress or disabled');
      return;
    }

    setIsRetrying(true);
    setRetryDisabled(true);

    try {
      console.log('[PAYMENT_FAILED] Starting payment retry', {
        paymentIntentId,
        cardLast4,
        goalId,
      });

      const amount = parseInt(commitmentAmount, 10) * 100;

      const result: RetryPaymentResult = await paymentRetryService.retryPayment({
        paymentIntentId: paymentIntentId!,
        paymentMethodId: paymentMethodId!,
        userId: userId!,
        goalId,
        amount,
        currency: 'usd',
        cardLast4,
        cardBrand,
      });

      setIsRetrying(false);

      if (result.success) {
        console.log('[PAYMENT_FAILED] Retry successful');
        Alert.alert(
          t('payment.retry.success.title'),
          t('payment.retry.success.message'),
          [
            {
              text: t('payment.retry.success.action'),
              onPress: () => router.push('/(tabs)/goals' as any),
            },
          ]
        );
        return;
      }

      if (result.outcome === 'same_error') {
        console.log('[PAYMENT_FAILED] Same error encountered');
        Alert.alert(
          t('payment.retry.sameError.title'),
          t('payment.retry.sameError.message'),
          [
            {
              text: t('payment.retry.sameError.action'),
              onPress: () => router.push('/(payment)/add-payment-method' as any),
            },
          ]
        );
        setRetryDisabled(true);
        return;
      }

      if (result.outcome === 'different_error') {
        console.log('[PAYMENT_FAILED] Different error encountered', result.errorType);

        if (result.requiresAction && result.clientSecret) {
          console.log('[PAYMENT_FAILED] 3D Secure authentication required');
          Alert.alert(
            t('payment.retry.errors.requires_3ds'),
            t('payment.failed.suggestedActions.requires_3ds'),
            [{ text: 'OK' }]
          );
          setRetryDisabled(false);
          return;
        }

        Alert.alert(
          t('payment.retry.differentError.title'),
          result.errorMessage || t('payment.retry.differentError.message'),
          [
            {
              text: t('payment.retry.differentError.action'),
              onPress: () => setRetryDisabled(false),
            },
          ]
        );
        return;
      }

      if (result.outcome === 'timeout') {
        console.log('[PAYMENT_FAILED] Retry timeout');
        Alert.alert(
          t('payment.retry.timeout.title'),
          t('payment.retry.timeout.message'),
          [
            {
              text: t('payment.retry.timeout.actionContinue'),
              onPress: () => router.push('/(tabs)/goals' as any),
            },
            {
              text: t('payment.retry.timeout.actionWait'),
              style: 'cancel',
              onPress: () => setRetryDisabled(false),
            },
          ]
        );
        return;
      }

      if (result.outcome === 'max_attempts_reached') {
        console.log('[PAYMENT_FAILED] Max retry attempts reached');
        Alert.alert(
          t('payment.retry.maxAttempts.title'),
          t('payment.retry.maxAttempts.message'),
          [
            {
              text: t('payment.retry.maxAttempts.action'),
              onPress: () => router.push('/(payment)/add-payment-method' as any),
            },
          ]
        );
        setRetryDisabled(true);
        return;
      }

    } catch (error) {
      console.error('[PAYMENT_FAILED] Retry exception:', error);
      setIsRetrying(false);
      setRetryDisabled(false);

      Alert.alert(
        t('payment.failed.errors.navigationError'),
        error instanceof Error ? error.message : t('payment.retry.errors.unknown_error')
      );
    }
  };

  const handleUseDifferentCard = async () => {
    try {
      console.log('[PAYMENT_FAILED] User tapped Use Different Card');
      await router.push('/(payment)/add-payment-method' as any);
    } catch (error) {
      console.error('[PAYMENT_FAILED] Navigation error:', error);
      Alert.alert(t('payment.failed.errors.navigationError'), t('payment.failed.errors.navigateToCardFailed'));
    }
  };

  const handleNeedHelp = async () => {
    try {
      console.log('[PAYMENT_FAILED] User tapped Need Help');
      await Linking.openURL('https://support.microcommit.app/payment-issues');
    } catch (error) {
      console.error('[PAYMENT_FAILED] Failed to open help link:', error);
      Alert.alert(t('payment.failed.errors.helpLinkError'), t('payment.failed.errors.helpLinkFailed'));
    }
  };

  const handleCancelGoal = async () => {
    try {
      console.log('[PAYMENT_FAILED] User tapped Cancel Goal');
      Alert.alert(
        t('payment.failed.errors.cancelGoalTitle'),
        t('payment.failed.errors.cancelGoalMessage'),
        [
          { text: t('payment.failed.errors.cancelGoalKeep'), style: 'cancel' },
          {
            text: t('payment.failed.errors.cancelGoalConfirm'),
            style: 'destructive',
            onPress: async () => {
              await router.push('/(tabs)/goals' as any);
            }
          }
        ]
      );
    } catch (error) {
      console.error('[PAYMENT_FAILED] Cancel goal error:', error);
      Alert.alert(t('payment.failed.errors.helpLinkError'), t('payment.failed.errors.cancelGoalFailed'));
    }
  };

  return (
    <View style={styles.container} testID="payment-failed-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="payment-failed-scrollview"
      >
        <Animated.View
          entering={FadeInUp.duration(400).springify()}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            testID="payment-failed-back-button"
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(100).springify()}
          style={styles.iconContainer}
        >
          <View style={styles.warningIconCircle}>
            <Ionicons name="alert-circle" size={64} color="#F59E0B" />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(200).springify()}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>{t('payment.failed.title')}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(300).springify()}
          style={styles.errorMessageContainer}
          testID="payment-failed-error-message"
        >
          <Text style={styles.errorMessage}>{getErrorMessage()}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(400).springify()}
          style={styles.goalSummaryCard}
          testID="payment-failed-goal-summary"
        >
          <Text style={styles.summaryTitle}>{t('payment.failed.goalSummary.title')}</Text>

          <View style={styles.summaryItem}>
            <Ionicons name="flag" size={20} color="#6B7280" />
            <Text style={styles.summaryLabel}>{goalName}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="cash" size={20} color="#6B7280" />
            <Text style={styles.summaryLabel}>
              {t('payment.failed.goalSummary.commitment')}: <Text style={styles.summaryValue}>${commitmentAmount}</Text>
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="heart" size={20} color="#6B7280" />
            <Text style={styles.summaryLabel}>
              {t('payment.failed.goalSummary.charity')}: <Text style={styles.summaryValue}>{charityName}</Text>
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(500).springify()}
          style={styles.reassuranceContainer}
        >
          <Text style={styles.reassuranceText}>{t('payment.failed.reassurance')}</Text>
          <Text style={styles.noChargesText}>{t('payment.failed.noCharges')}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(600).springify()}
          style={styles.actionsContainer}
        >
          <TouchableOpacity
            style={[
              styles.primaryButton,
              (isRetrying || retryDisabled) && styles.disabledButton,
            ]}
            onPress={handleTryAgain}
            testID="payment-failed-try-again-button"
            activeOpacity={0.8}
            disabled={isRetrying || retryDisabled}
          >
            {isRetrying ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={styles.primaryButtonText}>
                  {cardLast4
                    ? t('payment.retry.processingWithCard').replace('{{last4}}', cardLast4)
                    : t('payment.retry.processing')}
                </Text>
              </View>
            ) : (
              <Text style={styles.primaryButtonText}>
                {retryDisabled ? t('payment.retry.disabled') : t('payment.failed.buttons.tryAgain')}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleUseDifferentCard}
            testID="payment-failed-different-card-button"
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>{t('payment.failed.buttons.differentCard')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNeedHelp}
            testID="payment-failed-help-link"
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>{t('payment.failed.buttons.help')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancelGoal}
            testID="payment-failed-cancel-link"
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>{t('payment.failed.buttons.cancel')}</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
