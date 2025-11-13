import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { t } from '@/constants/translations';
import * as analytics from '@/services/analytics';
import { styles } from './add-payment-method.styles';
import {
  validateCardholderName,
  validateBillingZip,
  isApplePayAvailable,
  isGooglePayAvailable,
} from './add-payment-method.handlers';

export default function AddPaymentMethodScreen() {
  const [cardholderName, setCardholderName] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [saveForFuture, setSaveForFuture] = useState(true);
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const { createPaymentMethod } = useStripe();

  useEffect(() => {
    analytics.track('payment_method_add_started', {
      timestamp: new Date().toISOString(),
    });
  }, []);

  const handleCardholderNameBlur = () => {
    const validation = validateCardholderName(cardholderName);
    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, cardholderName: validation.error! }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cardholderName;
        return newErrors;
      });
    }
  };

  const handleBillingZipBlur = () => {
    if (!validateBillingZip(billingZip)) {
      setErrors((prev) => ({
        ...prev,
        billingZip: t('payment.addPaymentMethod.errors.billingZipInvalid'),
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.billingZip;
        return newErrors;
      });
    }
  };

  const handleProcessPayment = async () => {
    // Validate all fields
    let hasErrors = false;
    const newErrors: Record<string, string> = {};

    const nameValidation = validateCardholderName(cardholderName);
    if (!nameValidation.valid) {
      newErrors.cardholderName = nameValidation.error!;
      hasErrors = true;
    }

    if (!validateBillingZip(billingZip)) {
      newErrors.billingZip = t('payment.addPaymentMethod.errors.billingZipInvalid');
      hasErrors = true;
    }

    if (!cardDetails || !cardDetails.complete) {
      newErrors.card = t('payment.addPaymentMethod.errors.cardNumberInvalid');
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment method token with Stripe
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: 'Card',
        billingDetails: {
          name: cardholderName,
          address: {
            postalCode: billingZip,
          },
        },
      });

      if (error) {
        console.error('[ADD_PAYMENT_METHOD] Stripe error:', error);
        analytics.track('payment_method_add_failed', {
          error: error.message,
        });
        setErrors({ general: error.message });
        setIsProcessing(false);
        return;
      }

      console.log('[ADD_PAYMENT_METHOD] Payment method created:', paymentMethod?.id);
      analytics.track('payment_method_changed', {
        save_for_future: saveForFuture,
        success: true,
        payment_method_id: paymentMethod?.id,
      });

      // Navigate back with success
      router.back();
    } catch (error) {
      console.error('[ADD_PAYMENT_METHOD] Error:', error);
      analytics.track('payment_method_add_failed', {
        error: error instanceof Error ? error.message : 'unknown',
      });
      setErrors({ general: t('payment.addPaymentMethod.errors.tokenizationFailed') });
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container} testID="add-payment-method-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="add-payment-method-scrollview"
      >
        {/* Header with back button */}
        <Animated.View entering={FadeInUp.duration(400).springify()} style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            testID="add-payment-method-back-button"
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
        </Animated.View>

        {/* Title section */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(100).springify()}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>{t('payment.addPaymentMethod.title')}</Text>
          <Text style={styles.subtitle}>{t('payment.addPaymentMethod.subtitle')}</Text>
        </Animated.View>

        {/* Security badge */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(200).springify()}
          style={styles.securityBadge}
          testID="add-payment-method-security-badge"
        >
          <Ionicons name="lock-closed" size={16} color="#6B7280" />
          <Text style={styles.securityText}>
            {t('payment.addPaymentMethod.security.securedByStripe')}
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(300).springify()}
          style={styles.formContainer}
        >
          {/* Stripe CardField */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('payment.addPaymentMethod.fields.cardNumber')}
            </Text>
            <CardField
              postalCodeEnabled={false}
              onCardChange={(details) => {
                setCardDetails(details);
                if (errors.card && details.complete) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.card;
                    return newErrors;
                  });
                }
              }}
              style={styles.cardField}
              testID="add-payment-method-card-field"
            />
            {errors.card && (
              <Text style={styles.errorText} testID="add-payment-method-error-card">
                {errors.card}
              </Text>
            )}
          </View>

          {/* Cardholder Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('payment.addPaymentMethod.fields.cardholderName')}
            </Text>
            <TextInput
              style={styles.textInput}
              value={cardholderName}
              onChangeText={setCardholderName}
              onBlur={handleCardholderNameBlur}
              placeholder={t('payment.addPaymentMethod.fields.cardholderNamePlaceholder')}
              autoCapitalize="words"
              testID="add-payment-method-cardholder-name"
            />
            {errors.cardholderName && (
              <Text style={styles.errorText} testID="add-payment-method-error-cardholder-name">
                {errors.cardholderName}
              </Text>
            )}
          </View>

          {/* Billing ZIP */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('payment.addPaymentMethod.fields.billingZip')}
            </Text>
            <TextInput
              style={styles.textInput}
              value={billingZip}
              onChangeText={setBillingZip}
              onBlur={handleBillingZipBlur}
              placeholder={t('payment.addPaymentMethod.fields.billingZipPlaceholder')}
              keyboardType="numeric"
              maxLength={5}
              testID="add-payment-method-billing-zip"
            />
            {errors.billingZip && (
              <Text style={styles.errorText} testID="add-payment-method-error-billing-zip">
                {errors.billingZip}
              </Text>
            )}
          </View>

          {/* Save for future checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setSaveForFuture(!saveForFuture)}
            testID="add-payment-method-save-checkbox"
          >
            <Ionicons
              name={saveForFuture ? 'checkbox' : 'square-outline'}
              size={24}
              color="#2DD4BF"
            />
            <Text style={styles.checkboxLabel}>
              {t('payment.addPaymentMethod.fields.saveForFuture')}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Alternative payment methods */}
        {(isApplePayAvailable() || isGooglePayAvailable()) && (
          <Animated.View
            entering={FadeInDown.duration(500).delay(400).springify()}
            style={styles.alternativePaymentsContainer}
          >
            <Text style={styles.alternativePaymentsText}>
              {t('payment.addPaymentMethod.alternativePayments.orPayWith')}
            </Text>
            {isApplePayAvailable() && (
              <TouchableOpacity
                style={styles.alternativePaymentButton}
                testID="add-payment-method-apple-pay-button"
              >
                <Ionicons name="logo-apple" size={24} color="#000" />
                <Text style={styles.alternativePaymentButtonText}>
                  {t('payment.addPaymentMethod.buttons.useApplePay')}
                </Text>
              </TouchableOpacity>
            )}
            {isGooglePayAvailable() && (
              <TouchableOpacity
                style={styles.alternativePaymentButton}
                testID="add-payment-method-google-pay-button"
              >
                <Ionicons name="logo-google" size={24} color="#4285F4" />
                <Text style={styles.alternativePaymentButtonText}>
                  {t('payment.addPaymentMethod.buttons.useGooglePay')}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        )}

        {/* Actions */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(500).springify()}
          style={styles.actionsContainer}
        >
          {errors.general && (
            <Text style={styles.generalError} testID="add-payment-method-error-general">
              {errors.general}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.primaryButton, isProcessing && styles.disabledButton]}
            onPress={handleProcessPayment}
            disabled={isProcessing}
            testID="add-payment-method-process-button"
          >
            {isProcessing ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {t('payment.addPaymentMethod.buttons.processPayment')}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              analytics.track('payment_method_back_tapped');
              router.back();
            }}
            style={styles.backLink}
            testID="add-payment-method-back-link"
          >
            <Text style={styles.backLinkText}>
              {t('payment.addPaymentMethod.buttons.back')}
            </Text>
          </TouchableOpacity>

          <Text style={styles.securityDisclaimer}>
            {t('payment.addPaymentMethod.security.neverStoreDetails')}
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
