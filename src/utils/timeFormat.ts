/**
 * Time formatting utilities following UI Date Stamp Best Practices
 * Based on: https://medium.com/user-experince/ui-date-stamp-best-practices-85ae2c5ad9eb
 */

/**
 * Get user's timezone with fallback to America/Los_Angeles (PST/PDT)
 */
const getUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    // Fallback as recommended in the article
    return 'America/Los_Angeles';
  }
};

/**
 * Get timezone abbreviation (PST, PDT, EST, etc.)
 */
const getTimezoneAbbreviation = (date: Date, timezone: string): string => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    return timeZonePart?.value || 'UTC';
  } catch {
    return 'UTC';
  }
};

/**
 * Format timestamp following UI best practices
 * 
 * Rules:
 * - TimeSince < 1 second = "Just now"
 * - TimeSince < 1 minute = "x seconds ago"
 * - TimeSince < 1 hour = "y minutes ago"
 * - TimeSince < 1 day = "z hours ago"
 * - TimeSince < 2 days = "Yesterday at h:mm TZ"
 * - Else = "MMM d, YYYY at h:mm TZ"
 */
export const formatTimestamp = (timestamp: string): string => {
  const eventDate = new Date(timestamp);
  const now = new Date();
  const timeDiff = now.getTime() - eventDate.getTime();
  const timeSince = Math.max(0, timeDiff); // Handle potential negative values due to clock skew
  
  const timezone = getUserTimezone();
  const tzAbbr = getTimezoneAbbreviation(eventDate, timezone);
  
  // Convert to different units
  const seconds = Math.floor(timeSince / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  // Apply the progressive display rules
  if (seconds < 1) {
    return "Just now";
  }
  
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
  
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  
  // Format time in 12-hour format with timezone
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const timeString = eventDate.toLocaleTimeString('en-US', timeOptions);
  
  if (days < 2) {
    return `Yesterday at ${timeString} ${tzAbbr}`;
  }
  
  // For older dates, show full date
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  const dateString = eventDate.toLocaleDateString('en-US', dateOptions);
  
  return `${dateString} at ${timeString} ${tzAbbr}`;
};

/**
 * Alternative format for creation dates (no time needed)
 */
export const formatCreationDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const timezone = getUserTimezone();
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  
  return `Created on ${date.toLocaleDateString('en-US', options)}`;
};

/**
 * Format for updates that need timestamps
 */
export const formatUpdateDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const timezone = getUserTimezone();
  const tzAbbr = getTimezoneAbbreviation(date, timezone);
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  const dateString = date.toLocaleDateString('en-US', dateOptions);
  const timeString = date.toLocaleTimeString('en-US', timeOptions);
  
  return `Updated on ${dateString} at ${timeString} ${tzAbbr}`;
};
