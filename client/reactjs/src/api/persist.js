const persistKey = 'zipcode-weather-8b5365822adb';
const zipTableKey = 'zipTable';
const isCurrentZipCodeKey = 'isCurrentZipCode';

const defaultEmptyStore = { [zipTableKey]: {} };

const hydrate = () => {
  const saved = localStorage.getItem(persistKey);

  if (!saved || saved === 'null') return defaultEmptyStore;

  return JSON.parse(saved);
};

const persist = (currentZipCode, data) => {
  if (!data) {
    console.error('... must pass defined params to be persisted'); // eslint-disable-line no-console
    throw Error('^^^');
  }

  const saved = hydrate();

  const zipTable = saved[zipTableKey];

  Object.keys(zipTable).forEach((zcode) => {
    zipTable[zcode][isCurrentZipCodeKey] = false;
  });

  localStorage.setItem(
    persistKey,
    JSON.stringify({
      data,
      [zipTableKey]: {
        ...zipTable,
        [data.location.zipCode]: { ...data, [isCurrentZipCodeKey]: true }
      }
    })
  );
};

const presentInSaved = (zipCode) => {
  const saved = hydrate();
  return (saved && saved[zipTableKey] && saved[zipTableKey][zipCode]);
};

const noSavedData = (saved) => (
  !saved || !saved[zipTableKey] || Object.keys(saved[zipTableKey]).length < 1
);

const savedDataList = (currentZipCode) => {
  const saved = hydrate();

  if (noSavedData(saved)) return [];

  const zipTable = saved[zipTableKey];

  if (!zipTable[currentZipCode]) {
    console.error('... saved does not contain current zip code', zipTable, currentZipCode); // eslint-disable-line no-console
    throw Error('^^^');
  }

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
  savedDataList,
  noSavedData
};
