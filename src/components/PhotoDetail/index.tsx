import React, { memo } from 'react';
import styled from 'styled-components';
import { Photo } from '@/types/photos';
import NextImage from 'next/image';

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
  max-height: 80vh;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
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

const Image = styled(NextImage)`
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
`;

export interface PhotoDetailProps {
  photo: Photo;
  onBack: () => void;
} 

const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onBack }) => {
  return (
    <DetailContainer>
      <BackButton onClick={onBack}>
        ← Back to Gallery
      </BackButton>
      
      <PhotoContainer>
        <Image src={photo?.src.original} alt={photo?.alt} width={photo?.width} height={photo?.height} />
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