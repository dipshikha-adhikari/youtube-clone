import { createSlice } from "@reduxjs/toolkit";

interface VideoState {
  category: string;
  selectedCategory: string;
  pageNumber: number
}

const initialState: VideoState = {
  category: "All",
  selectedCategory: "",
  pageNumber: 1,
};

export const videosSlice: any = createSlice({
  name: "videos",
  initialState,
  reducers: {

    setSelectedCategoryId: (state, action) => {
      state.selectedCategory = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload
    },
  },
});

export const {
  setSelectedCategoryId,
  setPageNumber,
  setPageToken
} = videosSlice.actions;

export default videosSlice.reducer;
