import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Destination = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  places: number;
  createdAt?: string;
  updatedAt?: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type DestinationsState = {
  data: Destination[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: DestinationsState = {
  data: [],
  pagination: null,
  loading: true,
  error: null,
};

export const fetchDestinations = createAsyncThunk(
  "destinations/fetchDestinations",
  async (
    {
      page = 1,
      limit = 10,
      search = "",
    }: {
      page?: number;
      limit?: number;
      search?: string;
    } = {},
    thunkAPI,
  ) => {
    try {
      const query = new URLSearchParams();

      query.set("page", String(page));
      query.set("limit", String(limit));

      if (search) {
        query.set("q", search);
      }

      const res = await fetch(`/api/destinations?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch destinations");
      }

      const result = await res.json();

      return {
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: Math.ceil(result.total / result.limit),
          hasNext: result.page * result.limit < result.total,
          hasPrevious: result.page > 1,
        },
      };
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    clearDestinations: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch destinations";
      });
  },
});

export const { clearDestinations } = destinationsSlice.actions;

export default destinationsSlice.reducer;
