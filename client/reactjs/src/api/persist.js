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
    throw Error('...');
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

const savedDataList = () => {
  const saved = hydrate();
  if (!saved || !saved[zipTableKey]) return [];

  return Object.values(saved[zipTableKey]);
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
