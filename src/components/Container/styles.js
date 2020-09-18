import styled from "styled-components";

export const Wrapper = styled.div`
  width: inherit;
  height: inherit;
  padding: 1rem;
  overflow-y: auto;
  height: 100vh;
  div.content {
    display: flex;
    height: 650px;
    padding: 0.25rem;
    @media (max-width: 375px) {
      flex-direction: column;
    }
  }
  * {
    margin: 0.5rem;
  }
`;

export const Bg = styled.div`
  background-image: linear-gradient(to bottom, #71b3ff, #a9d1ff, #ffffff);
`;

export const Copyright = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
`;
