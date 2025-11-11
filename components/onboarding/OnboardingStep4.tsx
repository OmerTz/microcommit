import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { 
  StarsIcon, 
  CalendarIcon, 
  HeartIcon, 
  ClockIcon, 
  SparklesIcon, 
  UserIcon 
} from '@/constants/Icons';
import GlassCard from '@/components/ui/GlassCard';
import { t, tArray } from '@/constants/translations';

// Using welcome.features from translations as interests
const getInterests = () => {
  const features = tArray('welcome.features');
  return [
    { id: 'life-path', label: features[0] || 'Calculate your Life Path Number', icon: CalendarIcon },
    { id: 'destiny', label: features[1] || 'Discover your Destiny & Expression', icon: StarsIcon },
    { id: 'soul-urge', label: features[2] || 'Understand your Soul Urge', icon: HeartIcon },
    { id: 'daily-guidance', label: features[3] || 'Daily numerological guidance', icon: SparklesIcon },
    { id: 'compatibility', label: 'Numerological Compatibility', icon: UserIcon },
    { id: 'personal-growth', label: 'Personal Growth Insights', icon: ClockIcon },
  ];
};

interface OnboardingStep4Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  interests: string[];
  onToggleInterest: (interestId: string) => void;
  styles: any;
}

export const OnboardingStep4: React.FC<OnboardingStep4Props> = ({
  fadeAnim,
  slideAnim,
  interests,
  onToggleInterest,
  styles,
}) => {
  return (
    <Animated.View 
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[NumeraDesignSystem.colors.primary, NumeraDesignSystem.colors.primaryLight]}
          style={styles.iconGradient}
        >
          <SparklesIcon size={32} color="#FFFFFF" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{t('calculation.title')}</Text>
      <Text style={styles.subtitle}>{t('calculation.subtitle')}</Text>
      
      <View style={styles.interestsGrid}>
        {getInterests().map((interest) => {
          const Icon = interest.icon;
          const isSelected = interests && interests.includes(interest.id);
          
          return (
            <TouchableOpacity
              key={interest.id}
              testID={`interest-${interest.id}`}
              onPress={() => onToggleInterest && onToggleInterest(interest.id)}
              activeOpacity={0.8}
            >
              <GlassCard variant={isSelected ? "medium" : "light"} animated={false}>
                <View style={[
                  styles.interestCard,
                  isSelected && styles.interestCardSelected,
                ]}>
                  <Icon 
                    size={24} 
                    color={isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"} 
                  />
                  <Text style={[
                    styles.interestLabel,
                    isSelected && styles.interestLabelSelected,
                  ]}>
                    {interest.label}
                  </Text>
                </View>
              </GlassCard>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};