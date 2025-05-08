'use client';

import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { Photo } from '@/types/photos';
import NextImage from 'next/image';
import { ImageSkeleton } from './PhotoDetailSkeleton';

const DetailContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  color: black;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const PhotoContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  left: 0;
`;

const InfoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const PhotographerInfo = styled.div`
  margin-bottom: 16px;
  
  a {
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Image = styled(NextImage)<{ $visible: string }>`
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    visibility: ${({ $visible }) => $visible};
`;

export interface PhotoDetailProps {
  photo: Photo | null;
  onBack: () => void;
} 

const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DetailContainer>
      <BackButton onClick={onBack}>
        ← Back to Gallery
      </BackButton>
      <PhotoContainer>
        { 
          isLoading &&
            <ImageSkeleton   />
        }
        {photo && <Image $visible={isLoading ? 'hidden' : 'visible'} onLoad={() => setIsLoading(false)} src={photo?.src.original} alt={photo?.alt} width={photo?.width} height={photo?.height} />}
      </PhotoContainer>

      <InfoContainer>
        <Title>{photo?.alt}</Title>
        
        <PhotographerInfo>
          Photo by{' '}
          <a href={photo?.photographer_url} target="_blank" rel="noopener noreferrer">
            {photo?.photographer}
          </a>
        </PhotographerInfo>
      </InfoContainer>
    </DetailContainer>
  );
};

export default memo(PhotoDetail); 