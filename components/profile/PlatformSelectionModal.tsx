/**
 * PlatformSelectionModal - Modal for selecting social sharing platforms
 * Implements PS018 platform selection design
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X as CloseIcon, Shield, Camera, Twitter, Facebook, MessageCircle } from 'lucide-react-native';
import { NumeraDesignSystem } from '@/constants/NumeraDesignSystem';
import { PROFILE_TEXT } from '@/constants/ProfileConstants';
import ProfilePreview, { UserProfileData } from './ProfilePreview';

export interface PlatformSelectionModalProps {
  visible: boolean;
  userProfile: UserProfileData;
  onClose: () => void;
  onPlatformSelect: (platform: 'instagram' | 'twitter' | 'facebook' | 'whatsapp') => void;
}

const PlatformSelectionModal: React.FC<PlatformSelectionModalProps> = ({
  visible,
  userProfile,
  onClose,
  onPlatformSelect,
}) => {
  const socialPlatforms = [
    { key: 'instagram', name: 'Instagram', icon: Camera, color: NumeraDesignSystem.colors.warning },
    { key: 'twitter', name: 'X (Twitter)', icon: Twitter, color: NumeraDesignSystem.colors.primary[500] },
    { key: 'facebook', name: 'Facebook', icon: Facebook, color: NumeraDesignSystem.colors.primary[600] },
    { key: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: NumeraDesignSystem.colors.success },
  ] as const;

  const handlePlatformPress = (platform: 'instagram' | 'twitter' | 'facebook' | 'whatsapp') => {
    onPlatformSelect(platform);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{PROFILE_TEXT.shareToPlatformTitle}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel={PROFILE_TEXT.closeSharingOptions}
            accessibilityRole="button"
          >
            <CloseIcon 
              size={18} 
              color={NumeraDesignSystem.colors.text.secondary} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <ProfilePreview userProfile={userProfile} />
          
          <Text style={styles.platformTitle}>{PROFILE_TEXT.choosePlatformTitle}</Text>
          
          <View style={styles.platformGrid}>
            {socialPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.key}
                style={[styles.platformButton, { borderColor: platform.color }]}
                onPress={() => handlePlatformPress(platform.key)}
                accessibilityLabel={`${PROFILE_TEXT.shareToPrefix} ${platform.name}`}
                accessibilityRole="button"
              >
                {React.createElement(platform.icon, {
                  size: 32,
                  color: platform.color,
                  style: styles.platformIconSpacing,
                })}
                <Text style={styles.platformName}>{platform.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.privacyNote}>
            <View style={styles.privacyContent}>
              <Shield 
                size={16} 
                color={NumeraDesignSystem.colors.primary[700]} 
                style={styles.securityIcon}
              />
              <Text style={styles.privacyText}>
                {PROFILE_TEXT.privacyNotice}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: NumeraDesignSystem.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: NumeraDesignSystem.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: NumeraDesignSystem.colors.border,
  },
  modalTitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.h4,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: NumeraDesignSystem.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    padding: NumeraDesignSystem.spacing.md,
  },
  platformTitle: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodyLarge,
    fontWeight: NumeraDesignSystem.typography.fontWeight.semibold,
    color: NumeraDesignSystem.colors.text.primary,
    marginBottom: NumeraDesignSystem.spacing.md,
    marginTop: NumeraDesignSystem.spacing.lg,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  platformButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    borderWidth: 2,
    backgroundColor: NumeraDesignSystem.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: NumeraDesignSystem.spacing.md,
    ...NumeraDesignSystem.shadows.sm,
  },
  platformIconSpacing: {
    marginBottom: NumeraDesignSystem.spacing.sm,
  },
  platformName: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    fontWeight: NumeraDesignSystem.typography.fontWeight.medium,
    color: NumeraDesignSystem.colors.text.primary,
    textAlign: 'center',
  },
  privacyNote: {
    backgroundColor: NumeraDesignSystem.colors.primary[50],
    padding: NumeraDesignSystem.spacing.md,
    borderRadius: NumeraDesignSystem.borderRadius.lg,
    marginTop: NumeraDesignSystem.spacing.lg,
  },
  privacyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityIcon: {
    marginRight: NumeraDesignSystem.spacing.xs,
  },
  privacyText: {
    fontSize: NumeraDesignSystem.typography.fontSize.bodySmall,
    color: NumeraDesignSystem.colors.primary[700],
    textAlign: 'center',
    flex: 1,
  },
});

export default PlatformSelectionModal;