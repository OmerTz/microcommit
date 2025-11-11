/**
 * Time picker utility functions
 */

/**
 * Parse time string to Date object for DateTimePicker
 */
export function parseTimeToDate(timeStr: string): Date {
  const today = new Date();
  today.setSeconds(0);
  today.setMilliseconds(0);
  
  if (!timeStr) {
    today.setHours(12, 0);
    return today;
  }

  // Handle both 24-hour (HH:MM) and 12-hour (HH:MM AM/PM) formats
  const timeRegex24 = /^(\d{1,2}):(\d{2})$/;
  const timeRegex12 = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
  
  let match = timeStr.match(timeRegex12);
  if (match) {
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    today.setHours(hours, minutes);
    return today;
  }
  
  match = timeStr.match(timeRegex24);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    today.setHours(hours, minutes);
    return today;
  }
  
  // Fallback
  today.setHours(12, 0);
  return today;
}

/**
 * Format Date object to time string
 */
export const formatTimeFromDate = (date: Date, format24Hour: boolean = false): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  if (format24Hour) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
};

/**
 * Format display time (always show in 12-hour format for better UX)
 */
export const formatDisplayTime = (timeStr: string): string => {
  if (!timeStr) return '';
  
  const date = parseTimeToDate(timeStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Format time input text
 */
export const formatTimeInput = (text: string): string => {
  // Remove non-numeric characters except colons and AM/PM
  const cleaned = text.replace(/[^\d:APMamp\s]/g, '');
  
  // Handle different input patterns
  if (cleaned.includes(':')) {
    return cleaned.slice(0, 8); // HH:MM AM format
  }
  
  // Auto-format as user types numbers
  const numbers = cleaned.replace(/[^\d]/g, '');
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
  } else {
    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
  }
};