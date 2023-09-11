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

    setPageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1
    },
  },
});

export const {
  setSelectedCategoryId,
  setPageNumber,
  setPageToken
} = videosSlice.actions;

export default videosSlice.reducer;
