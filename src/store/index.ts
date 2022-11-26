import { configureStore } from '@reduxjs/toolkit'
import adminActionHistory from './adminActionHistorySlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedAdminActionHistory = persistReducer(persistConfig, adminActionHistory)

export const store = configureStore({
  reducer: {
    adminActionHistory: persistedAdminActionHistory
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === `development`) {

      const { logger } = require(`redux-logger`);
     
      return getDefaultMiddleware({
        serializableCheck: false
      }).concat(logger);
      
    }
    return getDefaultMiddleware({
      serializableCheck: false
    })

  }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch