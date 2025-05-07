"use client";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Photo, PhotoResponse, PhotosRequestQuery } from "@/types/photos";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { getPhotos, searchPhotos } from "./services/photoService";
import useDebounce from "@/hooks/useDebounce";
import MasonryVirtualized from "@/components/MasonryVirtualized";
import { MAX_COLUMNS, PER_PAGE } from "@/constants";
import { MasonryVirtualizedSkeleton } from "@/components/MasonryVirtualized/MasonryVirtualizedSkeleton";
import Search from "@/components/Search";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1400px;
`;

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const bottomReachedRef = useRef(false);

  const [photos, dispatchPhotos] = useActionState<PhotoResponse, PhotosRequestQuery>(async (state, {page, per_page, query}) => {
    const response = await (query ? searchPhotos(query, page, per_page) : getPhotos(page, per_page));

    const mergedPhotosMap = new Map(state.photos.map(photo => [photo.id, photo]));

    response.photos.forEach(photo => {
      mergedPhotosMap.set(photo.id, photo);
    });

    const uniquePhotosArray = Array.from(mergedPhotosMap.values());

    const newState = bottomReachedRef.current ? { ...state, ...response, photos: uniquePhotosArray }: response
    bottomReachedRef.current = false;
    return newState;
  }, {photos: [], page: 1, per_page: PER_PAGE, total_results: 0, next_page: ''});

  const [loading, startTransition] = useTransition()

  const handlePhotoClick = useCallback((photo: Photo) => {
    router.push(`/photo/${photo.id}`);
  }, [router]);

  const onBottomReached = useDebounce(() => {
    if (photos.next_page) { 
      bottomReachedRef.current = true;
      startTransition(() => {
        dispatchPhotos({page: photos.page + 1, per_page: photos.per_page, query: search});
      });
    }
  }, 50);

  const handleSearch = useDebounce((search: string) => {    
    startTransition(() => {
      dispatchPhotos({page: 1, per_page: PER_PAGE, query: search});
    });
  }, 500);

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);  
  
  return <Container>
    <Search $mx={10} onSearch={setSearch} />
    {
    (photos?.photos.length === 0 && loading) || !photos.photos.length
      ? <MasonryVirtualizedSkeleton numColumns={MAX_COLUMNS} numRows={6} />
      : <MasonryVirtualized photos={photos.photos} onBottomReached={onBottomReached} onPhotoClick={handlePhotoClick} />
    }
  </Container>;
};

export default Home;
