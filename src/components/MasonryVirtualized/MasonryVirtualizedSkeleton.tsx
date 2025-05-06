import { Column, SkeletonCard } from "./MasonryStyles";
import { GAP } from "@/constants";
import { FlexContainer, GridContainer } from "./MasonryStyles";
import styled from 'styled-components';

interface MasonryVirtualizedSkeletonProps {
  numColumns?: number;
  numRows?: number;
}

const ScrollableGridContainer = styled(GridContainer)`
  height: 100vh;
  overflow-y: auto;
`;

const MasonryFlexContainer = styled(FlexContainer)`
  align-items: flex-start;
  position: relative;
`;

export const MasonryVirtualizedSkeleton: React.FC<MasonryVirtualizedSkeletonProps> = ({ numColumns = 3, numRows = 6 }) => {
  const heights = Array.from({ length: numColumns * numRows }, () => 200 + Math.random() * 200);
  const columns = Array.from({ length: numColumns }, (_, colIdx) =>
    heights.slice(colIdx * numRows, (colIdx + 1) * numRows)
  );
  return (
    <ScrollableGridContainer>
      <MasonryFlexContainer>
        {columns.map((column, _columnIndex) => {
          let y = 0;
          return (
            <Column key={_columnIndex}>
              {column.map((height, idx) => {
                const top = y;
                y += height + GAP;
                return <SkeletonCard key={idx} height={height} top={top} />;
              })}
            </Column>
          );
        })}
      </MasonryFlexContainer>
    </ScrollableGridContainer>
  );
};