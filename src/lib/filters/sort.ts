/**
 * Sorting utilities for card elements
 */

import type { CardElement } from "../types/card";

/**
 * Sort card elements by release date
 *
 * @param elements - Array of card DOM elements to sort
 * @param order - Sort order: 'asc' (ancient to recent) or 'desc' (recent to ancient)
 * @returns New sorted array (does not mutate input)
 *
 * Special handling: Cards with no release date (timestamp = 0) are pushed to the end
 * in ascending order, or to the beginning in descending order
 */
export function sortByReleaseDate(
  elements: CardElement[],
  order: "asc" | "desc"
): CardElement[] {
  return [...elements].sort((a, b) => {
    const ta = Number(a.getAttribute("data-ts")) || 0;
    const tb = Number(b.getAttribute("data-ts")) || 0;

    // Rank function: handles cards without dates (timestamp = 0)
    const rank = (t: number, dir: "asc" | "desc") =>
      t === 0
        ? dir === "asc"
          ? Number.POSITIVE_INFINITY // Put at end if ascending
          : Number.NEGATIVE_INFINITY // Put at beginning if descending
        : t;

    return order === "asc"
      ? rank(ta, order) - rank(tb, order)
      : rank(tb, order) - rank(ta, order);
  });
}
