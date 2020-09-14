import React, { useContext } from "react";
import DataContext from "../DataContext";
import { TableWrapper } from "./styles";
import { Table, Button, Header, Icon, Segment } from "semantic-ui-react";

function DataTable() {
  const { data } = useContext(DataContext);

  return (
    <>
      {!data[0] && (
        <Segment style={{ width: "100%", borderRadius: "12px" }} placeholder>
          <Header icon>
            <Icon name="frown outline" />
            Oops! There's nothing to show here yet... Try fetching some data!
          </Header>
        </Segment>
      )}
      {data[0] && (
        <TableWrapper>
          <Table striped>
            <Table.Header>
              <Table.Row>
                {data[0] &&
                  Object.keys(data[0]).map((header) => (
                    <Table.HeaderCell>{header}</Table.HeaderCell>
                  ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data[0] &&
                data.map((entry) => (
                  <Table.Row>
                    {Object.values(entry).map((cellData) => {
                      (() => {
                        try {
                          (() => <Table.Cell>{cellData.toString()}</Table.Cell>)()
                        } catch {
                          console.log(cellData);
                        }
                      })();
                    })}
                  </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                {data[0] && (
                  <Table.HeaderCell colSpan={Object.keys(data[0]).length}>
                    Total entries: {data.length}
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Footer>
          </Table>
        </TableWrapper>
      )}
    </>
  );
}

export default DataTable;
