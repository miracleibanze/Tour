import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AllState = {
  hotels: any[];
  restaurants: any[];
  cafes: any[];
  attractions: any[];
  events: any[];
  transport: any[];
  destinations: any[];
  loading: boolean;
  error: string | null;
};

const initialState: AllState = {
  hotels: [],
  restaurants: [],
  cafes: [],
  attractions: [],
  events: [],
  transport: [],
  destinations: [],
  loading: true,
  error: null,
};

export const fetchAll = createAsyncThunk(
  "all/fetchAll",
  async (
    {
      q = "",
    }: {
      q?: string;
    } = {},
    thunkAPI,
  ) => {
    try {
      const query = new URLSearchParams();

      if (q && q.trim()) {
        query.set("q", q);
      }

      const res = await fetch(`/api/all?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch all results");
      }

      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const allSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    clearAll: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.hotels || [];
        state.restaurants = action.payload.restaurants || [];
        state.cafes = action.payload.cafes || [];
        state.attractions = action.payload.attractions || [];
        state.events = action.payload.events || [];
        state.transport = action.payload.transport || [];
        state.destinations = action.payload.destinations || [];
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch all results";
      });
  },
});

export const { clearAll } = allSlice.actions;
export default allSlice.reducer;
