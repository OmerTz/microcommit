/**
 * Recommendation Card Component
 * Displays daily recommendations with color suggestions
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { dashboardStyles as styles } from '../DashboardStyles';

interface RecommendationCardProps {
  recommendation: string;
  colors: string[];
  onShareInsight: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  colors,
  onShareInsight,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Today's Recommendation</Text>
      <View style={styles.recommendationCard}>
        <Text style={styles.recommendationText}>{recommendation}</Text>
        <View style={styles.colorsContainer}>
          <Text style={styles.colorsTitle}>Recommended Colors:</Text>
          <View style={styles.colorsList}>
            {colors.map((color, index) => (
              <View 
                key={index} 
                style={[styles.colorSwatch, { backgroundColor: color.toLowerCase() }]} 
              />
            ))}
          </View>
        </View>
        
        {/* Share daily insight button */}
        <TouchableOpacity 
          style={styles.shareInsightButton}
          onPress={onShareInsight}
        >
          <Text style={styles.shareInsightText}>Share Daily Insight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecommendationCard;