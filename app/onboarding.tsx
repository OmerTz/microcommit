import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingSteps = [
  {
    id: '1',
    title: "Welcome to Your App!",
    description: "A clean template with authentication, onboarding, and customizable dashboard ready for your features.",
    icon: 'rocket',
    color: '#6366f1',
    bgColor: '#eef2ff',
  },
  {
    id: '2',
    title: "Easy Setup",
    description: "Get started quickly with pre-configured Supabase authentication and user management.",
    icon: 'settings',
    color: '#6366f1',
    bgColor: '#eef2ff',
  },
  {
    id: '3',
    title: "Customizable",
    description: "Built with TypeScript and Expo Router - modify and extend to fit your needs.",
    icon: 'code-slash',
    color: '#6366f1',
    bgColor: '#eef2ff',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < OnboardingSteps.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const handleComplete = async () => {
    try {
      console.log('[ONBOARDING] Completing onboarding...');

      // Save onboarding completion status
      await AsyncStorage.setItem('onboardingCompleted', 'true');

      console.log('[ONBOARDING] Onboarding completed successfully, redirecting to dashboard');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('[ONBOARDING] Error completing onboarding:', error);
      Alert.alert('Error', 'Failed to complete onboarding. Please try again.');
    }
  };

  const handleSkip = async () => {
    console.log('[ONBOARDING] Skipping onboarding, redirecting to dashboard');
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    router.replace('/(tabs)');
  };

  const renderStep = ({ item, index }) => {
    return (
      <View style={[styles.stepContainer, { width: SCREEN_WIDTH }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          <Ionicons name={item.icon} size={80} color={item.color} />
        </View>
        
        <Text style={styles.stepTitle}>{item.title}</Text>
        <Text style={styles.stepDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentIndex + 1) / OnboardingSteps.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
        
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton} testID="onboarding-skip-button">
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <FlatList
        ref={flatListRef}
        data={OnboardingSteps}
        renderItem={renderStep}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(newIndex);
        }}
        scrollEnabled={false}
      />

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {OnboardingSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevious}
          >
            <Ionicons name="chevron-back" size={24} color="#757575" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.nextButton, currentIndex === 0 && styles.nextButtonFull]}
          onPress={handleNext}
          testID="onboarding-next-button"
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === OnboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          {currentIndex < OnboardingSteps.length - 1 && (
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  progressContainer: {
    flex: 1,
    marginRight: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '600',
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  stepDescription: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#6366f1',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButtonText: {
    fontSize: 15,
    color: '#6b7280',
    marginLeft: 4,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  nextButtonFull: {
    flex: 1,
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 4,
  },
});