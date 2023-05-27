import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import graphiReduser from './graphiSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    graphi: graphiReduser,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
