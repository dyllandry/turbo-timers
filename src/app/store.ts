import {configureStore} from "@reduxjs/toolkit";
import stopwatches from "../features/stopwatch/stopwatchesSlice";

export const store = configureStore({
	reducer: {
		stopwatches
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

