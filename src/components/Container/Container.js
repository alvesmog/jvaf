import React from "react";
import { Wrapper, Bg, Copyright } from "./styles";
import FetchBar from "../FetchBar";
import DataTable from "../DataTable";
import Filter from "../Filter";

function Container() {
  return (
    <Bg>
      <Wrapper>
        <FetchBar />
        <div className="content">
          <Filter />
          <DataTable />
        </div>
        <Copyright>
          <h4>
            jvaf by{" "}
            <a style={{ color: "black" }} href="https://www.alvesmog.com">
              alvesmog.com
            </a>
          </h4>
        </Copyright>
      </Wrapper>
    </Bg>
  );
}

export default Container;
