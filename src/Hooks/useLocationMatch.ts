import { useLocation } from "react-router-dom";

/**
 * Returns true if the current location matches any of the provided patterns.
 * Patterns can include :id or :type as wildcards (e.g. /tour/:type/:id)
 */
export function useLocationMatch(patterns: string[]): boolean {
  const { pathname } = useLocation();

  return patterns.some((pattern) => {
    // Convert pattern to regex: replace :id and :type with [^/]+, escape slashes
    const regexPattern = pattern
      .replace(/:[^/]+/g, "[^/]+")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });
}
