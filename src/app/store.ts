import { configureStore } from "@reduxjs/toolkit";
import stopwatches from "features/stopwatch/stopwatchesSlice";
import timers from "features/timer/timersSlice";

export const store = configureStore({
	reducer: {
		stopwatches,
		timers
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

