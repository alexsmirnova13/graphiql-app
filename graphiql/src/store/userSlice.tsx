import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../helpers/types';

const initialState: UserState = {
  name: '',
  email: '',
  token: '',
  id: '',
  refreshToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.refreshToken = action.payload.refreshToken;
    },
    removeUser(state) {
      state.name = '';
      state.email = '';
      state.token = '';
      state.id = '';
      state.refreshToken = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
