import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type RestaurantsState = {
  data: Place[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: RestaurantsState = {
  data: [],
  pagination: null,
  loading: true,
  error: null,
};

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
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

      const res = await fetch(`/api/restaurants?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch restaurants");
      }

      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    clearRestaurants: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch restaurants";
      });
  },
});

export const { clearRestaurants } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
