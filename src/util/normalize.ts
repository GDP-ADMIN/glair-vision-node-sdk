/**
 * Converts a snake_case string to camelCase
 * @example "tanda_tangan" -> "tandaTangan"
 * @example "berlaku_hingga" -> "berlakuHingga"
 */
function snakeToCamel(str: string): string {
  return String(str).replaceAll(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Recursively converts all object keys from snake_case to camelCase
 * Handles nested objects and arrays
 */
export function normalizeKeys<T = unknown>(obj: unknown): T {
  if (obj === null || obj === undefined) {
    return obj as T;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeKeys(item)) as T;
  }

  // Handle primitive types (string, number, boolean, etc.)
  if (typeof obj !== "object") {
    return obj as T;
  }

  // Handle objects
  const normalized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamel(key);
    
    // Recursively normalize nested objects/arrays
    if (value !== null && typeof value === "object") {
      normalized[camelKey] = normalizeKeys(value);
    } else {
      normalized[camelKey] = value;
    }
  }

  return normalized as T;
}
