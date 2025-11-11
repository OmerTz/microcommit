/**
 * Daily Affirmation Card Component
 * Displays the daily affirmation with sharing capabilities
 */

import React, { RefObject } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { dashboardStyles as styles } from '../DashboardStyles';
import LazyDashboardCard from '../performance/LazyDashboardCard';

interface DailyAffirmationCardProps {
  affirmation: {
    text: string;
    category: string;
    significance: number;
  };
  userId: string;
  currentDate: Date;
  onFavorite: () => void;
  onShare: () => void;
  cardRef?: RefObject<View>;
}

export const DailyAffirmationCard: React.FC<DailyAffirmationCardProps> = ({
  affirmation,
  userId,
  currentDate,
  onFavorite,
  onShare,
  cardRef,
}) => {

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Daily Affirmation</Text>
      {/* Temporarily bypass LazyDashboardCard to test if it's causing the issue */}
      <View ref={cardRef} style={styles.affirmationCard}>
        <TouchableOpacity onPress={onFavorite}>
          <Text style={styles.affirmationText}>
            "{affirmation?.text || 'Loading your daily affirmation...'}"
          </Text>
          <Text style={styles.affirmationCategory}>
            Category: {affirmation?.category || 'Loading...'}
          </Text>
          <View style={styles.significanceStars}>
            {Array.from({ length: affirmation?.significance || 0 }).map((_, i) => (
              <Text key={i} style={styles.star}>*</Text>
            ))}
          </View>
        </TouchableOpacity>
        
        {/* Enhanced sharing button */}
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={onShare}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DailyAffirmationCard;