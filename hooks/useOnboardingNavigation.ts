import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { router } from 'expo-router';
import { Alert } from '@/utils/webAlert';
import { t } from '@/constants/translations';
import { useAuth } from '@/context/AuthContext';
import { 
  OnboardingData, 
  calculateZodiacSign, 
  convertTo24HourFormat
} from '@/utils/onboardingHelpers';

export const useOnboardingNavigation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');
  const { signUp } = useAuth();
  
  // Account creation fields for Step 8
  const [accountData, setAccountData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeDailyInsights: true,
    subscribeWeeklyReports: true
  });
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(() => ({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    interests: [],
    notificationsEnabled: false,
    numerologyResults: null,
  }));

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const showError = (message: string) => {
    Alert.alert('Error', message);
  };

  const validateCurrentStep = (): boolean => {
    // Clear previous validation error
    setValidationError('');
    
    // Ensure onboarding data exists
    if (!onboardingData) {
      console.error('[VALIDATION] onboardingData is null/undefined');
      return false;
    }
    
    // Validation checks
    if (currentStep === 0 && (!onboardingData.name || !onboardingData.name.trim())) {
      setValidationError(t('errors.validation.firstNameRequired'));
      return false;
    }
    // Birth date is optional for numerology calculations
    // if (currentStep === 1 && !onboardingData.birthDate) {
    //   setValidationError(t('errors.validation.birthDateRequired'));
    //   return false;
    // }
    if (currentStep === 4 && (!onboardingData.interests || onboardingData.interests.length === 0)) {
      setValidationError(t('errors.validation.interestsRequired'));
      return false;
    }
    
    return true;
  };

  const handleNext = async () => {
    // Handle next navigation step
    console.log('[ONBOARDING] handleNext called, currentStep:', currentStep);
    console.log('[ONBOARDING] onboardingData:', onboardingData);
    
    // Prevent multiple taps during async operations
    if (isLoading) {
      console.log('[ONBOARDING] Already loading, ignoring tap');
      return;
    }

    // Validate current step
    if (!validateCurrentStep()) {
      console.log('[ONBOARDING] Validation failed for step:', currentStep);
      return;
    }

    if (currentStep === 5) {
      // Move to calculation step
      setCurrentStep(6);
      return;
    }

    if (currentStep === 6) {
      // Calculation step - handled by onCalculationComplete
      return;
    }

    if (currentStep === 7) {
      // Move from results to account creation step
      setCurrentStep(8);
      return;
    }

    if (currentStep === 8) {
      // Account creation step - implement real Supabase authentication
      setIsLoading(true);
      try {
        console.log('[ONBOARDING] Creating authenticated user account...');
        
        if (!onboardingData) {
          console.error('[ONBOARDING] No onboarding data available');
          showError(t('errors.validation.missingData'));
          return;
        }
        
        if (!accountData.email || !accountData.password) {
          console.error('[ONBOARDING] Missing email or password');
          showError('Please enter email and password');
          return;
        }
        
        const zodiacSign = onboardingData.birthDate ? calculateZodiacSign(onboardingData.birthDate) : '';
        const convertedBirthTime = convertTo24HourFormat(onboardingData.birthTime || '');
        
        // Create authenticated user with Supabase
        const userData = {
          name: onboardingData.name || '',
          birth_date: onboardingData.birthDate || '',
          birth_time: convertedBirthTime || onboardingData.birthTime,
          birth_place: onboardingData.birthLocation || ''
        };
        
        await signUp(accountData.email, accountData.password, userData);
        console.log('[ONBOARDING] User account created successfully');
        
        // Import local storage utilities to clear any temporary data
        const { markOnboardingCompleted } = await import('@/utils/asyncStorage');
        
        // Mark onboarding as completed
        await markOnboardingCompleted();
        console.log('[ONBOARDING] Onboarding marked as completed');
        
        // Navigate to dashboard - user will be authenticated via AuthContext
        console.log('[ONBOARDING] Navigating to dashboard with authenticated user');
        router.replace('/(tabs)');
        
      } catch (error: any) {
        console.error('[ONBOARDING] Error creating user account:', error);
        showError(error?.message || t('errors.network.serverError'));
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simple step transition without fade animation to avoid reconciliation issues
      console.log('[ONBOARDING] Moving from step', currentStep, 'to step', currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (interestId: string) => {
    setOnboardingData(prev => {
      const currentInterests = prev?.interests || [];
      return {
        ...prev,
        interests: currentInterests.includes(interestId)
          ? currentInterests.filter(i => i !== interestId)
          : [...currentInterests, interestId],
      };
    });
  };

  const handleCalculationComplete = (results: any) => {
    // Numerology calculation completed
    console.log('[NAVIGATION] handleCalculationComplete called with results:', results);
    console.log('[NAVIGATION] Current step before update:', currentStep);
    
    setOnboardingData(prev => ({
      ...prev,
      numerologyResults: results,
    }));
    
    // Move to results step
    console.log('[NAVIGATION] Moving from step 6 to step 7');
    setCurrentStep(7);
    console.log('[NAVIGATION] Step updated to 7');
  };

  const updateAccountData = (field: keyof typeof accountData, value: any) => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    currentStep,
    setCurrentStep,
    isLoading,
    currentUserId,
    setCurrentUserId,
    validationError,
    onboardingData,
    setOnboardingData,
    accountData,
    updateAccountData,
    fadeAnim,
    slideAnim,
    scaleAnim,
    progressAnim,
    handleNext,
    handleBack,
    toggleInterest,
    handleCalculationComplete,
  };
};