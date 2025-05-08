import { GAP } from "@/constants";
import styled from "styled-components";
import { keyframes } from "styled-components";
import NextImage from "next/image";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const GridContainer = styled.div<{ height?: string; $overflowX?: string, $maxWidth?: number }>`
  margin: 0 auto;
  padding: 10px;
  position: relative;
  height: ${props => props.height};
  overflow-x: ${props => props.$overflowX};
  max-width: ${props => props.$maxWidth}px;
`;

export const FlexContainer = styled.div<{  $alignItems?: string, $position?: string, $minHeight?: number }>`
  display: flex;
  gap: ${GAP}px;
  align-items: ${props => props.$alignItems};
  position: ${props => props.$position};
  min-height: ${props => props.$minHeight};
`;

export const Column = styled.div<{ $minHeight?: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  min-height: ${props => props.$minHeight !== undefined ? `${props.$minHeight}px` : 'unset'};
  flex: 1;
`;

export const PhotoCard = styled.div<{ height: number; $top: number; isLoading?: boolean }>`
  width: 100%;
  height: ${props => props.height}px;
  position: absolute;
  left: 0;
  right: 0;
  top: ${props => props.$top}px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  border-radius: 8px;
  animation: ${shimmer} 1.2s infinite;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Image = styled(NextImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
`;

export const SkeletonCard = styled.div<{ height: number; $top: number }>`
  width: 100%;
  height: ${props => props.height}px;
  position: absolute;
  left: 0;
  right: 0;
  top: ${props => props.$top}px;
  border-radius: 8px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite;
`;
