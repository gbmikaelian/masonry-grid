import { Photo, PhotoResponse } from "@/types/photos";
import { pexelsApiV1 } from "@/utils/axios";

export const getPhotos = async (page: number, perPage: number): Promise<PhotoResponse> => {
  const response = await pexelsApiV1.get('/curated', {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const getPhoto = async (id: string): Promise<Photo> => {
  const response = await pexelsApiV1.get(`/photos/${id}`, {
  });
  return response.data;
};

export const searchPhotos = async (
  query: string,
  page: number = 1,
  perPage: number = 20
): Promise<PhotoResponse> => {
  const response = await pexelsApiV1.get<PhotoResponse>('/search', {
    params: {
      query,
      page,
      per_page: perPage,
    },
  });
  return response.data;
}; 