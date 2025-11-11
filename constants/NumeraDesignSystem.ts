/**
 * Numera Design System
 * Design tokens and theme constants for NumeraFlow
 */

export const NumeraDesignSystem = {
  colors: {
    // Primary color palette
    primary: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
    },
    secondary: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
      800: '#9D174D',
      900: '#831843',
    },
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    // Legacy flat colors for backward compatibility
    primary: '#6366F1',
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    secondary: '#EC4899',
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    surface: '#F3F4F6',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    cosmic: {
      purple: '#8B5CF6',
      indigo: '#6366F1',
      blue: '#3B82F6',
      teal: '#14B8A6',
      pink: '#EC4899',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    section: {
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    screen: {
      paddingHorizontal: 16,
      paddingVertical: 24,
      paddingTop: 40,
      paddingBottom: 20,
    },
  },
  
  typography: {
    fontSize: {
      h1: 32,
      h2: 28,
      h3: 24,
      h4: 20,
      bodyLarge: 18,
      bodyMedium: 16,
      body: 16,
      bodySmall: 14,
      caption: 12,
    },
    fontWeight: {
      black: '900' as const,
      bold: '700' as const,
      semibold: '600' as const,
      medium: '500' as const,
      regular: '400' as const,
    },
    lineHeight: {
      h1: 40,
      h2: 36,
      h3: 32,
      h4: 28,
      bodyLarge: 26,
      bodyMedium: 24,
      body: 24,
      bodySmall: 20,
      caption: 16,
    },
    // Keep legacy nested structure for backward compatibility
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 5,
    },
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
    // Semantic aliases for common use cases
    button: 8,    // md
    card: 12,     // lg  
    input: 8,     // md
  },
  
  layout: {
    containerPadding: 20,
    sectionSpacing: 32,
    cardPadding: 16,
  },
};