/**
 * Advanced Navigation Bar Component
 * Provides smooth animations, shortcuts, and enhanced navigation
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { AdvancedNavigationManager, NavigationShortcut, BreadcrumbItem } from '@/utils/advancedNavigation';
import { PerformanceMonitor } from '@/utils/performanceOptimization';

interface Props {
  showBreadcrumbs?: boolean;
  showShortcuts?: boolean;
  animationType?: 'slide' | 'fade' | 'scale';
}

export const AdvancedNavigationBar: React.FC<Props> = ({
  showBreadcrumbs = true,
  showShortcuts = true,
  animationType = 'slide',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationManager] = useState(() => new AdvancedNavigationManager(router));
  const [shortcuts, setShortcuts] = useState<NavigationShortcut[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [animatedValue] = useState(new Animated.Value(0));

  // Initialize navigation and load shortcuts
  useEffect(() => {
    const loadShortcuts = async () => {
      const frequentShortcuts = navigationManager.getFrequentShortcuts(4);
      setShortcuts(frequentShortcuts);
    };

    const loadBreadcrumbs = () => {
      const currentBreadcrumbs = navigationManager.generateBreadcrumbs(pathname);
      setBreadcrumbs(currentBreadcrumbs);
    };

    loadShortcuts();
    loadBreadcrumbs();
    
    // Animate in
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [pathname, navigationManager, animatedValue]);

  // Handle navigation with tracking
  const handleNavigation = (route: string) => {
    PerformanceMonitor.getInstance().markMilestone('navigation-start');
    navigationManager.navigateWithAnimation(route, animationType);
  };

  // Render breadcrumbs
  const renderBreadcrumbs = () => {
    if (!showBreadcrumbs || breadcrumbs.length <= 1) return null;

    return (
      <View style={styles.breadcrumbsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.breadcrumbsContent}
        >
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.route}>
              <TouchableOpacity
                style={[
                  styles.breadcrumbItem,
                  breadcrumb.isActive && styles.activeBreadcrumb,
                ]}
                onPress={() => !breadcrumb.isActive && handleNavigation(breadcrumb.route)}
              >
                <Text
                  style={[
                    styles.breadcrumbText,
                    breadcrumb.isActive && styles.activeBreadcrumbText,
                  ]}
                >
                  {breadcrumb.label}
                </Text>
              </TouchableOpacity>
              {index < breadcrumbs.length - 1 && (
                <Text style={styles.breadcrumbSeparator}>›</Text>
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    );
  };

  // Render quick access shortcuts
  const renderShortcuts = () => {
    if (!showShortcuts || shortcuts.length === 0) return null;

    return (
      <View style={styles.shortcutsContainer}>
        <Text style={styles.shortcutsTitle}>Quick Access</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shortcutsContent}
        >
          {shortcuts.map((shortcut) => (
            <TouchableOpacity
              key={shortcut.id}
              style={styles.shortcutItem}
              onPress={() => handleNavigation(shortcut.route)}
            >
              <Text style={styles.shortcutIcon}>{shortcut.icon}</Text>
              <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
              {(shortcut.frequency ?? 0) > 0 && (
                <View style={styles.frequencyBadge}>
                  <Text style={styles.frequencyText}>{shortcut.frequency}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderBreadcrumbs()}
      {renderShortcuts()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  
  // Breadcrumbs styles
  breadcrumbsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  breadcrumbsContent: {
    alignItems: 'center',
  },
  breadcrumbItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBreadcrumb: {
    backgroundColor: '#6366f1',
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeBreadcrumbText: {
    color: 'white',
    fontWeight: '600',
  },
  breadcrumbSeparator: {
    fontSize: 16,
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  
  // Shortcuts styles
  shortcutsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  shortcutsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  shortcutsContent: {
    gap: 12,
  },
  shortcutItem: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    minWidth: 80,
    position: 'relative',
  },
  shortcutIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  shortcutLabel: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  frequencyBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frequencyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
});

export default AdvancedNavigationBar;