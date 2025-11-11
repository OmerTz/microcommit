/**
 * Lazy Dashboard Card Component
 * Provides lazy loading and performance optimization for dashboard cards
 */

import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { CacheManager, MemoryOptimizer, useLazyLoading } from '@/utils/performanceOptimization';

interface LazyDashboardCardProps {
  cardType: 'affirmation' | 'luckyNumbers' | 'timeGuidance' | 'personalDay';
  data?: any;
  loading?: boolean;
  onLoad?: () => void;
  children?: React.ReactNode;
  cacheKey?: string;
  placeholder?: React.ReactNode;
}

const LazyDashboardCard: React.FC<LazyDashboardCardProps> = memo(({
  cardType,
  data,
  loading = false,
  onLoad,
  children,
  cacheKey,
  placeholder,
}) => {
  const [cacheManager] = useState(() => CacheManager.getInstance());
  const [memoryOptimizer] = useState(() => MemoryOptimizer.getInstance());
  const [cachedData, setCachedData] = useState<any>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { isVisible, hasLoaded, onLayout } = useLazyLoading();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardRef = useRef<View>(null);

  // Track component usage for memory optimization
  useEffect(() => {
    memoryOptimizer.trackComponentUsage(`LazyDashboardCard-${cardType}`);
  }, [memoryOptimizer, cardType]);

  // Load cached data
  useEffect(() => {
    const loadCachedData = async () => {
      if (cacheKey) {
        const cached = await cacheManager.getCache(cacheKey, true);
        if (cached) {
          setCachedData(cached);
          setIsDataLoaded(true);
        }
      }
    };

    loadCachedData();
  }, [cacheKey, cacheManager]);

  // Cache new data
  useEffect(() => {
    const cacheData = async () => {
      if (data && cacheKey && !loading) {
        await cacheManager.setCache(
          cacheKey,
          data,
          getCacheExpiration(cardType),
          shouldPersistCache(cardType)
        );
      }
    };

    cacheData();
  }, [data, cacheKey, loading, cacheManager, cardType]);

  // Trigger load when visible
  useEffect(() => {
    if (isVisible && !isDataLoaded && !loading) {
      onLoad?.();
      setIsDataLoaded(true);
    }
  }, [isVisible, isDataLoaded, loading, onLoad]);

  // Animate in when data is loaded
  useEffect(() => {
    if ((data || cachedData) && hasLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [data, cachedData, hasLoaded, fadeAnim]);

  // Render loading placeholder
  const renderLoadingState = () => {
    if (placeholder) return placeholder;

    return (
      <View style={[styles.card, styles.loadingCard]}>
        <View style={styles.loadingContent}>
          <ActivityIndicator color="#6366f1" size="small" />
          <Text style={styles.loadingText}>{getLoadingText(cardType)}</Text>
        </View>
      </View>
    );
  };

  // Render skeleton placeholder
  const renderSkeleton = () => (
    <View style={[styles.card, styles.skeletonCard]}>
      <View style={styles.skeletonHeader} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
      </View>
    </View>
  );

  // Determine what to render
  const getCardContent = () => {
    const currentData = data || cachedData;
    
    if (loading && !currentData) {
      return renderLoadingState();
    }

    if (!isVisible && !hasLoaded) {
      return renderSkeleton();
    }

    if (!currentData) {
      return renderLoadingState();
    }

    return children;
  };

  return (
    <View style={styles.container} onLayout={onLayout} ref={cardRef}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {getCardContent()}
      </Animated.View>
    </View>
  );
});

LazyDashboardCard.displayName = 'LazyDashboardCard';

// Helper functions
const getCacheExpiration = (cardType: string): number => {
  switch (cardType) {
    case 'personalDay':
      return 24 * 60 * 60 * 1000; // 24 hours
    case 'affirmation':
      return 24 * 60 * 60 * 1000; // 24 hours
    case 'luckyNumbers':
      return 12 * 60 * 60 * 1000; // 12 hours
    case 'timeGuidance':
      return 6 * 60 * 60 * 1000; // 6 hours
    default:
      return 60 * 60 * 1000; // 1 hour
  }
};

const shouldPersistCache = (cardType: string): boolean => {
  return ['personalDay', 'affirmation'].includes(cardType);
};

const getLoadingText = (cardType: string): string => {
  const texts = {
    personalDay: 'Loading your personal day...',
    affirmation: 'Preparing your affirmation...',
    luckyNumbers: 'Calculating lucky numbers...',
    timeGuidance: 'Optimizing time guidance...',
  };
  
  return texts[cardType] || 'Loading...';
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  animatedContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Loading states
  loadingCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Skeleton states
  skeletonCard: {
    opacity: 0.6,
  },
  skeletonHeader: {
    height: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 16,
    width: '60%',
  },
  skeletonContent: {
    gap: 8,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  skeletonLineShort: {
    width: '80%',
  },
});

export default LazyDashboardCard;