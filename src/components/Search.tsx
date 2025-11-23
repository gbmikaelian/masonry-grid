import styled from "styled-components";
import { Search as SearchIcon } from "@/components/SVGComponents";
import { ChangeEvent, FC, memo, useCallback, useState } from "react";

const SearchContainer = styled.div<{ $mx?: number }>`
  display: flex;
  align-items: center;
  background: #fafafa;
  border-radius: 16px;
  padding: 0 20px;
  margin: 20px ${(props) => props.$mx}px;
  height: 56px;
  max-width: 600px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 22px;
  color: #222;
  flex: 1;
  padding: 0;

  &::placeholder {
    color: #bdbdbd;
    font-size: 22px;
  }
`;

const WrappedSearchIcon = styled(SearchIcon)`
  color: #bdbdbd;
  font-size: 28px;
  margin-left: 10px;
  cursor: pointer;
`;

type SearchProps = {
  onSearch?: (search: string) => void;
  defaultSearch?: string;
  $mx?: number;
};

const Search: FC<SearchProps> = ({ onSearch, $mx, defaultSearch = "" }) => {
  const [search, setSearch] = useState(defaultSearch);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onSearch?.(e.target.value);
    },
    [onSearch]
  );

  return (
    <SearchContainer $mx={$mx}>
      <SearchInput
        value={search}
        placeholder="Search for free photos"
        onChange={handleSearch}
      />
      <WrappedSearchIcon />
    </SearchContainer>
  );
};

export default memo(Search);
