import React, { useState, useEffect } from "react";
import DataContext from "../DataContext";
import CacheContext from "../CacheContext";
import Container from "../Container";

function App() {
  const [cache, setCache] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(cache);
  }, [cache]);

  return (
    <div className="App">
      <header className="App-header">
        <CacheContext.Provider value={{ cache, setCache }}>
          <DataContext.Provider value={{ data, setData }}>
            <Container />
          </DataContext.Provider>
        </CacheContext.Provider>
      </header>
    </div>
  );
}

export default App;
