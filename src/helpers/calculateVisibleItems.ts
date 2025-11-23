import { ESTIMATED_CARD_HEIGHT, GAP } from "@/constants";
export interface VisibleItems<T> {
  item: T;
  top: number;
  height: number;
}

export function calculateVisibleItems<
  T extends { height: number; width: number },
>(
  column: T[],
  colWidth: number,
  scrollTop: number,
  viewportHeight: number,
  buffer: number
): VisibleItems<T>[] {
  let y = 0;
  const visibleItems: VisibleItems<T>[] = [];
  for (let i = 0; i < column.length; i++) {
    const item = column[i];
    const height = (item.height / item.width) * colWidth;
    if (
      y + height > scrollTop - buffer * ESTIMATED_CARD_HEIGHT &&
      y < scrollTop + viewportHeight + buffer * ESTIMATED_CARD_HEIGHT
    ) {
      visibleItems.push({ item, top: y, height });
    }
    y += height + GAP;
  }
  return visibleItems;
}
