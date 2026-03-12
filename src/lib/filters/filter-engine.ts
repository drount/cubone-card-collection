/**
 * Pure filter engine - applies all filters to card elements
 * No side effects, no DOM manipulation
 * Testable without browser environment
 */

import { FILTER_DEFINITIONS } from "./filter-config";
import type { CardElement, FilterState, FilterResult } from "../types/card";

/**
 * Apply all filters to card elements
 *
 * @param elements - Array of card DOM elements to filter
 * @param state - Current filter state (collection, search query, toggles, etc.)
 * @returns Object with visible and hidden card arrays
 *
 * @example
 * const { visible, hidden } = applyFilters(allCards, {
 *   collection: '',
 *   searchQuery: 'holo',
 *   sortOrder: 'desc',
 *   showMissingOnly: false,
 *   showExtra: true,
 *   showArtworkOnly: false
 * });
 */
export function applyFilters(
  elements: CardElement[],
  state: FilterState
): FilterResult {
  const visible: CardElement[] = [];
  const hidden: CardElement[] = [];

  // Sort filters by priority for fail-fast optimization
  // Cheap filters (like collection dropdown) run first
  const sortedFilters = [...FILTER_DEFINITIONS].sort(
    (a, b) => a.priority - b.priority
  );

  for (const el of elements) {
    // Element passes if it passes ALL filters
    const passes = sortedFilters.every((filter) => filter.test(el, state));

    if (passes) {
      visible.push(el);
    } else {
      hidden.push(el);
    }
  }

  return { visible, hidden };
}
