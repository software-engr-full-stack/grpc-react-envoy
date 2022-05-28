const persistKey = 'zipcode-weather-8b5365822adb';
const zipTableKey = 'zipTable';

const defaultEmptyStore = { [zipTableKey]: {} };

const hydrate = () => {
  const saved = localStorage.getItem(persistKey);

  if (!saved || saved === 'null') return defaultEmptyStore;

  return JSON.parse(saved);
};

const persist = (data) => {
  if (!data) {
    console.error('... must pass defined params to be persisted'); // eslint-disable-line no-console
    throw Error('^^^');
  }

  const saved = hydrate();

  localStorage.setItem(
    persistKey,
    JSON.stringify({
      data,
      [zipTableKey]: {
        ...saved[zipTableKey],
        [data.location.zipCode]: data
      }
    })
  );
};

const presentInSaved = (zipCode) => {
  const saved = hydrate();
  return (saved && saved[zipTableKey] && saved[zipTableKey][zipCode]);
};

const savedDataList = (currentZipCode) => {
  const saved = hydrate();
  if (!saved || !saved[zipTableKey]) return [];

  const zipTable = saved[zipTableKey];

  if (!zipTable[currentZipCode]) {
    console.error('... saved does not contain current zip code', zipTable, currentZipCode); // eslint-disable-line no-console
    throw Error('^^^');
  }

  Object.keys(zipTable).forEach((zcode) => {
    if (zcode === currentZipCode) {
      zipTable[zcode].current = true;
    } else {
      zipTable[zcode].current = false;
    }
  });

  return Object.values(zipTable);
};

const persistClear = () => {
  localStorage.setItem(persistKey, JSON.stringify(defaultEmptyStore));
};

export {
  persist,
  hydrate,
  persistClear,
  presentInSaved,
  savedDataList
};
