/**
 * Core type definitions for card filtering and rendering
 */

export interface Card {
  slug: string;
  data: {
    name: string;
    number: string;
    release_date: Date;
    collection_name: string;
    image?: string;
    first_edition?: boolean;
    holographic?: boolean;
    missing?: boolean;
    extra?: boolean;
    notes?: string;
  };
}

export interface CardElement extends HTMLElement {
  getAttribute(
    name:
      | "data-coll"
      | "data-missing"
      | "data-extra"
      | "data-artwork"
      | "data-search"
      | "data-ts"
      | "data-artwork-id"
      | "data-artwork-name"
      | "data-is-head"
  ): string | null;
}

export interface FilterState {
  collection: string;
  searchQuery: string;
  sortOrder: "asc" | "desc";
  showMissingOnly: boolean;
  showExtra: boolean;
  showArtworkOnly: boolean;
}

export interface FilterResult {
  visible: CardElement[];
  hidden: CardElement[];
}

export interface ArtworkGroup {
  id: string;
  name: string;
  head: CardElement | null;
  cards: CardElement[];
}
