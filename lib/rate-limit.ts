// Simple in-memory rate limiter
// For production, consider using Redis or a database

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number; // Maximum number of requests
  windowMs: number; // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
}

/**
 * Rate limiter to prevent spam
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 3, windowMs: 60 * 60 * 1000 } // Default: 3 requests per hour
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore[identifier];

  // If no entry or expired, create new entry
  if (!entry || entry.resetTime < now) {
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + config.windowMs,
    };

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: rateLimitStore[identifier].resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    const resetInMinutes = Math.ceil((entry.resetTime - now) / (60 * 1000));
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      message: `Too many requests. Please try again in ${resetInMinutes} minute${
        resetInMinutes > 1 ? "s" : ""
      }.`,
    };
  }

  // Increment count
  entry.count++;

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Reset rate limit for a specific identifier (useful for testing or admin purposes)
 */
export function resetRateLimit(identifier: string): void {
  delete rateLimitStore[identifier];
}
