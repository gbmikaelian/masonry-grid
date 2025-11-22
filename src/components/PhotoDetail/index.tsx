'use client';

import React, { memo, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Photo } from '@/types/photos';
import NextImage from 'next/image';
import { ImageSkeleton } from './PhotoDetailSkeleton';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const DetailContainer = styled.div`
  padding: 32px 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
  animation: ${fadeIn} 0.4s ease-out;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #333;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 10px 20px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateX(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateX(-2px);
  }
`;

const PhotoContainer = styled.div<{ $avgColor?: string }>`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  position: relative;
  padding: 24px;
  background: ${({ $avgColor }) => 
    $avgColor 
      ? `linear-gradient(135deg, ${$avgColor}15 0%, ${$avgColor}08 50%, transparent 100%)`
      : 'transparent'
  };
  border-radius: 24px;
  transition: all 0.5s ease-out;
`;

const ImageWrapper = styled.div<{ $visible: boolean }>`
  position: relative;
  max-width: 100%;
  max-height: 80vh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
              0 8px 24px rgba(0, 0, 0, 0.1);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.98)')};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f5f5f5;
`;

const Image = styled(NextImage)`
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`;

const InfoContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: ${slideIn} 0.5s ease-out 0.2s both;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
  line-height: 1.3;
  letter-spacing: -0.02em;
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetadataLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
`;

const MetadataValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
`;

const PhotographerInfo = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #4a4a4a;
  
  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    
    &:hover {
      color: #1d4ed8;
      border-bottom-color: #2563eb;
    }
  }
`;

export interface PhotoDetailProps {
  photo: Photo | null;
  onBack: () => void;
}

const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (photo) {
      setIsLoading(true);
      setImageLoaded(false);
    }
  }, [photo]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setTimeout(() => setImageLoaded(true), 100);
  };

  if (!photo) return null;

  return (
    <DetailContainer>
      <BackButton onClick={onBack}>
        <span>←</span>
        <span>Back to Gallery</span>
      </BackButton>
      
      <PhotoContainer $avgColor={photo.avg_color}>
        {isLoading && <ImageSkeleton />}
        <ImageWrapper $visible={imageLoaded}>
          <Image
            onLoad={handleImageLoad}
            src={photo.src.original}
            alt={photo.alt || 'Photo'}
            width={photo.width}
            height={photo.height}
            priority
          />
        </ImageWrapper>
      </PhotoContainer>

      <InfoContainer>
        <Title>{photo.alt || 'Untitled Photo'}</Title>
        
        <MetadataContainer>
          <MetadataItem>
            <MetadataLabel>Dimensions</MetadataLabel>
            <MetadataValue>{photo.width} × {photo.height}</MetadataValue>
          </MetadataItem>
          {photo.avg_color && (
            <MetadataItem>
              <MetadataLabel>Color</MetadataLabel>
              <MetadataValue>
                <span
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    backgroundColor: photo.avg_color,
                    verticalAlign: 'middle',
                    marginRight: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}
                />
                {photo.avg_color.toUpperCase()}
              </MetadataValue>
            </MetadataItem>
          )}
        </MetadataContainer>
        
        <PhotographerInfo>
          Photo by{' '}
          <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer">
            {photo.photographer}
          </a>
        </PhotographerInfo>
      </InfoContainer>
    </DetailContainer>
  );
};

export default memo(PhotoDetail); 