/**
 * Premium Access Hook
 * Custom hook for checking premium feature access and managing paywall triggers
 */

import { useCallback } from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import type { FeatureAccess } from '@/services/subscriptionTypes';

interface UsePremiumAccessOptions {
  feature?: string;
  triggerPaywall?: boolean;
}

export const usePremiumAccess = (options?: UsePremiumAccessOptions) => {
  const {
    subscriptionStatus,
    isPremium,
    isTrialActive,
    hasPremiumAccess,
    setShowPaywall,
    trackPaywallEvent
  } = useSubscription();

  const { feature, triggerPaywall = true } = options || {};

  /**
   * Check if user has access to a premium feature
   */
  const checkAccess = useCallback((featureName?: string): FeatureAccess => {
    const targetFeature = featureName || feature;
    
    if (!subscriptionStatus) {
      return {
        hasAccess: false,
        reason: 'free',
        message: 'Subscription status not loaded'
      };
    }

    if (subscriptionStatus.isPremium) {
      return {
        hasAccess: true,
        reason: 'premium',
        message: 'Premium subscription active'
      };
    }

    if (subscriptionStatus.isTrialActive) {
      return {
        hasAccess: true,
        reason: 'trial',
        message: 'Free trial active'
      };
    }

    // Check if subscription expired
    if (subscriptionStatus.expirationDate && 
        subscriptionStatus.expirationDate < new Date()) {
      return {
        hasAccess: false,
        reason: 'expired',
        message: 'Subscription has expired'
      };
    }

    return {
      hasAccess: false,
      reason: 'free',
      message: 'Premium subscription required'
    };
  }, [subscriptionStatus, feature]);

  /**
   * Require premium access - shows paywall if not premium
   */
  const requirePremium = useCallback((featureName?: string): boolean => {
    const access = checkAccess(featureName);
    
    if (!access.hasAccess && triggerPaywall) {
      // Track paywall trigger
      trackPaywallEvent('paywall_shown', {
        feature: featureName || feature,
        reason: access.reason,
        trigger: 'premium_required'
      });
      
      setShowPaywall(true);
      return false;
    }
    
    return access.hasAccess;
  }, [checkAccess, triggerPaywall, feature, trackPaywallEvent, setShowPaywall]);

  /**
   * Get premium status with detailed information
   */
  const getPremiumStatus = useCallback(() => {
    return {
      isPremium,
      isTrialActive,
      hasAnyAccess: isPremium || isTrialActive,
      subscriptionType: subscriptionStatus?.subscriptionType || 'none',
      expirationDate: subscriptionStatus?.expirationDate || null,
      willRenew: subscriptionStatus?.willRenew || false,
      entitlements: subscriptionStatus?.entitlements || []
    };
  }, [isPremium, isTrialActive, subscriptionStatus]);

  /**
   * Check access to specific premium features
   */
  const canAccess = {
    // Advanced Numerology Reports
    karmicDebtAnalysis: () => checkAccess('karmic_debt').hasAccess,
    hiddenPassionNumbers: () => checkAccess('hidden_passion').hasAccess,
    maturityNumber: () => checkAccess('maturity_number').hasAccess,
    bridgeNumbers: () => checkAccess('bridge_numbers').hasAccess,
    challengeNumbers: () => checkAccess('challenge_numbers').hasAccess,
    pinnacleNumbers: () => checkAccess('pinnacle_numbers').hasAccess,
    
    // Enhanced Daily Guidance
    enhancedDailyGuidance: () => checkAccess('enhanced_daily').hasAccess,
    luckyNumberSequences: () => checkAccess('lucky_sequences').hasAccess,
    cosmicTiming: () => checkAccess('cosmic_timing').hasAccess,
    colorCrystalRecommendations: () => checkAccess('color_crystal').hasAccess,
    personalizedAffirmations: () => checkAccess('personalized_affirmations').hasAccess,
    
    // Relationship Compatibility
    unlimitedCompatibility: () => checkAccess('unlimited_compatibility').hasAccess,
    compatibilityScoring: () => checkAccess('compatibility_scoring').hasAccess,
    relationshipCycles: () => checkAccess('relationship_cycles').hasAccess,
    communicationStrategies: () => checkAccess('communication_strategies').hasAccess,
    familyNumerology: () => checkAccess('family_numerology').hasAccess,
    businessPartnership: () => checkAccess('business_partnership').hasAccess,
    
    // Professional Charts & Reports
    pdfReports: () => checkAccess('pdf_reports').hasAccess,
    professionalCharts: () => checkAccess('professional_charts').hasAccess,
    nameAnalysis: () => checkAccess('name_analysis').hasAccess,
    babyNameSuggestions: () => checkAccess('baby_names').hasAccess,
    weddingDateOptimization: () => checkAccess('wedding_dates').hasAccess,
    careerGuidance: () => checkAccess('career_guidance').hasAccess,
    
    // AI Numerology Companion
    unlimitedAIQuestions: () => checkAccess('unlimited_ai').hasAccess,
    personalizedInterpretations: () => checkAccess('personalized_ai').hasAccess,
    learningMode: () => checkAccess('ai_learning').hasAccess,
    voiceInteraction: () => checkAccess('voice_ai').hasAccess,
    contextAwareResponses: () => checkAccess('context_ai').hasAccess
  };

  /**
   * Feature gating helpers
   */
  const withPremiumAccess = useCallback(<T extends any[]>(
    callback: (...args: T) => void,
    featureName?: string
  ) => {
    return (...args: T) => {
      if (requirePremium(featureName)) {
        callback(...args);
      }
    };
  }, [requirePremium]);

  const ifPremium = useCallback(<T>(
    premiumValue: T,
    freeValue?: T,
    featureName?: string
  ): T | undefined => {
    const access = checkAccess(featureName);
    return access.hasAccess ? premiumValue : freeValue;
  }, [checkAccess]);

  return {
    // Core access checking
    checkAccess,
    requirePremium,
    hasPremiumAccess,
    
    // Status information
    getPremiumStatus,
    isPremium,
    isTrialActive,
    
    // Feature-specific access checks
    canAccess,
    
    // Helper utilities
    withPremiumAccess,
    ifPremium,
    
    // Subscription details
    subscriptionStatus,
    expirationDate: subscriptionStatus?.expirationDate,
    willRenew: subscriptionStatus?.willRenew
  };
};