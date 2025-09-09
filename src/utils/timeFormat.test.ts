import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatTimestamp, formatCreationDate, formatUpdateDate } from './timeFormat';

// Mock Date.now() for consistent testing
const mockNow = new Date('2023-12-01T12:00:00Z').getTime();

describe('timeFormat utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatTimestamp', () => {
    it('should return "Just now" for timestamps less than 1 second ago', () => {
      const timestamp = new Date(mockNow - 500).toISOString();
      expect(formatTimestamp(timestamp)).toBe('Just now');
    });

    it('should return seconds ago for timestamps less than 1 minute ago', () => {
      const timestamp = new Date(mockNow - 30 * 1000).toISOString();
      expect(formatTimestamp(timestamp)).toBe('30 seconds ago');
    });

    it('should return minutes ago for timestamps less than 1 hour ago', () => {
      const timestamp = new Date(mockNow - 15 * 60 * 1000).toISOString();
      expect(formatTimestamp(timestamp)).toBe('15 minutes ago');
    });

    it('should return hours ago for timestamps less than 1 day ago', () => {
      const timestamp = new Date(mockNow - 3 * 60 * 60 * 1000).toISOString();
      expect(formatTimestamp(timestamp)).toBe('3 hours ago');
    });

    it('should handle negative time differences (clock skew)', () => {
      const futureTimestamp = new Date(mockNow + 1000).toISOString();
      expect(formatTimestamp(futureTimestamp)).toBe('Just now');
    });
  });

  describe('formatCreationDate', () => {
    it('should format creation date without time', () => {
      const timestamp = '2023-11-15T14:30:00Z';
      const result = formatCreationDate(timestamp);
      expect(result).toContain('Created on');
      expect(result).toContain('2023');
    });
  });

  describe('formatUpdateDate', () => {
    it('should format update date with time', () => {
      const timestamp = '2023-11-15T14:30:00Z';
      const result = formatUpdateDate(timestamp);
      expect(result).toContain('Updated on');
      expect(result).toContain('2023');
      expect(result).toContain('at');
    });
  });
});
