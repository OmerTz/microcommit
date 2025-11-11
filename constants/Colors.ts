/**
 * NumeraFlow Mystical Color Palette
 * Enhanced with master numbers for PS014 Number Detail Screens
 * Accessible colors meeting WCAG 2.1 AA standards
 */

export const NumeraColors = {
  // === PRIMARY PALETTE ===
  primary: {
    50: '#fffbf0',   // Very light golden for backgrounds
    100: '#fef3c7',  // Light backgrounds, subtle highlights
    200: '#fde68a',  // Button hover states
    300: '#fcd34d',  // Disabled states, borders
    400: '#fbbf24',  // Interactive elements
    500: '#f59e0b',  // MAIN BRAND COLOR - Golden primary buttons, links
    600: '#d97706',  // Hover states
    700: '#b45309',  // Active states
    800: '#92400e',  // Dark text on light backgrounds
    900: '#78350f',  // Darkest primary
  },

  // === SECONDARY PALETTE ===
  secondary: {
    50: '#fdf4ff',   // Very light purple/mystical
    100: '#f3e8ff',  // Light mystical backgrounds
    200: '#e9d5ff',  // Subtle highlights
    300: '#d8b4fe',  // Borders, inactive states
    400: '#c084fc',  // Interactive elements
    500: '#a855f7',  // SECONDARY BRAND - Mystical accent buttons
    600: '#9333ea',  // Hover states
    700: '#7c3aed',  // Active states
    800: '#6b21a8',  // Dark text
    900: '#581c87',  // Darkest secondary
  },

  // === NEUTRAL PALETTE ===
  neutral: {
    50: '#fafafa',   // Page backgrounds, cards
    100: '#f4f4f5',  // Section backgrounds
    200: '#e4e4e7',  // Borders, dividers
    300: '#d4d4d8',  // Disabled text, placeholders
    400: '#a1a1aa',  // Secondary text, icons
    500: '#71717a',  // Body text, labels
    600: '#52525b',  // Headings, important text
    700: '#3f3f46',  // High contrast text
    800: '#27272a',  // Dark mode backgrounds
    900: '#18181b',  // Darkest backgrounds
  },

  // === SEMANTIC COLORS ===
  success: {
    light: '#dcfce7',  // Success backgrounds
    main: '#22c55e',   // Success buttons, checkmarks
    dark: '#15803d',   // Success text, borders
  },

  warning: {
    light: '#fef3c7',  // Warning backgrounds
    main: '#f59e0b',   // Warning buttons, alerts
    dark: '#d97706',   // Warning text, borders
  },

  error: {
    light: '#fee2e2',  // Error backgrounds
    main: '#ef4444',   // Error buttons, alerts
    dark: '#dc2626',   // Error text, borders
  },

  info: {
    light: '#dbeafe',  // Info backgrounds
    main: '#3b82f6',   // Info buttons, links
    dark: '#1d4ed8',   // Info text, borders
  },

  // === NUMEROLOGY NUMBER COLORS ===
  numbers: {
    one: {
      light: '#fef3c7',
      main: '#f59e0b',
      dark: '#d97706',
      gradient: ['#f59e0b', '#fbbf24'],
    },
    two: {
      light: '#f3e8ff',
      main: '#a855f7',
      dark: '#7c3aed',
      gradient: ['#a855f7', '#c084fc'],
    },
    three: {
      light: '#fecaca',
      main: '#ef4444',
      dark: '#dc2626',
      gradient: ['#ef4444', '#f87171'],
    },
    four: {
      light: '#dcfce7',
      main: '#22c55e',
      dark: '#16a34a',
      gradient: ['#22c55e', '#4ade80'],
    },
    five: {
      light: '#dbeafe',
      main: '#3b82f6',
      dark: '#2563eb',
      gradient: ['#3b82f6', '#60a5fa'],
    },
    six: {
      light: '#fed7e2',
      main: '#ec4899',
      dark: '#db2777',
      gradient: ['#ec4899', '#f472b6'],
    },
    seven: {
      light: '#e0e7ff',
      main: '#6366f1',
      dark: '#4f46e5',
      gradient: ['#6366f1', '#818cf8'],
    },
    eight: {
      light: '#f0f9ff',
      main: '#0ea5e9',
      dark: '#0284c7',
      gradient: ['#0ea5e9', '#38bdf8'],
    },
    nine: {
      light: '#fff7ed',
      main: '#ea580c',
      dark: '#c2410c',
      gradient: ['#ea580c', '#fb923c'],
    },
    // Master Numbers with enhanced visual treatment
    eleven: {
      light: '#f0f4ff',
      main: '#7c3aed',  // Enhanced purple for master number 11
      dark: '#5b21b6',
      gradient: ['#7c3aed', '#a855f7', '#c084fc'],
      symbol: 'twin-pillars',
    },
    twentyTwo: {
      light: '#fffaeb',
      main: '#d97706',  // Enhanced golden for master number 22
      dark: '#92400e',
      gradient: ['#d97706', '#f59e0b', '#fbbf24'],
      symbol: 'master-builder',
    },
    thirtyThree: {
      light: '#fefce8',
      main: '#facc15',  // Radiant white-gold for master number 33
      dark: '#eab308',
      gradient: ['#facc15', '#fde047', '#fef08a'],
      symbol: 'christ-consciousness',
    },
  },

  // === MYSTICAL GRADIENTS ===
  gradients: {
    primary: ['#f59e0b', '#fbbf24'],
    secondary: ['#a855f7', '#c084fc'],
    mystical: ['#f59e0b', '#a855f7'],
    subtle: ['#fffbf0', '#fdf4ff'],
    cosmic: ['rgba(99, 102, 241, 0.1)', 'rgba(139, 69, 255, 0.05)'],
    number: {
      1: ['#f59e0b', '#fbbf24'],
      2: ['#a855f7', '#c084fc'],
      3: ['#ef4444', '#f87171'],
      4: ['#22c55e', '#4ade80'],
      5: ['#3b82f6', '#60a5fa'],
      6: ['#ec4899', '#f472b6'],
      7: ['#6366f1', '#818cf8'],
      8: ['#0ea5e9', '#38bdf8'],
      9: ['#ea580c', '#fb923c'],
      11: ['#7c3aed', '#a855f7', '#c084fc'],
      22: ['#d97706', '#f59e0b', '#fbbf24'],
      33: ['#facc15', '#fde047', '#fef08a'],
    },
  },

  // === DARK MODE COLORS ===
  dark: {
    background: '#111827',    // Main dark background
    surface: '#1f2937',      // Cards, panels
    text: '#f9fafb',         // Primary text
    textSecondary: '#d1d5db', // Secondary text
    border: '#374151',       // Borders, dividers
    primary: '#fbbf24',      // Golden primary in dark mode
    secondary: '#c084fc',    // Mystical secondary in dark mode
  },

  // === COMPONENT COLORS ===
  components: {
    button: {
      primary: '#f59e0b',
      primaryHover: '#d97706',
      secondary: '#f4f4f5',
      secondaryHover: '#e4e4e7',
      disabled: '#d4d4d8',
    },
    input: {
      background: '#ffffff',
      border: '#d4d4d8',
      borderFocus: '#f59e0b',
      placeholder: '#a1a1aa',
      error: '#ef4444',
    },
    card: {
      background: '#ffffff',
      border: '#e4e4e7',
      shadow: 'rgba(0, 0, 0, 0.1)',
      glassmorphism: 'rgba(255, 255, 255, 0.9)',
    },
    chart: {
      background: '#ffffff',
      gridLines: '#e4e4e7',
      numbers: {
        one: '#f59e0b',
        two: '#a855f7',
        three: '#ef4444',
        four: '#22c55e',
        five: '#3b82f6',
        six: '#ec4899',
        seven: '#6366f1',
        eight: '#0ea5e9',
        nine: '#ea580c',
        eleven: '#7c3aed',
        twentyTwo: '#d97706',
        thirtyThree: '#facc15',
      },
    },
  },
};

// === THEME CONFIGURATIONS ===
export const LightTheme = {
  background: NumeraColors.neutral[50],
  surface: '#ffffff',
  text: NumeraColors.neutral[900],
  textSecondary: NumeraColors.neutral[600],
  border: NumeraColors.neutral[200],
  primary: NumeraColors.primary[500],
  secondary: NumeraColors.secondary[500],
};

export const DarkTheme = {
  background: NumeraColors.dark.background,
  surface: NumeraColors.dark.surface,
  text: NumeraColors.dark.text,
  textSecondary: NumeraColors.dark.textSecondary,
  border: NumeraColors.dark.border,
  primary: NumeraColors.dark.primary,
  secondary: NumeraColors.dark.secondary,
};

// === HELPER FUNCTIONS ===
export const getNumberColor = (number: number): string => {
  const colors = {
    1: NumeraColors.numbers.one.main,
    2: NumeraColors.numbers.two.main,
    3: NumeraColors.numbers.three.main,
    4: NumeraColors.numbers.four.main,
    5: NumeraColors.numbers.five.main,
    6: NumeraColors.numbers.six.main,
    7: NumeraColors.numbers.seven.main,
    8: NumeraColors.numbers.eight.main,
    9: NumeraColors.numbers.nine.main,
    11: NumeraColors.numbers.eleven.main,
    22: NumeraColors.numbers.twentyTwo.main,
    33: NumeraColors.numbers.thirtyThree.main,
  };
  return colors[number as keyof typeof colors] || NumeraColors.primary[500];
};

export const getNumberGradient = (number: number): [string, string] => {
  const gradients = NumeraColors.gradients.number;
  const gradient = gradients[number as keyof typeof gradients] || gradients[1];
  // Ensure we always return exactly 2 colors for compatibility with PatternProps
  return [gradient[0], gradient[1] || gradient[0]] as [string, string];
};

export const getContrastColor = (backgroundColor: string): string => {
  const lightColors = [
    NumeraColors.neutral[50], 
    NumeraColors.neutral[100], 
    NumeraColors.primary[50], 
    NumeraColors.primary[100],
    NumeraColors.secondary[50], 
    NumeraColors.secondary[100]
  ];
  
  return lightColors.includes(backgroundColor) 
    ? NumeraColors.neutral[900] 
    : NumeraColors.neutral[50];
};

export const getFocusStyle = () => ({
  outlineColor: NumeraColors.primary[500],
  outlineWidth: '2px',
  outlineStyle: 'solid',
  outlineOffset: '2px',
});

export default NumeraColors;