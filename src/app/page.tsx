'use client';

import MasonryGrid, { MasonryGridSkeleton } from "@/components/MasonryGrid";
import { useCallback, useEffect, useTransition } from "react";
import { Photo, PhotoResponse, PhotosRequestQuery } from "@/types/photos";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { getPhotos } from "./services/photoService";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import useDebounce from "@/hooks/useDebounce";

const PER_PAGE = 80;

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

  const onIntersect = useDebounce(() => {
    startTransition(() => {
      dispatchPhotos({page: photos.page + 1, per_page: photos.per_page});
    });
  }, 100);

  const [sentinelRef] = useInfiniteScroll({
    threshold: 0.1,
    onIntersect: () => {
      if (photos.next_page) {
        onIntersect()
      }
    },
  });

  if (photos?.photos.length === 0 && loading) {
    return <MasonryGridSkeleton numColumns={3} numRows={6} />;
  }
  
  return <>
    <MasonryGrid photos={photos?.photos} onPhotoClick={handlePhotoClick} />
    <div ref={sentinelRef} />
  </>;
};

export default Home;
