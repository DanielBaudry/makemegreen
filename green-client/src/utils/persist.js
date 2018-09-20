import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persist = {
  key: 'makemegreen',
  storage,
  whitelist: [],
}

export default persist
