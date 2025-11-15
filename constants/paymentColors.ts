/**
 * Payment Module Color Palette
 * Colors specific to payment screens (Add Payment Method, Payment Failed, etc.)
 * Using teal/turquoise theme for payment actions
 */

export const PaymentColors = {
  // === PRIMARY PAYMENT COLORS ===
  primary: {
    main: '#2DD4BF',           // Teal - Primary payment buttons, links, active states
    shadow: '#2DD4BF',         // Teal shadow for primary buttons
  },

  // === BACKGROUNDS ===
  background: {
    page: '#F9FAFB',           // Light gray page background
    surface: '#FFFFFF',        // White cards, inputs, buttons
    warning: '#FEF3C7',        // Light yellow for warning icons/backgrounds
  },

  // === TEXT COLORS ===
  text: {
    primary: '#111827',        // Very dark gray for headings, primary text
    secondary: '#6B7280',      // Medium gray for secondary text, labels
    tertiary: '#374151',       // Darker gray for input labels
    disabled: '#9CA3AF',       // Disabled gray for inactive text
    error: '#EF4444',          // Red for error messages
    onPrimary: '#FFFFFF',      // White text on primary buttons
  },

  // === BORDERS ===
  border: {
    light: '#E5E7EB',          // Light gray borders
    medium: '#D1D5DB',         // Medium gray borders for inputs
    primary: '#2DD4BF',        // Teal borders for secondary buttons
  },

  // === SEMANTIC COLORS ===
  error: {
    main: '#EF4444',           // Error red for buttons, alerts
    background: '#FEE2E2',     // Light red background
  },

  success: {
    main: '#22C55E',           // Success green
    background: '#DCFCE7',     // Light green background
  },

  warning: {
    main: '#F59E0B',           // Warning yellow/orange
    background: '#FEF3C7',     // Light yellow background
  },

  // === BUTTON STATES ===
  button: {
    disabled: '#9CA3AF',       // Disabled button background
  },

  // === SHADOWS ===
  shadow: {
    black: '#000',             // Pure black for shadows
  },

  // === THIRD-PARTY BRANDING ===
  thirdParty: {
    applePay: '#000',          // Black for Apple Pay icon
    googlePay: '#4285F4',      // Google blue for Google Pay icon
  },
};

export default PaymentColors;
