/**
 * Date picker utility functions
 */

/**
 * Parse string date to Date object
 */
export const parseStringToDate = (value: string): Date => {
  if (!value) return new Date();
  const parts = value.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  return new Date();
};

/**
 * Format Date object to YYYY-MM-DD string
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format date string for display
 */
export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format text input for date entry
 */
export const formatDateInput = (text: string): string => {
  // Remove non-numeric characters except dashes
  const cleaned = text.replace(/[^\d-]/g, '');
  
  // If user is typing with dashes, allow it
  if (cleaned.includes('-')) {
    return cleaned.slice(0, 10); // YYYY-MM-DD format
  }
  
  // Otherwise, format as YYYY-MM-DD
  const numbers = cleaned.replace(/-/g, '');
  if (numbers.length <= 4) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  } else {
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
  }
};

/**
 * Validate that date is not in the future
 */
export const isDateValid = (date: Date, maxDate?: Date): boolean => {
  if (maxDate && date > maxDate) {
    return false;
  }
  return true;
};