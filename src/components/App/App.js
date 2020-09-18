import React, { useState, useEffect } from "react";
import FetchContext from "../FetchContext";
import DataContext from "../DataContext";
import CacheContext from "../CacheContext";
import Container from "../Container";

function App() {
  const [fetch, setFetch] = useState({
    type: "static",
    icon: "frown outline",
    message:
      "Oops! There's nothing to show here yet... Try fetching some data!",
  });
  const [cache, setCache] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(cache);
  }, [cache]);

  return (
    <div className="App">
      <header className="App-header">
        <FetchContext.Provider value={{ fetch, setFetch }}>
          <CacheContext.Provider value={{ cache, setCache }}>
            <DataContext.Provider value={{ data, setData }}>
              <Container />
            </DataContext.Provider>
          </CacheContext.Provider>
        </FetchContext.Provider>
      </header>
    </div>
  );
}

export default App;
