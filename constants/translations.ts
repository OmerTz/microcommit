/**
 * Translations - Refactored into modular translation system
 * Now imports from the translations directory for better maintainability
 * Reduced from 913 lines to this import file + 6 focused modules
 */

import { translations } from './translations/index';

/**
 * Translation function - retrieves translated text by dot notation key
 * @param key - dot notation key (e.g., 'welcome.title')
 * @returns translated string or key if not found
 */
export function t(key: string): string {
  try {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  } catch (error) {
    console.warn(`Translation error for key "${key}":`, error);
    return key;
  }
}

/**
 * Translation function for arrays - retrieves translated array by dot notation key
 * @param key - dot notation key (e.g., 'onboarding.steps')
 * @returns translated array or empty array if not found
 */
export function tArray(key: string): string[] {
  try {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return []; // Return empty array if translation not found
      }
    }
    
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn(`Translation array error for key "${key}":`, error);
    return [];
  }
}

// Export translations object for direct access if needed
export { translations };
export { default as translationsDefault } from './translations/index';