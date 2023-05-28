import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import graphiReduser from './graphiSlice';
import docsSlice from './docsSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    graphi: graphiReduser,
    docs: docsSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
