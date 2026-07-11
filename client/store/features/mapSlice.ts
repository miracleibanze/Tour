import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  location: string;
  type: Exclude<"all", ExploreTab>;
  distance?: number;
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

interface UserLocation {
  lat: number;
  lng: number;
}

export const fetchPins = createAsyncThunk(
  "map/fetchPins",
  async (userLocation: UserLocation | null) => {
    const response = await fetch("/api/maps");

    const pins: Pin[] = await response.json();

    if (!userLocation) return pins;

    return pins.map((pin) => ({
      ...pin,
      distance: getDistance(
        userLocation.lat,
        userLocation.lng,
        pin.lat,
        pin.lng,
      ),
    }));
  },
);

interface MapState {
  pins: Pin[];
  loading: boolean;
}

const initialState: MapState = {
  pins: [],
  loading: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPins.fulfilled, (state, action) => {
        state.pins = action.payload;
        state.loading = false;
      })
      .addCase(fetchPins.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default mapSlice.reducer;
