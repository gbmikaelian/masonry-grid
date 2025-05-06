'use client';


import { useCallback, useEffect, useTransition } from "react";
import { Photo, PhotoResponse, PhotosRequestQuery } from "@/types/photos";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { getPhotos } from "./services/photoService";
import useDebounce from "@/hooks/useDebounce";
import MasonryVirtualized from "@/components/MasonryVirtualized";
import { MAX_COLUMNS, PER_PAGE } from "@/constants";
import { MasonryVirtualizedSkeleton } from "@/components/MasonryVirtualized/MasonryVirtualizedSkeleton";

const Home = () => {
  const router = useRouter();

  const [photos, dispatchPhotos] = useActionState<PhotoResponse, PhotosRequestQuery>(async (state, query) => {
    const response = await getPhotos(query.page, query.per_page);

    // Merge and deduplicate photos by id
    const mergedPhotos = [...state.photos, ...response.photos].filter(
      (photo, index, self) =>
        self.findIndex(p => p.id === photo.id) === index
    );
    return { ...state, ...response, photos: mergedPhotos }
  }, {photos: [], page: 1, per_page: PER_PAGE, total_results: 0, next_page: ''});

  const [loading, startTransition] = useTransition()

  
  useEffect(() => {
    startTransition(() => {
      dispatchPhotos({page: 1, per_page: PER_PAGE});
    });
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    router.push(`/photo/${photo.id}`);
  }, [router]);

  const onBottomReached = useDebounce(() => {
    startTransition(() => {
      dispatchPhotos({page: photos.page + 1, per_page: photos.per_page});
    });
  }, 50);

  if (photos?.photos.length === 0 && loading) {
    return <MasonryVirtualizedSkeleton numColumns={MAX_COLUMNS} numRows={6} />;
  }
  
  return <>
    <MasonryVirtualized photos={photos.photos} onBottomReached={onBottomReached} onPhotoClick={handlePhotoClick} />
  </>;
};

export default Home;
