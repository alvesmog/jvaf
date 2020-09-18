import styled from "styled-components";

export const FilterWrapper = styled.div`
  width: 20%;
  max-height: 650px;
  border-radius: 8px;
  border-width: 2pt;
  overflow-y: auto;
  @media(max-width: 375px) {
    width: 100%
  }
`;
