/**
 * Custom hook for tracking user progress in number exploration
 * Extracted from NumberDetailScreen for Bible.md compliance
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { numerologyDatabaseService } from '@/services/numerologyDatabaseService';

export const useProgressTracking = (
  numberType: 'lifePath' | 'expression' | 'soulUrge' | 'personality' | 'birthday',
  number: number
) => {
  const { user } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Track user progress when sections are expanded
  useEffect(() => {
    if (user?.id && expandedSections.size > 0) {
      const sectionIds = Array.from(expandedSections);
      numerologyDatabaseService.trackUserProgress(
        user.id,
        numberType,
        number,
        sectionIds
      ).catch(err => {
        console.warn('Failed to track progress:', err);
      });
    }
  }, [expandedSections, user?.id, numberType, number]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return {
    expandedSections,
    toggleSection,
  };
};