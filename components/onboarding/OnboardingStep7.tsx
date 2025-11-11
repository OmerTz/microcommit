import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { SparklesIcon, InfoIcon } from '@/constants/Icons';
import { t } from '@/constants/translations';
import { NumberDisplay } from './step7/NumberDisplay';
import type { OnboardingStep7Props } from './step7/types';

const OnboardingStep7: React.FC<OnboardingStep7Props> = ({
  fadeAnim,
  slideAnim,
  name,
  styles,
  results,
  onContinue
}) => {
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Show insights after delay
    setTimeout(() => setShowInsights(true), 1000);
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <SparklesIcon size={48} color={NumeraDesignSystem.colors.primary} />
          <Text style={styles.welcomeText}>{t('resultsPreview.welcomeText')}</Text>
          <Text style={styles.title}>{t('resultsPreview.title')}</Text>
          <Text style={styles.subtitle}>{t('resultsPreview.subtitle')}</Text>
        </View>

        <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
          {/* Life Path Number */}
          {results.lifePath && (
            <NumberDisplay
              title={t('resultsPreview.lifePathLabel')}
              number={results.lifePath.number}
              description={results.lifePath.meaning || 'Your life\'s journey and purpose'}
              color={NumeraDesignSystem.colors.primary}
            />
          )}

          {/* Expression Number */}
          {results.expression && (
            <NumberDisplay
              title="Expression Number"
              number={results.expression.number}
              description={results.expression.meaning || 'Your natural talents and abilities'}
              color={NumeraDesignSystem.colors.accent}
            />
          )}

          {/* Soul Urge Number */}
          {results.soulUrge && (
            <NumberDisplay
              title="Soul Urge Number"
              number={results.soulUrge.number}
              description={results.soulUrge.meaning || 'Your inner desires and motivations'}
              color={NumeraDesignSystem.colors.secondary}
            />
          )}

          {/* Additional Results */}
          {showInsights && (
            <View style={styles.insightsContainer}>
              <View style={styles.insightHeader}>
                <InfoIcon size={24} color={NumeraDesignSystem.colors.primary} />
                <Text style={styles.insightTitle}>Personal Insights</Text>
              </View>
              
              {results.personality && (
                <Text style={styles.insightText}>
                  Your personality number {results.personality.number} reveals how others perceive you.
                </Text>
              )}
              
              {/* Personal Year Cycle */}
              {results.personalCycles?.currentYear && (
                <Text style={styles.insightText}>
                  You're in a {results.personalCycles.currentYear} personalYear - a time of {results.personalCycles.yearMeaning || 'growth and development'}.
                </Text>
              )}
              
              {/* Personal Month Cycle */}
              {results.personalCycles?.currentMonth && (
                <Text style={styles.insightText}>
                  This personalMonth brings {results.personalCycles.monthMeaning || 'unique opportunities'}.
                </Text>
              )}
              
              {/* Personal Day Cycle */}
              {results.personalCycles?.currentDay && (
                <Text style={styles.insightText}>
                  Today's personalDay energy: {results.personalCycles.dayMeaning || 'balanced and focused'}.
                </Text>
              )}
              
              {/* Mystical Quote */}
              <View style={styles.mysticalQuoteContainer}>
                <Text style={styles.mysticalQuote}>
                  "{t('resultsPreview.mysticalQuote')}"
                </Text>
              </View>
              
              {/* Save Profile Section */}
              <View style={styles.profileSection}>
                <Text style={styles.saveProfileTitle}>{t('resultsPreview.saveProfileTitle')}</Text>
                <Text style={styles.saveProfileText}>{t('resultsPreview.saveProfileText')}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <LinearGradient
            colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.accent]}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export { OnboardingStep7 };
export default OnboardingStep7;