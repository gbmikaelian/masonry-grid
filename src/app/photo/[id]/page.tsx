'use client';

import { getPhoto } from "@/app/services/photoService";
import PhotoDetail from "@/components/PhotoDetail";
import { Photo } from "@/types/photos";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function PhotoPage() {
  const router = useRouter();
  const { id } = useParams();

  
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
     const fetchPhoto = async () => {
      const photo = await getPhoto(id as string);
      setPhoto(photo);
    }
    fetchPhoto();
  }, [id]);

  const onBack = useCallback(() => {
    router.back();
  }, [router]);
  
  
  return <PhotoDetail
    photo={photo}
    onBack={onBack}
  />;
}

export default PhotoPage;