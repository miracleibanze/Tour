import { configureStore } from "@reduxjs/toolkit";
import destinationsReducer from "./features/destinationSlice";
import hotelsReducer from "./features/hotelsSlice";
import restaurantsReducer from "./features/restaurantsSlice";
import attractionsReducer from "./features/attractionsSlice";
import eventsReducer from "./features/eventsSlice";
import testimonialsReducer from "./features/testimonialsSlice";
import cafesReducer from "./features/cafesSlice";
import transportsReducer from "./features/transportsSlice";

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    hotels: hotelsReducer,
    restaurants: restaurantsReducer,
    attractions: attractionsReducer,
    events: eventsReducer,
    testimonials: testimonialsReducer,
    cafes: cafesReducer,
    transports: transportsReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
