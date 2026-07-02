import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type CafesState = {
  data: Place[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: CafesState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

export const fetchCafes = createAsyncThunk(
  "cafes/fetchCafes",
  async (
    {
      page = 1,
      limit = 12,
      category = "",
      featured,
      search = "",
    }: {
      page?: number;
      limit?: number;
      category?: string;
      featured?: boolean;
      search?: string;
    } = {},
    thunkAPI,
  ) => {
    try {
      const query = new URLSearchParams();

      query.set("page", String(page));
      query.set("limit", String(limit));

      if (category.trim()) query.set("category", category);
      if (featured !== undefined) query.set("featured", String(featured));
      if (search.trim()) query.set("q", search);

      const res = await fetch(`/api/cafes?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch cafes");
      }

      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const cafesSlice = createSlice({
  name: "cafes",
  initialState,
  reducers: {
    clearCafes: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCafes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCafes.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch cafes";
      });
  },
});

export const { clearCafes } = cafesSlice.actions;
export default cafesSlice.reducer;
