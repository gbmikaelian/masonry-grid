'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Photo } from '../types/photos';
import NextImage from 'next/image';

const GridContainer = styled.div`
  margin: 0 auto;
  padding: 16px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const PhotoCard = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled(NextImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
`;

// Skeleton animation
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  border-radius: 8px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite;
`;

export interface MasonryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ photos, onPhotoClick }) => {
  const [columns, setColumns] = useState<Photo[][]>([]);
  const [numColumns, setNumColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);


  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newNumColumns = Math.max(1, Math.floor(containerWidth / 300));
    setNumColumns(newNumColumns);

    const newColumns: Photo[][] = Array.from({ length: newNumColumns }, () => []);
    
    photos.forEach((photo) => {
      const shortestColumn = newColumns.reduce((shortest, current) => {
        const shortestHeight = shortest.reduce((sum, p) => sum + (p.height / p.width), 0);
        const currentHeight = current.reduce((sum, p) => sum + (p.height / p.width), 0);
        return currentHeight < shortestHeight ? current : shortest;
      }, newColumns[0]);

      shortestColumn.push(photo);
    });

    setColumns(newColumns);
  }, [photos]);

  useEffect(() => {
    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [calculateColumns, photos]);

  return (
    <GridContainer ref={containerRef}>
      <FlexContainer>
        {columns.map((column, columnIndex) => {
          return (
            <Column key={columnIndex}>
              {column.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  height={(photo.height / photo.width) * (containerRef.current?.offsetWidth || 0) / numColumns}
                  onClick={() => onPhotoClick(photo)}
                >
                  <Image
                    src={photo.src.large2x}
                    alt={photo.alt}
                    loading="lazy"
                    width={photo.width}
                    height={photo.height}
                  />
                </PhotoCard>
              ))}
            </Column>
          )
        })}
      </FlexContainer>
    </GridContainer>
  );
};

interface MasonryGridSkeletonProps {
  numColumns?: number;
  numRows?: number;
}

export const MasonryGridSkeleton: React.FC<MasonryGridSkeletonProps> = ({ numColumns = 3, numRows = 6 }) => {
  // Simulate random heights for skeleton cards
  const heights = Array.from({ length: numColumns * numRows }, () => 200 + Math.random() * 200);
  const columns = Array.from({ length: numColumns }, (_, colIdx) =>
    heights.slice(colIdx * numRows, (colIdx + 1) * numRows)
  );
  return (
    <GridContainer>
      <FlexContainer>
        {columns.map((column, columnIndex) => (
          <Column key={columnIndex}>
            {column.map((height, idx) => (
              <SkeletonCard key={idx} height={height} />
            ))}
          </Column>
        ))}
      </FlexContainer>
    </GridContainer>
  );
};

export default MasonryGrid; 