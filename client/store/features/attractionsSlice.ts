import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AttractionsState = {
  data: Place[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: AttractionsState = {
  data: [],
  pagination: null,
  loading: true,
  error: null,
};

export const fetchAttractions = createAsyncThunk(
  "attractions/fetchAttractions",
  async (
    {
      page = 1,
      limit = 24,
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

      if (category) {
        query.set("category", category);
      }

      if (featured !== undefined) {
        query.set("featured", String(featured));
      }

      if (search) {
        query.set("q", search);
      }

      const res = await fetch(`/api/attractions?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch attractions");
      }

      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const attractionsSlice = createSlice({
  name: "attractions",
  initialState,
  reducers: {
    clearAttractions: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAttractions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch attractions";
      });
  },
});

export const { clearAttractions } = attractionsSlice.actions;

export default attractionsSlice.reducer;
