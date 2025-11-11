/**
 * SocialShare - Profile sharing functionality orchestrator
 * Implements PS018 social sharing design with multiple sharing options
 * Refactored to use smaller sub-components to comply with Bible.md line limits
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShareOptionsSection from './ShareOptionsSection';
import PlatformSelectionModal from './PlatformSelectionModal';
import ProfilePreview from './ProfilePreview';
import type { UserProfileData } from './ProfilePreview';

export interface SocialShareProps {
  userProfile: UserProfileData | null;
  onShareCard: (platform: 'instagram' | 'twitter' | 'facebook' | 'whatsapp') => void;
  onShareLink: () => void;
  onGeneratePDF: () => void;
  onClose?: () => void;
}

const SocialShare: React.FC<SocialShareProps> = ({
  userProfile,
  onShareCard,
  onShareLink,
  onGeneratePDF,
  onClose,
}) => {
  const [showPlatformModal, setShowPlatformModal] = useState(false);

  const handleShareCard = () => {
    setShowPlatformModal(true);
  };

  const handlePlatformSelect = (platform: 'instagram' | 'twitter' | 'facebook' | 'whatsapp') => {
    onShareCard(platform);
  };

  return (
    <>
      <View style={styles.container}>
        <ShareOptionsSection
          onShareCard={handleShareCard}
          onShareLink={onShareLink}
          onGeneratePDF={onGeneratePDF}
        />
        
        <ProfilePreview userProfile={userProfile} />
      </View>

      <PlatformSelectionModal
        visible={showPlatformModal}
        userProfile={userProfile}
        onClose={() => setShowPlatformModal(false)}
        onPlatformSelect={handlePlatformSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SocialShare;