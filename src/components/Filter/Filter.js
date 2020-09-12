import React, { useContext, useState, useEffect } from "react";
import CacheContext from "../CacheContext";
import DataContext from "../DataContext";
import { FilterWrapper } from "./styles";
import { Checkbox, Divider, Header, Segment } from "semantic-ui-react";

function Filter() {
  const { cache } = useContext(CacheContext);
  const { data, setData } = useContext(DataContext);
  const [headers, setHeaders] = useState([]);
  const [helperValues, setHelperValues] = useState({});
  const [actualValues, setActualValues] = useState({});
  const [checkedFilters, setCheckedFilters] = useState({});
  const [testData, setTestData] = useState([]);
  const [dataWasfiltered, setDataWasFiltered] = useState(false);

  useEffect(() => {
    let dataHeaders;
    cache[0] && (dataHeaders = extractHeaders(cache));
    setHeaders(dataHeaders);
  }, [cache]);

  useEffect(() => {
    headers && setDataObject(headers);
  }, [headers]);

  useEffect(() => {
    fillDataObject(helperValues);
  }, [helperValues]);

  useEffect(() => {
    let values = Object.keys(checkedFilters).map(
      (key) => checkedFilters[key].length
    );
    let check = 0;
    for (let i of values) {
      if (i !== 0) {
        check = i;
      }
    }

    if (check !== 0) {
      filterObjects();
    } else {
      setData(cache);
    }
  }, [checkedFilters]);

  function extractHeaders(data) {
    return Object.keys(data[0]);
  }

  async function setDataObject(headers) {
    let keys = await headers.reduce((a, b) => ((a[b] = []), a), {});
    setHelperValues(keys);
    setCheckedFilters(keys);
  }

  function fillDataObject(rawValues) {
    let tempValuesObj = {};
    Object.keys(rawValues).map((key) => {
      tempValuesObj[key] = [...new Set(cache.map((entry) => entry[key]))];
    });
    Object.keys(tempValuesObj).length !== 0 && setActualValues(tempValuesObj);
  }

  function filterHandler(e, eventData) {
    let key = eventData.column;
    let value = eventData.value;
    let include = eventData.checked;

    if (include == true) {
      setCheckedFilters({
        ...checkedFilters,
        [key]: [...checkedFilters[key], value],
      });
    } else {
      let temp = [...checkedFilters[key]];
      setCheckedFilters({
        ...checkedFilters,
        [key]: temp.filter((el) => el !== value),
      });
    }
  }

  function filterObjects() {
    let filtered = returnFilteredObjects();
    filtered.length && setData(filtered);
  }

  function returnFilteredObjects() {
    let filteredObjects = [];

    Object.keys(checkedFilters).map((filteredColumn) =>
      checkedFilters[filteredColumn].map((filteredValue) => {
        if (dataWasfiltered) {
          data
            .filter(
              (entry) =>
                entry[filteredColumn].toString() == filteredValue.toString()
            )
            .map((filteredObject) => filteredObjects.push(filteredObject));
        } else {
          cache
            .filter((entry) => entry[filteredColumn] == filteredValue)
            .map((filteredObject) => filteredObjects.push(filteredObject));
          //setDataWasFiltered(true);
        }
      })
    );

    return filteredObjects;
  }

  return (
    <>
      {headers && (
        <FilterWrapper>
          <Segment>
            <Header as="h2">Filter data</Header>
            <Divider section />
            {headers &&
              headers.map((header) => {
                return (
                  <>
                    <Header as="h3">{header}</Header>
                    {Object.keys(actualValues).length !== 0 &&
                      actualValues[header] &&
                      actualValues[header].map((option) => (
                        <Checkbox
                          label={option.toString()}
                          column={header.toString()}
                          value={option.toString()}
                          onChange={filterHandler}
                        />
                      ))}
                    <Divider section />
                  </>
                );
              })}
          </Segment>
        </FilterWrapper>
      )}
    </>
  );
}

export default Filter;
