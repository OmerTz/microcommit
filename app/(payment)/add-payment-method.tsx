/**
 * Web-specific version of Add Payment Method screen
 * Uses manual card input fields instead of Stripe CardField (native-only)
 */
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
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { t } from '@/constants/translations';
import * as analytics from '@/services/analytics';
import { styles } from './add-payment-method.styles';
import { PaymentColors } from '@/constants/paymentColors';
import {
  validateCardholderName,
  validateBillingZip,
  processPaymentMethod,
} from './add-payment-method.handlers';

// Web version - no Stripe imports needed

export default function AddPaymentMethodScreen() {
  const [cardholderName, setCardholderName] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [saveForFuture, setSaveForFuture] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Web manual card input
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const router = useRouter();

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

    // Web: validate manual card inputs
    if (!cardNumber.trim()) {
      newErrors.card = t('payment.addPaymentMethod.errors.cardNumberInvalid');
      hasErrors = true;
    }
    if (!expiryDate.trim()) {
      newErrors.expiry = t('payment.addPaymentMethod.errors.expiryInvalid');
      hasErrors = true;
    }
    if (!cvc.trim()) {
      newErrors.cvc = t('payment.addPaymentMethod.errors.cvcInvalid');
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    try {
      // Call payment processing handler
      const result = await processPaymentMethod({
        cardholderName,
        billingZip,
        cardDetails: null,
        cardNumber,
        expiryDate,
        cvc,
        saveForFuture,
        platform: 'web',
      });

      if (!result.success) {
        // Handler returned error (web not yet supported)
        console.error('[ADD_PAYMENT_METHOD] Payment processing failed:', result.error);
        analytics.track('payment_method_add_failed', {
          error: result.error,
          platform: 'web',
        });
        setErrors({ general: result.error || t('payment.addPaymentMethod.errors.tokenizationFailed') });
        setIsProcessing(false);
        return;
      }

      // Success case (currently unreachable for web, but ready for future implementation)
      console.log('[ADD_PAYMENT_METHOD] Payment method created:', result.paymentMethodId);
      analytics.track('payment_method_changed', {
        save_for_future: saveForFuture,
        success: true,
        platform: 'web',
      });
      router.back();
    } catch (error) {
      console.error('[ADD_PAYMENT_METHOD] Unexpected error:', error);
      analytics.track('payment_method_add_failed', {
        error: error instanceof Error ? error.message : 'unknown',
        platform: 'web',
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
            <Ionicons name="arrow-back" size={24} color={PaymentColors.text.primary} />
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
          <Ionicons name="lock-closed" size={16} color={PaymentColors.text.secondary} />
          <Text style={styles.securityText}>
            {t('payment.addPaymentMethod.security.securedByStripe')}
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(300).springify()}
          style={styles.formContainer}
        >
          {/* Web manual card input fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('payment.addPaymentMethod.fields.cardNumber')}
            </Text>
            <TextInput
              style={styles.textInput}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder={t('payment.addPaymentMethod.fields.cardNumberPlaceholder')}
              keyboardType="numeric"
              maxLength={19}
              testID="add-payment-method-card-number"
            />
            {errors.card && (
              <Text style={styles.errorText} testID="add-payment-method-error-card">
                {errors.card}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('payment.addPaymentMethod.fields.expiryDate')}
            </Text>
            <TextInput
              style={styles.textInput}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder={t('payment.addPaymentMethod.fields.expiryDatePlaceholder')}
              keyboardType="numeric"
              maxLength={5}
              testID="add-payment-method-expiry-date"
            />
            {errors.expiry && (
              <Text style={styles.errorText} testID="add-payment-method-error-expiry">
                {errors.expiry}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('payment.addPaymentMethod.fields.cvc')}
            </Text>
            <TextInput
              style={styles.textInput}
              value={cvc}
              onChangeText={setCvc}
              placeholder={t('payment.addPaymentMethod.fields.cvcPlaceholder')}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true}
              testID="add-payment-method-cvc"
            />
            {errors.cvc && (
              <Text style={styles.errorText} testID="add-payment-method-error-cvc">
                {errors.cvc}
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
              color={PaymentColors.primary.main}
            />
            <Text style={styles.checkboxLabel}>
              {t('payment.addPaymentMethod.fields.saveForFuture')}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Alternative payment methods not available on web */}

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
              <ActivityIndicator color={PaymentColors.text.onPrimary} />
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
