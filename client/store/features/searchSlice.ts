import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type SearchState = {
  grouped: GroupedPlaces;
  results: Place[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
  loading: boolean;
  error: string | null;
};

const initialState: SearchState = {
  grouped: {
    hotels: [],
    restaurants: [],
    cafes: [],
    attractions: [],
    events: [],
    transport: [],
  },
  results: [],
  pagination: null,
  loading: true,
  error: null,
};

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (
    {
      q = "",
      tab,
      page = 1,
    }: {
      q?: string;
      tab?: string;
      page?: number;
    },
    thunkAPI,
  ) => {
    try {
      const query = new URLSearchParams();

      query.set("q", q);
      if (tab) query.set("tab", tab);
      query.set("page", String(page));

      const res = await fetch(`/api/search?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to search");
      }

      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.grouped = {
        hotels: [],
        restaurants: [],
        cafes: [],
        attractions: [],
        events: [],
        transport: [],
      };
      state.results = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload;

        if (payload.data && Array.isArray(payload.data)) {
          state.results = payload.data;
          state.pagination = payload.pagination;
          return;
        }

        state.grouped = {
          hotels: payload.hotels || [],
          restaurants: payload.restaurants || [],
          cafes: payload.cafes || [],
          attractions: payload.attractions || [],
          events: payload.events || [],
          transport: payload.transport || [],
        };

        state.results = [];
        state.pagination = null;
      })

      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to search";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
