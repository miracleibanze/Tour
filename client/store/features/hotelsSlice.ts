import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type HotelsState = {
  data: Place[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: HotelsState = {
  data: [],
  pagination: null,
  loading: true,
  error: null,
};

const DEFAULT_PARAMS = {
  page: 1,
  limit: 12,
  category: "",
  featured: undefined as boolean | undefined,
  search: "",
};

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (params: Partial<typeof DEFAULT_PARAMS> = {}, thunkAPI) => {
    try {
      const finalParams = { ...DEFAULT_PARAMS, ...params };

      const query = new URLSearchParams();

      query.set("page", String(finalParams.page));
      query.set("limit", String(finalParams.limit));

      if (finalParams.category) {
        query.set("category", finalParams.category);
      }

      if (finalParams.featured !== undefined) {
        query.set("featured", String(finalParams.featured));
      }

      if (finalParams.search) {
        query.set("q", finalParams.search);
      }

      const res = await fetch(`/api/hotels?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch hotels");
      }
      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    clearHotels: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch hotels";
      });
  },
});

export const { clearHotels } = hotelsSlice.actions;
export default hotelsSlice.reducer;
