import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TEditors = {
  headers: string;
  variables: string;
  request: string;
  response: string;
};
const initialState: TEditors = {
  headers: 'хедеры',
  variables: 'значения',
  request: 'запросы',
  response: 'ответ',
};

const GraphiSlice = createSlice({
  name: 'Graphi',
  initialState,
  reducers: {
    setRequest(state, action: PayloadAction<string>) {
      state.request = action.payload;
    },

    setVaribalse(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },

    setHeaders(state, action: PayloadAction<string>) {
      state.headers = action.payload;
    },
    serResponce(state, action: PayloadAction<string>) {
      state.response = action.payload;
    },
  },
});

export const { setHeaders, setRequest, setVaribalse } = GraphiSlice.actions;

export default GraphiSlice.reducer;
