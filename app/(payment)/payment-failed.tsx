import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { t } from '@/constants/translations';

interface PaymentFailedScreenParams {
  errorType?: 'insufficient_funds' | 'card_declined' | 'invalid_details' |
             'expired_card' | '3ds_required' | 'network_error' | 'unknown';
  goalName?: string;
  commitmentAmount?: string;
  charityName?: string;
}

export default function PaymentFailedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<PaymentFailedScreenParams>();

  const errorType = params.errorType || 'unknown';
  const goalName = params.goalName || 'Your goal';
  const commitmentAmount = params.commitmentAmount || '0';
  const charityName = params.charityName || 'Selected charity';

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

  const handleTryAgain = () => {
    console.log('[PAYMENT_FAILED] User tapped Try Again');
    router.back();
  };

  const handleUseDifferentCard = () => {
    console.log('[PAYMENT_FAILED] User tapped Use Different Card');
    router.push('/(payment)/payment-method');
  };

  const handleNeedHelp = () => {
    console.log('[PAYMENT_FAILED] User tapped Need Help');
    router.push('/(tabs)/help');
  };

  const handleCancelGoal = () => {
    console.log('[PAYMENT_FAILED] User tapped Cancel Goal');
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container} testID="payment-failed-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            style={styles.primaryButton}
            onPress={handleTryAgain}
            testID="payment-failed-try-again-button"
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{t('payment.failed.buttons.tryAgain')}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  warningIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: '#111827',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  errorMessageContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  errorMessage: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  goalSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#111827',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  summaryLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  summaryValue: {
    fontWeight: '600',
    color: '#111827',
  },
  reassuranceContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  reassuranceText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  noChargesText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
    height: 56,
    backgroundColor: '#2DD4BF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2DD4BF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  secondaryButton: {
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2DD4BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2DD4BF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  linkButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2DD4BF',
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  cancelButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
});
