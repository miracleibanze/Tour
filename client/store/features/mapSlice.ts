import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  location: string;
  type: Exclude<"all", ExploreTab>;
}

export const fetchPins = createAsyncThunk("map/fetchPins", async () => {
  const response = await fetch("/api/maps");
  return response.json();
});

const mapSlice = createSlice({
  name: "map",
  initialState: { pins: [] as Pin[], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      state.pins = action.payload;
      state.status = "succeeded";
    });
  },
});

export default mapSlice.reducer;
