/**
 * Help Tooltip Component - Refactored
 * Provides contextual help and onboarding guidance
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { UserEngagementManager, OnboardingTooltipManager, HelpTooltip as HelpTooltipType } from '@/utils/userEngagement';
import { helpTooltipStyles as styles } from './HelpTooltipStyles';
import { t } from './HelpTooltipTranslations';
import { calculateTooltipPosition, getArrowStyle, TooltipPosition } from './HelpTooltipUtils';

interface HelpTooltipProps {
  tooltip: HelpTooltipType;
  targetRef?: React.RefObject<View>;
  onDismiss: () => void;
  onNext?: () => void;
  showNext?: boolean;
  userId: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  tooltip,
  targetRef,
  onDismiss,
  onNext,
  showNext = false,
  userId,
}) => {
  const [tooltipManager] = useState(() => OnboardingTooltipManager.getInstance());
  const [engagementManager] = useState(() => UserEngagementManager.getInstance());
  const [targetLayout, setTargetLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [tooltipLayout, setTooltipLayout] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [position, setPosition] = useState<TooltipPosition>('bottom');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  // Calculate target position
  useEffect(() => {
    if (targetRef?.current) {
      targetRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTargetLayout({ x: pageX, y: pageY, width, height });
      });
    }
  }, [targetRef]);

  // Animate in when tooltip appears
  useEffect(() => {
    const animateIn = () => {
      Animated.parallel([
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };

    animateIn();
  }, [fadeAnim, scaleAnim, overlayAnim]);

  // Handle dismiss with tracking
  const handleDismiss = async () => {
    tooltipManager.markTooltipShown(tooltip.id);
    await tooltipManager.saveShownTooltips(userId);
    await engagementManager.trackFeatureDiscovery(tooltip.targetFeature, userId);

    // Animate out
    Animated.parallel([
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  // Handle next with tracking
  const handleNext = async () => {
    if (onNext) {
      await engagementManager.trackOnboardingProgress('tooltip_next', userId);
      onNext();
    }
  };

  // Get tooltip position and style
  const getTooltipStyle = () => {
    if (!targetLayout || !tooltipLayout.width || !tooltipLayout.height) {
      return { opacity: 0 };
    }

    const { position: calculatedPosition, style } = calculateTooltipPosition(
      targetLayout,
      tooltipLayout,
      screenWidth,
      screenHeight
    );
    
    setPosition(calculatedPosition);
    return style;
  };

  // Handle tooltip layout measurement
  const handleTooltipLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height });
  };

  // Render spotlight effect around target
  const renderSpotlight = () => {
    if (!targetLayout) return null;

    const spotlightRadius = 8;
    const highlightStyle = {
      position: 'absolute' as const,
      left: targetLayout.x - 4,
      top: targetLayout.y - 4,
      width: targetLayout.width + 8,
      height: targetLayout.height + 8,
      borderRadius: spotlightRadius,
      borderWidth: 3,
      borderColor: '#6366f1',
      backgroundColor: 'transparent',
    };

    return <Animated.View style={[highlightStyle, { opacity: overlayAnim }]} />;
  };

  return (
    <Modal transparent visible animationType="none">
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.7],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Spotlight */}
      {renderSpotlight()}

      {/* Tooltip */}
      <Animated.View
        style={[
          styles.tooltip,
          getTooltipStyle(),
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        onLayout={handleTooltipLayout}
      >
        {/* Arrow */}
        <View style={getArrowStyle(position)} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{tooltip.title}</Text>
          <Text style={styles.description}>{tooltip.description}</Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
              <Text style={styles.dismissText}>{t('help.tooltip.dismiss')}</Text>
            </TouchableOpacity>
            
            {showNext && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextText}>{t('help.tooltip.next')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default HelpTooltip;