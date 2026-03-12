/**
 * Artwork grouping utilities
 * Groups cards by artwork and creates visual headers
 */

import type { CardElement, ArtworkGroup } from "../types/card";

/**
 * Group card elements by their artwork
 *
 * @param elements - Array of card DOM elements to group
 * @returns Array of artwork groups, each containing metadata and cards
 *
 * Pure function - returns data structure, doesn't manipulate DOM
 *
 * @example
 * const groups = groupByArtwork(visibleCards);
 * groups.forEach(group => {
 *   console.log(group.name); // "Classic Cubone Artwork"
 *   console.log(group.head); // Head artwork element
 *   console.log(group.cards.length); // Number of grouped cards
 * });
 */
export function groupByArtwork(elements: CardElement[]): ArtworkGroup[] {
  const groups = new Map<string, ArtworkGroup>();

  elements.forEach((el) => {
    const artworkId = el.getAttribute("data-artwork-id") || "";
    const artworkName = el.getAttribute("data-artwork-name") || "";
    const isHead = el.getAttribute("data-is-head") === "1";

    if (!groups.has(artworkId)) {
      groups.set(artworkId, {
        id: artworkId,
        name: artworkName,
        head: null,
        cards: [],
      });
    }

    const group = groups.get(artworkId)!;
    if (isHead) {
      group.head = el;
    } else {
      group.cards.push(el);
    }
  });

  return Array.from(groups.values());
}

/**
 * Create artwork header element for visual separation
 *
 * @param name - Name of the artwork group
 * @returns HTML element with gradient divider and title
 *
 * @example
 * const header = createArtworkHeader("Classic Cubone Artwork");
 * container.appendChild(header);
 */
export function createArtworkHeader(name: string): HTMLElement {
  const header = document.createElement("div");
  header.className = "artwork-header col-span-full mb-4 mt-8 first:mt-0";
  header.innerHTML = `
    <div class="flex items-center gap-4">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--terracotta)] to-transparent dark:via-[var(--ember)] opacity-50"></div>
      <h2 class="text-xl font-bold tracking-tight text-[var(--deep-brown)] dark:text-[var(--moonlit-bone)] px-4">
        🎨 ${name}
      </h2>
      <div class="flex-1 h-px bg-gradient-to-r from-[var(--terracotta)] via-[var(--terracotta)] to-transparent dark:from-[var(--ember)] dark:via-[var(--ember)] opacity-50"></div>
    </div>
  `;
  return header;
}
