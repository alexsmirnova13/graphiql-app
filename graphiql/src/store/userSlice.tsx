import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../helpers/types';

const initialState: UserState = {
  email: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = '';
      state.id = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
