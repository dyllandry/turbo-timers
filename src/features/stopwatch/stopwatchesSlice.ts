import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "app/store";

interface Stopwatch {}

interface StopwatchState {
	list: Stopwatch[]
};

const initialState: StopwatchState = {list: []};

export const stopwatchesSlice = createSlice({
	name: 'stopwatches',
	initialState,
	reducers: {
		addStopwatch(state) {
			state.list.push({});
		}
	}
});

export default stopwatchesSlice.reducer;
export const {addStopwatch} = stopwatchesSlice.actions;
export const selectStopwatches = (state: RootState) => state.stopwatches.list;
