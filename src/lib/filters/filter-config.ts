/**
 * Filter configuration - single source of truth for all filters
 * Adding a new filter means adding one entry to FILTER_DEFINITIONS
 */

import type { CardElement, FilterState } from "../types/card";

export interface FilterDefinition {
  id: string;
  test: (element: CardElement, state: FilterState) => boolean;
  priority: number; // Lower numbers run first (optimization: fail-fast on cheap filters)
}

/**
 * All filter definitions
 * Each filter is a pure function that tests whether a card element passes the filter
 */
export const FILTER_DEFINITIONS: FilterDefinition[] = [
  {
    id: "collection",
    test: (el, state) => {
      if (!state.collection) return true;
      const elColl = (el.getAttribute("data-coll") || "").toLowerCase();
      return elColl === state.collection.toLowerCase();
    },
    priority: 1,
  },
  {
    id: "search",
    test: (el, state) => {
      if (!state.searchQuery) return true;
      const blob = el.getAttribute("data-search") || "";
      return blob.includes(state.searchQuery.toLowerCase());
    },
    priority: 2,
  },
  {
    id: "missing",
    test: (el, state) => {
      if (!state.showMissingOnly) return true;
      return el.getAttribute("data-missing") === "1";
    },
    priority: 3,
  },
  {
    id: "extra",
    test: (el, state) => {
      // When showExtra is false, hide extra cards
      // When showExtra is true, include all cards (don't filter)
      if (state.showExtra) return true;
      return el.getAttribute("data-extra") !== "1";
    },
    priority: 4,
  },
  {
    id: "artwork",
    test: (el, state) => {
      if (!state.showArtworkOnly) return true;
      return el.getAttribute("data-artwork") === "1";
    },
    priority: 5,
  },
];
