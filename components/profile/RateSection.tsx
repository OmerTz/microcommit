/**
 * RateSection - App rating section
 * Extracted from SupportComponents.tsx for better modularity
 */

import React from 'react';
import { View } from 'react-native';
import SettingsSection from './SettingsSection';
import QuickActionCard from './QuickActionCard';

export interface RateSectionProps {
  onRateApp: () => void;
}

const RateSection: React.FC<RateSectionProps> = ({
  onRateApp,
}) => {
  return (
    <SettingsSection title="Rate & Review" icon="star">
      <View>
        <QuickActionCard
          icon="star"
          title="Rate NumeraFlow"
          description="Leave a review in the App Store"
          onPress={onRateApp}
        />
      </View>
    </SettingsSection>
  );
};

export default RateSection;