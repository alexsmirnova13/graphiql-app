import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistory } from '../сomponents/Graphi/Schema/interfaces';

interface IDocsState {
  search: string;
  focusedTypeName?: string;
  focusedFieldName?: string;
  history: IHistory[];
  isLoading: boolean;
}

const initialState: IDocsState = {
  search: '',
  history: [],
  isLoading: false,
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFocusedTypeName(state, action: PayloadAction<string>) {
      state.history = state.history.concat({
        typeName: state.focusedTypeName,
        fieldName: state.focusedFieldName,
        search: state.search,
      });
      state.focusedTypeName = action.payload;
      state.focusedFieldName = undefined;
      state.search = '';
    },

    setFocusedFieldName(state, action: PayloadAction<{ name: string; parentTypeName: string }>) {
      state.history = state.history.concat({
        typeName: state.focusedTypeName,
        fieldName: state.focusedFieldName,
        search: state.search,
      });
      state.search = '';
      state.focusedFieldName = action.payload.name;
      state.focusedTypeName = action.payload.parentTypeName;
    },
    historyBack(state) {
      const prevHistoryItem = state.history.slice(-1)[0];

      if (prevHistoryItem) {
        state.focusedFieldName = prevHistoryItem.fieldName;
        state.focusedTypeName = prevHistoryItem.typeName;
        state.search = prevHistoryItem.search || '';
        state.history = state.history.slice(0, -1);
      }
    },
  },
});

export const { setFocusedTypeName, setFocusedFieldName, setSearch, historyBack } =
  docsSlice.actions;

export default docsSlice.reducer;
