"use client";
import { useCallback, useState } from "react";
import { Photo } from "@/types/photos";
import { useRouter } from "next/navigation";
import { getPhotos, searchPhotos } from "./services/photoService";
import useDebounce from "@/hooks/useDebounce";
import MasonryVirtualized from "@/components/MasonryVirtualized";
import { MAX_COLUMNS, MOBILE_MAX_COLUMNS, PER_PAGE } from "@/constants";
import { MasonryVirtualizedSkeleton } from "@/components/MasonryVirtualized/MasonryVirtualizedSkeleton";
import Search from "@/components/Search";
import styled from "styled-components";
import { useInfiniteLoader } from "@/hooks/useInfinityLoader";
import useIsMobile from "@/hooks/useIsMobile";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1400px;
`;

const NoDataFound = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const fetchFn = useCallback(
    async (page: number, limit: number) => {
      const response = await (search
        ? searchPhotos(search, page, limit)
        : getPhotos(page, limit));

      return { items: response.photos, hasMore: Boolean(response.next_page) };
    },
    [search]
  );

  const {
    items: photos,
    loadMore,
    hasMore,
    loading,
    reset,
  } = useInfiniteLoader({
    limit: PER_PAGE,
    fetchFn,
  });

  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      router.push(`/photo/${photo.id}`);
    },
    [router]
  );

  const onBottomReached = useDebounce(() => {
    if (hasMore) {
      loadMore();
    }
  }, 50);

  const handleSearch = useDebounce((search: string) => {
    reset();
    setSearch(search);
  }, 500);

  const isMobile = useIsMobile();

  return (
    <Container>
      <Search $mx={10} onSearch={handleSearch} />
      {(photos?.length === 0 && loading) || !photos.length ? (
        loading ? (
          <MasonryVirtualizedSkeleton
            numColumns={isMobile ? MOBILE_MAX_COLUMNS : MAX_COLUMNS}
            numRows={6}
          />
        ) : (
          <NoDataFound>No Data Found</NoDataFound>
        )
      ) : (
        <MasonryVirtualized
          photos={photos}
          onBottomReached={onBottomReached}
          onPhotoClick={handlePhotoClick}
        />
      )}
    </Container>
  );
};

export default Home;
