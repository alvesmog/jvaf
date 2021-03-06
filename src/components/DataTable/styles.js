import styled from "styled-components";
import { Popup } from "semantic-ui-react";

export const TableWrapper = styled.div`
  width: 80%;
  max-height: 650px;
  border-radius: 8px;
  border-width: 2pt;
  overflow-y: auto;
  @media (max-width: 375px) {
    width: 100%;
  }
`;

export const StyledPopUp = styled(Popup)`
  &&& {
    box-shadow: 0px 0px 34px -5px rgba(0, 0, 0, 0.51);
    border-radius: 0;
    padding: 1em;
    background-color: #ffe09c;
    opacity: 0.9;
    top: 30;
    left: 1300;
    &:before {
      background-color: #ffe09c;
    }
    @media (max-width: 1300px) {
      position: relative;
      left: 700px !important;
    }
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div,
  a {
    margin: 0 !important;
    margin-right: 10px !important;
    align-items: center;
    @media (max-width: 1300px) {
      margin-right: 0px !important;
    }
  }
  div[role="listbox"] {
    height: 100%;
    min-width: 160px !important;
    max-width: 160px !important;
    @media (max-width: 1300px) {
      height: 40px;
    }
  }
  @media (max-width: 1300px) {
    .ui.mini.statistic > .value,
    .ui.mini.statistics .statistic > .value {
      font-size: 1rem !important;
    }
  }
`;
