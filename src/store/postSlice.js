// urlsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const urlsSlice = createSlice({
  name: 'urls',
  initialState: {urls: []},
  reducers: {
    setUrls: (state, action) => {
        state.urls = action.payload;
    },
    addUrl: (state, action) => {
      state.urls.push(action.payload);
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter((url) => url.id !== action.payload);
    }
  },
});

export const { setUrls, addUrl, deleteUrl } = urlsSlice.actions;
export default urlsSlice.reducer;