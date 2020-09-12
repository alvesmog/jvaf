import React from "react";
import { Wrapper } from "./styles";
import FetchBar from "../FetchBar";
import DataTable from "../DataTable";
import Filter from "../Filter";


function Container() {
  return (
    <>
      <Wrapper>
        <FetchBar />
        <div className='content'>
          <Filter></Filter>
          <DataTable />
        </div>
      </Wrapper>
    </>
  );
}

export default Container;
