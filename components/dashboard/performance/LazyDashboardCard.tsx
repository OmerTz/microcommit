/**
 * LazyDashboardCard - Performance wrapper for dashboard cards
 * Provides lazy loading and optimization for dashboard components
 */

import React, { Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';

interface LazyDashboardCardProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
}

const LoadingFallback = () => (
  <View style={{
    padding: NumeraDesignSystem.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  }}>
    <ActivityIndicator size="small" color={NumeraDesignSystem.colors.primary[500]} />
  </View>
);

export const LazyDashboardCard: React.FC<LazyDashboardCardProps> = ({ 
  children, 
  fallback: Fallback = LoadingFallback 
}) => {
  return (
    <Suspense fallback={<Fallback />}>
      {children}
    </Suspense>
  );
};

export default LazyDashboardCard;