'use client';

import { getPhoto } from "@/app/services/photoService";
import PhotoDetail from "@/components/PhotoDetail";
import { Photo } from "@/types/photos";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useTransition } from "react";
import PhotoDetailSkeleton from '@/components/PhotoDetailSkeleton';

function PhotoPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, startTransition] = useTransition()
  
  const [photo, dispatchPhotos] = useActionState<Photo | null>(async () => {
    const photo = await getPhoto(id as string);
    
    return photo
  }, null)

  useEffect(() => {
    startTransition(() => {
      dispatchPhotos();
    });
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, [router]);
  

  if (loading || !photo) {
    return <PhotoDetailSkeleton />;
  }
  
  return <PhotoDetail
  photo={photo}
  onBack={onBack}
/>;
}

export default PhotoPage;