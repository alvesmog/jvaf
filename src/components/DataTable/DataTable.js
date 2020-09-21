import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import FetchContext from "../FetchContext";
import DataContext from "../DataContext";
import CacheContext from "../CacheContext";
import { TableWrapper, StyledPopUp, FooterContent } from "./styles";
import {
  Table,
  Header,
  Icon,
  Segment,
  Pagination,
  Statistic,
  Select,
} from "semantic-ui-react";

function DataTable() {
  const { cache } = useContext(CacheContext);
  const { fetch } = useContext(FetchContext);
  const { data, setData } = useContext(DataContext);
  const [paginatedData, setPaginatedData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [sorted, setSorted] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const contextRef = React.useRef();
  const pageOptions = [
    { key: "5", value: 5, text: "5" },
    { key: "10", value: 10, text: "10" },
    { key: "20", value: 20, text: "20" },
    { key: "40", value: 40, text: "40" },
    { key: "80", value: 80, text: "80" },
  ];

  const headerStyle = {
    position: "sticky",
    top: "0",
    backgroundColor: "#f9fafb",
  };
  const footerStyle = {
    position: "sticky",
    bottom: "0",
  };

  var userHasSorted = false;

  useEffect(() => {
    setTotalPages(data.length / entriesPerPage);
    paginate(data, entriesPerPage, activePage);
  }, [data, cache]);

  useEffect(() => {
    setTimeout(() => {
      setOpenPopup(true);
      setTimeout(() => {
        setOpenPopup(false);
      }, 10000);
    }, 8000);
  }, []);

  function handleSorting(column) {
    let sortedData;
    let newDirection;
    if (sorted) {
      if (direction === "ascending") {
        newDirection = "descending";
        sortedData = _.sortBy(data, [column]).reverse();
      } else {
        newDirection = "ascending";
        sortedData = _.sortBy(data, [column]);
      }
    } else {
      sortedData = _.sortBy(data, [column]);
      newDirection = "ascending";
      userHasSorted = true;
    }
    setDirection(newDirection);
    setData(sortedData);
    setSorted(column);
    paginate(sortedData, entriesPerPage, activePage);
  }

  function handleAmountOfDisplayedEntries(e, eventData) {
    setTotalPages(data.length / eventData.value);
    setEntriesPerPage(eventData.value);
    paginate(data, eventData.value, 1);
  }

  function handlePageChange(e, eventData) {
    setActivePage(eventData.activePage);
    paginate(data, entriesPerPage, eventData.activePage);
  }

  function paginate(array, page_size, page_number) {
    return setPaginatedData(
      array.slice((page_number - 1) * page_size, page_number * page_size)
    );
  }

  return (
    <>
      {!(paginatedData.length > 0) && (
        <Segment style={{ width: "100%", borderRadius: "12px" }} placeholder>
          <Header icon>
            {fetch.type === "static" ? (
              <>
                <Icon name={fetch.icon} />
                <h3 style={{ marginTop: "50px" }}>{fetch.message}</h3>
              </>
            ) : (
              <>
                <Icon name="clock outline" />
                <h3 style={{ marginTop: "50px" }}>Loading...</h3>
              </>
            )}
          </Header>
        </Segment>
      )}
      {paginatedData.length > 0 && (
        <>
          <strong ref={contextRef}></strong>
          <TableWrapper>
            <Table striped sortable>
              <StyledPopUp
                position="top left"
                context={contextRef}
                content="Tip: You can click on a table header to sort the content!"
                open={openPopup}
              />
              <Table.Header>
                <Table.Row>
                  {paginatedData[0] &&
                    Object.keys(data[0]).map((header, i) => (
                      <Table.HeaderCell
                        sorted={sorted === header ? direction : null}
                        onClick={() => handleSorting(header)}
                        style={headerStyle}
                        column={header}
                        key={i}
                      >
                        {header}
                      </Table.HeaderCell>
                    ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {paginatedData[0] &&
                  paginatedData.map((entry, i) => (
                    <Table.Row key={i}>
                      {Object.values(entry).map((cellData, i) => {
                        try {
                          return (
                            <Table.Cell key={i}>
                              {cellData.toString()}
                            </Table.Cell>
                          );
                        } catch {
                          console.log(cellData);
                        }
                      })}
                    </Table.Row>
                  ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  {paginatedData[0] && (
                    <Table.HeaderCell
                      style={footerStyle}
                      colSpan={Object.keys(data[0]).length}
                    >
                      <FooterContent>
                        <Statistic.Group
                          style={{ alignSelf: "center" }}
                          size="mini"
                        >
                          <Statistic>
                            <Statistic.Value>
                              Displaying {data.length} out of {cache.length}{" "}
                              Entries
                            </Statistic.Value>
                          </Statistic>
                        </Statistic.Group>
                        <div>
                          <Select
                            upward
                            className="select"
                            placeholder="Entries per page"
                            options={pageOptions}
                            onChange={handleAmountOfDisplayedEntries}
                          />
                          <Pagination
                            style={{ float: "right" }}
                            defaultActivePage={1}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                        </div>
                      </FooterContent>
                    </Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Footer>
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
}

export default DataTable;
