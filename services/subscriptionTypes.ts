/**
 * Subscription types for MicroCommit
 */

export interface SubscriptionPackage {
  identifier: string;
  productId: string;
  title: string;
  description: string;
  price: string;
  pricePerMonth?: string;
  period: 'monthly' | 'annual' | 'lifetime';
  isTrial?: boolean;
  trialDays?: number;
  isPopular?: boolean;
}

export interface PurchaseResult {
  success: boolean;
  error?: string;
  customerInfo?: any;
}

export interface RestoreResult {
  success: boolean;
  error?: string;
  customerInfo?: any;
}

export interface FeatureAccess {
  hasAccess: boolean;
  reason?: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  isPremium: boolean;
  expirationDate?: Date;
  productIdentifier?: string;
  willRenew?: boolean;
  isInGracePeriod?: boolean;
}
