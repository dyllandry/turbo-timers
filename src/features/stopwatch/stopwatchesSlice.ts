import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "app/store";
import { Widget, WidgetKind } from "features/widget/widget";

interface Stopwatch extends Widget {
	kind: WidgetKind.Stopwatch;
}

interface StopwatchSliceState {
	widgets: Stopwatch[]
};

const initialState: StopwatchSliceState = { widgets: [] };

export const stopwatchesSlice = createSlice({
	name: 'stopwatches',
	initialState,
	reducers: {
		addStopwatch(state) {
			state.widgets.push({ kind: WidgetKind.Stopwatch });
		}
	}
});

export default stopwatchesSlice.reducer;
export const {addStopwatch} = stopwatchesSlice.actions;
export const selectAllStopwatches = (state: RootState) => state.stopwatches.widgets;

