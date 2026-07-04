import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Testimonial = {
  id: string;
  name: string;
  country: string;
  avatar: string;
  text: string;
  rating: number;
  trip?: string;
  createdAt?: string;
};

type TestimonialsState = {
  data: Testimonial[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: TestimonialsState = {
  data: [],
  pagination: null,
  loading: true,
  error: null,
};

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (
    {
      page = 1,
      limit = 24,
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

      const res = await fetch(`/api/testimonials?${query.toString()}`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch testimonials");
      }

      return await res.json();
    } catch {
      return thunkAPI.rejectWithValue("Network error");
    }
  },
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    clearTestimonials: (state) => {
      state.data = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch testimonials";
      });
  },
});

export const { clearTestimonials } = testimonialsSlice.actions;

export default testimonialsSlice.reducer;
