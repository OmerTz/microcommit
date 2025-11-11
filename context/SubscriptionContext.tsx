/**
 * Subscription Context - State Management for RevenueCat Integration
 * Manages subscription state and provides premium access control
 */

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode,
  useCallback 
} from 'react';

import { subscriptionService } from '@/services/subscriptionService';
import type { 
  SubscriptionStatus, 
  SubscriptionPackage, 
  PurchaseResult,
  SubscriptionError,
  RestoreResult
} from '@/services/subscriptionTypes';

interface SubscriptionContextType {
  // Status
  subscriptionStatus: SubscriptionStatus | null;
  availablePackages: SubscriptionPackage[];
  isLoading: boolean;
  error: SubscriptionError | null;
  
  // Premium Access
  isPremium: boolean;
  isTrialActive: boolean;
  hasPremiumAccess: (feature?: string) => boolean;
  
  // Actions
  purchasePackage: (pkg: SubscriptionPackage) => Promise<PurchaseResult>;
  restorePurchases: () => Promise<RestoreResult>;
  refreshStatus: () => Promise<void>;
  clearError: () => void;
  
  // Paywall Management
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  
  // Analytics
  trackPaywallEvent: (event: string, properties?: Record<string, any>) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
  apiKey: string;
  appUserId?: string;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
  apiKey,
  appUserId
}) => {
  // State
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [availablePackages, setAvailablePackages] = useState<SubscriptionPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<SubscriptionError | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize subscription service on mount
  useEffect(() => {
    let isMounted = true;

    const initializeSubscriptionService = async () => {
      try {
        setIsLoading(true);
        
        if (!subscriptionService.isInitialized()) {
          await subscriptionService.initialize({
            apiKey,
            appUserId
          });
        }

        if (isMounted) {
          setInitialized(true);
          await loadSubscriptionData();
        }
      } catch (err: any) {
        // Suppress RevenueCat mock mode errors (invalid API key expected)
        if (!err.message?.includes('Invalid API Key')) {
          console.error('Failed to initialize subscription service:', err);
        }
        if (isMounted) {
          setError({
            code: err.code || 'INIT_ERROR',
            message: err.message || 'Failed to initialize subscription service'
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSubscriptionService();

    return () => {
      isMounted = false;
    };
  }, [apiKey, appUserId]);

  // Set up customer info update listener
  useEffect(() => {
    if (!initialized) return;

    const updateListener = subscriptionService.setCustomerInfoUpdateListener((customerInfo) => {
      console.log('Customer info updated:', customerInfo);
      refreshStatus();
    });

    // Cleanup is handled by RevenueCat SDK
  }, [initialized]);

  // Load subscription data (packages and status)
  const loadSubscriptionData = async () => {
    try {
      setIsLoading(true);
      
      const [packages, status] = await Promise.all([
        subscriptionService.getAvailablePackages(),
        subscriptionService.getSubscriptionStatus()
      ]);

      setAvailablePackages(packages);
      setSubscriptionStatus(status);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load subscription data:', err);
      setError({
        code: err.code || 'LOAD_ERROR',
        message: err.message || 'Failed to load subscription data'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Purchase a subscription package
  const purchasePackage = async (pkg: SubscriptionPackage): Promise<PurchaseResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      trackPaywallEvent('purchase_started', {
        package_identifier: pkg.identifier,
        product_id: pkg.product.identifier,
        price: pkg.product.price
      });

      const result = await subscriptionService.purchasePackage(pkg);
      
      // Refresh status after successful purchase
      await refreshStatus();
      
      trackPaywallEvent('purchase_completed', {
        package_identifier: pkg.identifier,
        product_id: pkg.product.identifier,
        customer_id: result.customerInfo.originalAppUserId
      });

      return result;
    } catch (err: any) {
      console.error('Purchase failed:', err);
      
      const subscriptionError = {
        code: err.code || 'PURCHASE_ERROR',
        message: err.message || 'Purchase failed'
      };
      
      setError(subscriptionError);
      
      trackPaywallEvent('purchase_failed', {
        package_identifier: pkg.identifier,
        error_code: subscriptionError.code,
        error_message: subscriptionError.message
      });
      
      throw subscriptionError;
    } finally {
      setIsLoading(false);
    }
  };

  // Restore previous purchases
  const restorePurchases = async (): Promise<RestoreResult> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await subscriptionService.restorePurchases();
      
      // Refresh status after restore
      await refreshStatus();
      
      trackPaywallEvent('purchases_restored', {
        restored: result.restored,
        active_subscriptions: result.activeSubscriptions
      });

      return result;
    } catch (err: any) {
      console.error('Restore failed:', err);
      
      const subscriptionError = {
        code: err.code || 'RESTORE_ERROR',
        message: err.message || 'Failed to restore purchases'
      };
      
      setError(subscriptionError);
      throw subscriptionError;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh subscription status
  const refreshStatus = useCallback(async () => {
    if (!initialized) return;

    try {
      const status = await subscriptionService.getSubscriptionStatus();
      setSubscriptionStatus(status);
    } catch (err: any) {
      console.error('Failed to refresh subscription status:', err);
      // Don't set error for refresh failures to avoid disrupting UX
    }
  }, [initialized]);

  // Clear error state
  const clearError = () => {
    setError(null);
    subscriptionService.clearError();
  };

  // Check premium access
  const hasPremiumAccess = useCallback((feature?: string): boolean => {
    if (!subscriptionStatus) return false;
    return subscriptionStatus.isPremium || subscriptionStatus.isTrialActive;
  }, [subscriptionStatus]);

  // Track paywall analytics events
  const trackPaywallEvent = (event: string, properties?: Record<string, any>) => {
    // Implement analytics tracking here
    console.log('Paywall Event:', event, properties);
    
    // You can integrate with your analytics service here
    // Example: Analytics.track(event, properties);
  };

  // Computed values
  const isPremium = subscriptionStatus?.isPremium || false;
  const isTrialActive = subscriptionStatus?.isTrialActive || false;

  const value: SubscriptionContextType = {
    // Status
    subscriptionStatus,
    availablePackages,
    isLoading,
    error,
    
    // Premium Access
    isPremium,
    isTrialActive,
    hasPremiumAccess,
    
    // Actions
    purchasePackage,
    restorePurchases,
    refreshStatus,
    clearError,
    
    // Paywall Management
    showPaywall,
    setShowPaywall,
    
    // Analytics
    trackPaywallEvent
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};