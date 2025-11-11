import React from 'react';
import { View, Animated } from 'react-native';
import { AccountSetupScreen } from '@/src/components/onboarding/AccountSetupScreen';

interface OnboardingStep8Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  styles: any;
  accountData: {
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
    subscribeDailyInsights: boolean;
    subscribeWeeklyReports: boolean;
  };
  updateAccountData: (field: string, value: any) => void;
  onCreateAccount: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const OnboardingStep8: React.FC<OnboardingStep8Props> = ({
  fadeAnim,
  slideAnim,
  styles,
  accountData,
  updateAccountData,
  onCreateAccount,
  onBack,
  isLoading,
}) => {
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
        <AccountSetupScreen
          email={accountData.email}
          password={accountData.password}
          confirmPassword={accountData.confirmPassword}
          agreeToTerms={accountData.agreeToTerms}
          subscribeDailyInsights={accountData.subscribeDailyInsights}
          subscribeWeeklyReports={accountData.subscribeWeeklyReports}
          onEmailChange={(email) => updateAccountData('email', email)}
          onPasswordChange={(password) => updateAccountData('password', password)}
          onConfirmPasswordChange={(confirmPassword) => updateAccountData('confirmPassword', confirmPassword)}
          onAgreeToTermsChange={(agree) => updateAccountData('agreeToTerms', agree)}
          onSubscribeDailyChange={(subscribe) => updateAccountData('subscribeDailyInsights', subscribe)}
          onSubscribeWeeklyChange={(subscribe) => updateAccountData('subscribeWeeklyReports', subscribe)}
          onCreateAccount={onCreateAccount}
          onBack={onBack}
          isLoading={isLoading}
        />
      </Animated.View>
    </View>
  );
};

export default OnboardingStep8;