import React, { useState, useEffect } from 'react';

import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

import Map from './Map/Map';
import Input from './Map/Input';
import RecentSearches from './Reports/RecentSearches';
import UI from './UI/UI';

import { CurrentEntryProvider } from './context';
import * as api from './api';

function App() {
  const [zipCode, setZipCode] = useState();

  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setAPIError] = useState();

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setIsFetching(true);

    api.defaultLocation().then((fd) => {
      setIsFetching(false);
      const apiErr = fd.apiError;
      if (apiErr) {
        setAPIError(apiErr);
        return;
      }
      setZipCode(api.defaultZipCode);
      setData(fd);
      setDataList(api.savedDataList(api.defaultZipCode));
    });
  }, []);

  const defaultInputLabel = 'Enter zip code';
  const [inputLabel, setInputLabel] = useState(defaultInputLabel);

  const handleSubmit = (zcode) => {
    setIsFetching(true);
    api.retrieve(zcode).then((fd) => {
      setIsFetching(false);
      const apiErr = fd.apiError;
      if (apiErr) {
        setAPIError(apiErr);
        return;
      }
      setZipCode(zcode);
      setData(fd);
      setDataList(api.savedDataList(zcode));
    });
  };

  const handleClickEntry = (entry) => {
    setZipCode(entry.location.zipCode);
    setData(entry);
  };

  const handleClearSearches = () => {
    setDataList([]);
    api.persistClear();
    handleSubmit(api.defaultZipCode);
  };

  if (apiError) {
    return (
      // TODO: Make front end error reporting more robust.
      //   Probably add a on close (onClose) handler.
      //   See src/Map/Input.js Alert.
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {apiError}
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <CurrentEntryProvider value={data}>
      <UI
        Input={(
          <Input
            error={apiError}
            setAPIError={setAPIError}
            onSubmit={handleSubmit}
            defaultLabel={defaultInputLabel}
            setLabel={setInputLabel}
            label={inputLabel}
            isFetching={isFetching}
            text={zipCode}
          />
        )}
        LeftSideBar={(
          <RecentSearches
            onClickEntry={handleClickEntry}
            onClearSearches={handleClearSearches}
            dataList={dataList}
            currentEntry={data}
          />
        )}
      >
        {
          isFetching ? (
            <div
              style={{
                opacity: 0.25,
                background: '#000000',
                height: '92vh'
              }}
            />
          ) : (
            <Map markers={dataList} />
          )
        }
      </UI>
    </CurrentEntryProvider>
  );
}

export default App;
