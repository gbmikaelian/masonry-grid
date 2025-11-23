import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const DetailContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  color: black;
`;

const PhotoContainer = styled.div`
  width: 100%;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
`;

export const ImageSkeleton = styled.div`
  width: 400px;
  height: 550px;
  max-width: 100%;
  min-height: 60vh;
  border-radius: 12px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite;
  position: absolute;
  left: 0%;
  right: 0%;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TitleSkeleton = styled.div`
  width: 60%;
  height: 32px;
  margin-bottom: 16px;
  border-radius: 6px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite;
`;

const DateSkeleton = styled.div`
  width: 30%;
  height: 20px;
  margin-bottom: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite;
`;

const PhotographerSkeleton = styled.div`
  width: 40%;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite;
`;

const PhotoDetailSkeleton: React.FC = () => {
  return (
    <DetailContainer>
      <PhotoContainer>
        <ImageSkeleton />
      </PhotoContainer>
      <InfoContainer>
        <TitleSkeleton />
        <DateSkeleton />
        <PhotographerSkeleton />
      </InfoContainer>
    </DetailContainer>
  );
};

export default PhotoDetailSkeleton;
