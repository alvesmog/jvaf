import React, { useContext } from "react";
import DataContext from "../DataContext";
import { TableWrapper } from "./styles";
import { Table } from "semantic-ui-react";

function DataTable() {
  const { data } = useContext(DataContext);

  return (
    <>
      <TableWrapper>
        <Table >
          <Table.Header>
            <Table.Row>
              {data.length &&
                Object.keys(data[0]).map((header) => (
                  <Table.HeaderCell>{header}</Table.HeaderCell>
                ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.length &&
              data.map((entry) => (
                <Table.Row>
                  {Object.values(entry).map((cellData) => (
                    <Table.Cell>{cellData.toString()}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total entries: {data.length}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
      </TableWrapper>
      ;
    </>
  );
}

export default DataTable;
