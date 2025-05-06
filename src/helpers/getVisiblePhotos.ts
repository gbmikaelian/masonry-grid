import { Photo } from "@/types/photos";
import { ESTIMATED_CARD_HEIGHT, GAP } from "@/constants";
export interface VisiblePhoto {
  photo: Photo;
  top: number;
  height: number;
}

export function getVisiblePhotos(
  column: Photo[],
  colWidth: number,
  scrollTop: number,
  viewportHeight: number,
  buffer: number,
): VisiblePhoto[] {
  let y = 0;
  const visible: VisiblePhoto[] = [];
  for (let i = 0; i < column.length; i++) {
    const photo = column[i];
    const height = (photo.height / photo.width) * colWidth;
    if (
      y + height > scrollTop - buffer * ESTIMATED_CARD_HEIGHT &&
      y < scrollTop + viewportHeight + buffer * ESTIMATED_CARD_HEIGHT
    ) {
      visible.push({ photo, top: y, height });
    }
    y += height + GAP;
  }
  return visible;
}