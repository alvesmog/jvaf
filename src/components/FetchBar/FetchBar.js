import React, { useContext, useState } from "react";
import CacheContext from "../CacheContext";
import { FetchBarWrapper } from "./styles";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";

function FetchBar() {
  const { setCache } = useContext(CacheContext);
  const [fetchUrl, setFetchUrl] = useState();
  const [placeholder, setPlaceholder] = useState("Array of JSONs URL...");

  function handleClick() {
    if (fetchUrl) {
      axios.get(fetchUrl).then((res) => (Array.isArray(res.data)) ? setCache(res.data) : setCache([res.data]));
      //axios.get(fetchUrl).then((res) => setCache(res.data));
    } else {
      setPlaceholder("Please enter a valid URL");
    }
  }

  function changeHandler(e) {
    setFetchUrl(e.target.value);
  }

  return (
    <FetchBarWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        action
        onChange={changeHandler}
      >
        <input />
        <Button onClick={handleClick}>Fetch!</Button>
      </Input>
    </FetchBarWrapper>
  );
}

export default FetchBar;
