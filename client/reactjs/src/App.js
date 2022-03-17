import React, { useState, useEffect } from 'react';

import fetchData from './data';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then((fd) => setData(fd));
  }, []);

  console.log({ data });

  return (
    <div className="App">
      <header className="App-header">
        Test
      </header>
    </div>
  );
}

export default App;
