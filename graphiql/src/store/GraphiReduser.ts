import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TEditors = {
  headers: string;
  variables: string;
  request: string;
  response: string;
};
const initialState: TEditors = {
  headers: '',
  variables: `{
    "filter":
      {
      "name": "rick"
      }
    }`,
  request: `query Characters($filter: FilterCharacter) {
  characters(filter: $filter) {
    results {
      name
    }
  }
}`,
  response: '',
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
    setResponce(state, action: PayloadAction<string>) {
      state.response = action.payload;
    },
  },
});

export const { setHeaders, setRequest, setVaribalse, setResponce } = GraphiSlice.actions;

export default GraphiSlice.reducer;
