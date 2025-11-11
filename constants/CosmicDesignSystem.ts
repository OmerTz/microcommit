/**
 * Cosmic Design System 2.0
 * Modern numerology app design with glassmorphism, aurora effects, and cosmic backgrounds
 */

export const CosmicDesignSystem = {
  // Aurora Gradient Palettes
  gradients: {
    // Main aurora gradients - SUBTLE PURPLE ONLY
    aurora: {
      purple: ['#6B46C1', '#7C3AED', '#8B5CF6'],  // Subtle purple gradient
      blue: ['#4C1D95', '#6B46C1', '#7C3AED'],    // Deep purple shades
      cosmic: ['#1E1B4B', '#2E1065', '#4C1D95'],  // Dark purple gradient
      midnight: ['#0F0C29', '#1E1B4B', '#2E1065'], // Very dark purple
    },
    
    // Additional gradient themes - MORE SUBTLE
    nebula: ['#6B46C1', '#7C3AED', '#8B5CF6'],     // Same as purple
    stardust: ['#8B5CF6', '#9F7AEA', '#B794F4'],   // Light purple shades
    galaxy: ['#4C1D95', '#6B46C1', '#8B5CF6'],     // Medium purple range
    
    // Subtle gradients for cards
    glass: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
    frost: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)'],
    shimmer: ['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.1)'],
    
    // Animated gradient combinations
    animated: {
      aurora1: ['#8B5CF6', '#EC4899', '#3B82F6', '#8B5CF6'],
      aurora2: ['#F472B6', '#7C3AED', '#3B82F6', '#F472B6'],
      aurora3: ['#A78BFA', '#F093FB', '#667EEA', '#A78BFA'],
    }
  },

  // Enhanced color palette
  colors: {
    // Primary cosmic colors
    cosmic: {
      deepSpace: '#0A0E27',
      nebulaPurple: '#8B5CF6',
      starPink: '#EC4899',
      cosmicBlue: '#3B82F6',
      auroraGreen: '#10B981',
      solarGold: '#F59E0B',
      lunarSilver: '#E5E7EB',
    },
    
    // Glass morphism colors
    glass: {
      white10: 'rgba(255, 255, 255, 0.1)',
      white15: 'rgba(255, 255, 255, 0.15)',
      white20: 'rgba(255, 255, 255, 0.2)',
      white30: 'rgba(255, 255, 255, 0.3)',
      black10: 'rgba(0, 0, 0, 0.1)',
      black20: 'rgba(0, 0, 0, 0.2)',
      black40: 'rgba(0, 0, 0, 0.4)',
    },
    
    // Enhanced Text colors (WCAG AA compliant)
    text: {
      primary: '#FFFFFF',                    // High contrast white (21:1)
      secondary: '#E8E3F5',                  // Cosmic lavender (16.5:1)
      tertiary: '#B8B3C5',                   // Muted lavender (7.2:1)
      accent: '#A78BFA',                     // Cosmic purple (5.8:1)
      cosmic: '#A78BFA',                     // Cosmic purple accent
      interactive: '#F472B6',                // Stellar pink (5.1:1)
    },

    // Enhanced Cosmic Card Backgrounds
    cosmic: {
      // Main Library Cards - Deep Space Gradient
      deepSpace: {
        background: ['#1a1a2e', '#0f0f1e'],
        border: 'rgba(139, 92, 246, 0.6)',
        glow: 'rgba(139, 92, 246, 0.25)',
      },
      
      // Category Cards - Nebula Inspired  
      nebula: {
        background: ['#2d1b69', '#1a0b3d'],
        border: 'rgba(139, 92, 246, 0.3)',
        glow: 'rgba(45, 27, 105, 0.4)',
      },
      
      // Featured Content - Aurora Glow
      aurora: {
        background: ['#6b46c1', '#3b1d5c', '#1a0b3d'],
        border: 'rgba(139, 92, 246, 0.8)',
        glow: 'rgba(107, 70, 193, 0.4)',
      },
      
      // Module Cards - Stardust Theme
      stardust: {
        background: ['#4c1d95', '#2d1b69', '#1a1a2e'],
        border: 'rgba(139, 92, 246, 0.2)',
        glow: 'rgba(76, 29, 149, 0.3)',
      },
    },
  },

  // Glassmorphism styles
  glassmorphism: {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      shadowColor: '#8B5CF6',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 32,
      elevation: 10,
    },
    
    medium: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      shadowColor: '#EC4899',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 40,
      elevation: 15,
    },
    
    dark: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 30,
      elevation: 12,
    },
    
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.18)',
      borderRadius: 24,
    }
  },

  // Animation configurations
  animations: {
    // Timing functions
    timing: {
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    
    // Duration presets (in ms)
    duration: {
      instant: 100,
      fast: 200,
      normal: 300,
      slow: 500,
      verySlow: 1000,
    },
    
    // Spring animations
    spring: {
      gentle: {
        tension: 100,
        friction: 10,
      },
      bouncy: {
        tension: 150,
        friction: 8,
      },
      stiff: {
        tension: 200,
        friction: 15,
      }
    }
  },

  // Enhanced spacing system (mobile-first)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    
    // Component specific spacing
    card: {
      padding: 16,
      gap: 12,
    },
    
    section: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      gap: 16,
    },
    
    screen: {
      paddingTop: 20,
      paddingBottom: 100,
      paddingHorizontal: 20,
    }
  },

  // Border radius system
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
    
    // Component specific
    card: 24,
    button: 16,
    input: 12,
    avatar: 9999,
  },

  // Enhanced typography (reduced text, better hierarchy)
  typography: {
    // Font families
    fontFamily: {
      display: 'SF Pro Display',
      body: 'Inter',
      mono: 'SF Mono',
    },
    
    // Enhanced Font sizes (improved readability)
    fontSize: {
      // Display
      displayLarge: 48,
      displayMedium: 40,
      displaySmall: 32,
      
      // Headings - increased sizes
      h1: 28,
      h2: 24,
      h3: 20,
      h4: 20,        // Previously 18px - section titles
      
      // Body - improved readability
      bodyLarge: 16,
      bodyMedium: 16,    // Previously 14px - card titles 
      bodySmall: 14,     // Previously 12px - descriptions
      
      // Captions - larger for better readability
      caption: 12,       // Previously 11px - metadata
      micro: 12,         // Previously 10px - small text
    },
    
    // Font weights
    fontWeight: {
      thin: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    
    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    }
  },

  // Shadow system
  shadows: {
    sm: {
      shadowColor: '#8B5CF6',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#8B5CF6',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#EC4899',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: '#EC4899',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 12,
    },
    glow: {
      shadowColor: '#A78BFA',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 0,
    }
  },

  // Blur effects
  blur: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 40,
  }
};

// Helper functions for dynamic styles
export const getGlassmorphism = (variant: 'light' | 'medium' | 'dark' = 'light') => {
  return CosmicDesignSystem.glassmorphism[variant];
};

export const getAnimatedGradient = (colors: string[], duration = 3000) => {
  // This would be used with react-native-reanimated
  return {
    colors,
    duration,
    loop: true,
  };
};

export const getAuroraBackground = () => {
  // Returns animated aurora background configuration
  return {
    colors: CosmicDesignSystem.gradients.animated.aurora1,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    animated: true,
  };
};