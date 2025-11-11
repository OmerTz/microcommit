/**
 * Subscription Hook
 * Custom hook for managing subscription operations and state
 */

import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSubscription as useSubscriptionContext } from '@/context/SubscriptionContext';
import type { SubscriptionPackage, PurchaseResult, RestoreResult } from '@/services/subscriptionTypes';

interface UseSubscriptionOptions {
  autoRefresh?: boolean;
  showErrorAlerts?: boolean;
}

export const useSubscription = (options?: UseSubscriptionOptions) => {
  const {
    subscriptionStatus,
    availablePackages,
    isLoading: contextLoading,
    error: contextError,
    purchasePackage: contextPurchasePackage,
    restorePurchases: contextRestorePurchases,
    refreshStatus,
    clearError,
    trackPaywallEvent
  } = useSubscriptionContext();

  const { autoRefresh = true, showErrorAlerts = true } = options || {};

  // Local state for operation-specific loading
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [lastPurchaseResult, setLastPurchaseResult] = useState<PurchaseResult | null>(null);

  // Auto-refresh subscription status periodically
  useEffect(() => {
    if (!autoRefresh) return;

    const refreshInterval = setInterval(() => {
      refreshStatus();
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(refreshInterval);
  }, [autoRefresh, refreshStatus]);

  // Show error alerts if enabled
  useEffect(() => {
    if (!showErrorAlerts || !contextError) return;

    Alert.alert(
      'Subscription Error',
      contextError.message,
      [
        { text: 'Dismiss', onPress: clearError },
        { text: 'Retry', onPress: refreshStatus }
      ]
    );
  }, [contextError, showErrorAlerts, clearError, refreshStatus]);

  /**
   * Purchase a subscription with enhanced error handling
   */
  const purchaseSubscription = useCallback(async (
    plan: 'monthly' | 'yearly'
  ): Promise<boolean> => {
    try {
      setIsPurchasing(true);
      clearError();

      // Find the appropriate package
      const targetPackage = availablePackages.find(pkg => {
        if (plan === 'monthly') return pkg.packageType === 'MONTHLY';
        if (plan === 'yearly') return pkg.packageType === 'ANNUAL';
        return false;
      });

      if (!targetPackage) {
        throw new Error(`${plan} subscription package not found`);
      }

      const result = await contextPurchasePackage(targetPackage);
      setLastPurchaseResult(result);

      // Show success message
      Alert.alert(
        'Purchase Successful!',
        'Welcome to NumeraFlow Premium! All features are now unlocked.',
        [{ text: 'Get Started', style: 'default' }]
      );

      return true;
    } catch (error: any) {
      console.error('Purchase failed:', error);

      // Handle user cancellation gracefully
      if (error.code === 'PURCHASE_CANCELLED_ERROR' || 
          error.message?.includes('cancelled')) {
        trackPaywallEvent('purchase_cancelled', {
          plan,
          reason: 'user_cancelled'
        });
        return false;
      }

      // Show error alert
      if (showErrorAlerts) {
        Alert.alert(
          'Purchase Failed',
          error.message || 'Unable to complete purchase. Please try again.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retry', onPress: () => purchaseSubscription(plan) }
          ]
        );
      }

      return false;
    } finally {
      setIsPurchasing(false);
    }
  }, [availablePackages, contextPurchasePackage, clearError, showErrorAlerts, trackPaywallEvent]);

  /**
   * Restore purchases with user feedback
   */
  const restoreSubscription = useCallback(async (): Promise<boolean> => {
    try {
      setIsRestoring(true);
      clearError();

      const result = await contextRestorePurchases();

      if (result.restored) {
        Alert.alert(
          'Purchases Restored!',
          `Successfully restored ${result.activeSubscriptions.length} subscription(s).`,
          [{ text: 'Continue', style: 'default' }]
        );
      } else {
        Alert.alert(
          'No Purchases Found',
          'We couldn\'t find any previous purchases to restore.',
          [{ text: 'OK', style: 'default' }]
        );
      }

      return result.restored;
    } catch (error: any) {
      console.error('Restore failed:', error);

      if (showErrorAlerts) {
        Alert.alert(
          'Restore Failed',
          error.message || 'Unable to restore purchases. Please try again.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retry', onPress: restoreSubscription }
          ]
        );
      }

      return false;
    } finally {
      setIsRestoring(false);
    }
  }, [contextRestorePurchases, clearError, showErrorAlerts]);

  /**
   * Get formatted subscription information
   */
  const getSubscriptionInfo = useCallback(() => {
    if (!subscriptionStatus) {
      return {
        status: 'unknown',
        displayText: 'Loading...',
        isActive: false
      };
    }

    if (subscriptionStatus.isPremium) {
      const expiryDate = subscriptionStatus.expirationDate;
      const willRenew = subscriptionStatus.willRenew;
      
      let displayText = 'Premium Active';
      if (expiryDate) {
        const formatted = expiryDate.toLocaleDateString();
        displayText += willRenew 
          ? ` • Renews ${formatted}`
          : ` • Expires ${formatted}`;
      }

      return {
        status: 'premium',
        displayText,
        isActive: true,
        expirationDate: expiryDate,
        willRenew
      };
    }

    if (subscriptionStatus.isTrialActive) {
      const expiryDate = subscriptionStatus.expirationDate;
      const daysLeft = expiryDate 
        ? Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 0;

      return {
        status: 'trial',
        displayText: `Free Trial • ${daysLeft} days left`,
        isActive: true,
        expirationDate: expiryDate,
        daysLeft
      };
    }

    return {
      status: 'free',
      displayText: 'Free Version',
      isActive: false
    };
  }, [subscriptionStatus]);

  /**
   * Get available pricing options
   */
  const getPricingOptions = useCallback(() => {
    const monthlyPackage = availablePackages.find(pkg => pkg.packageType === 'MONTHLY');
    const yearlyPackage = availablePackages.find(pkg => pkg.packageType === 'ANNUAL');

    return {
      monthly: monthlyPackage ? {
        price: monthlyPackage.product.priceString,
        identifier: monthlyPackage.identifier,
        product: monthlyPackage.product
      } : null,
      yearly: yearlyPackage ? {
        price: yearlyPackage.product.priceString,
        identifier: yearlyPackage.identifier,
        product: yearlyPackage.product,
        savings: monthlyPackage && yearlyPackage ? 
          calculateSavings(monthlyPackage.product.price, yearlyPackage.product.price) : null
      } : null
    };
  }, [availablePackages]);

  // Helper function to calculate savings
  const calculateSavings = (monthlyPrice: number, yearlyPrice: number): number => {
    const yearlyMonthlyEquivalent = monthlyPrice * 12;
    return Math.round(((yearlyMonthlyEquivalent - yearlyPrice) / yearlyMonthlyEquivalent) * 100);
  };

  return {
    // Status
    subscriptionStatus,
    isLoading: contextLoading || isPurchasing || isRestoring,
    isPurchasing,
    isRestoring,
    error: contextError,
    
    // Actions
    purchaseSubscription,
    restoreSubscription,
    refreshStatus,
    clearError,
    
    // Information
    getSubscriptionInfo,
    getPricingOptions,
    availablePackages,
    lastPurchaseResult,
    
    // Utilities
    trackEvent: trackPaywallEvent
  };
};

/**
 * Simplified hook for just checking subscription status
 */
export const useSubscriptionStatus = () => {
  const { subscriptionStatus, isLoading } = useSubscriptionContext();
  
  return {
    isPremium: subscriptionStatus?.isPremium || false,
    isTrialActive: subscriptionStatus?.isTrialActive || false,
    isActive: subscriptionStatus?.isActive || false,
    subscriptionType: subscriptionStatus?.subscriptionType || 'none',
    expirationDate: subscriptionStatus?.expirationDate,
    willRenew: subscriptionStatus?.willRenew || false,
    isLoading
  };
};