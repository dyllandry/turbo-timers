import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "app/store";
import {createWidget, Widget, WidgetKind} from "features/widget/widget";
import remove from 'lodash/remove';

type Stopwatch = Widget & {
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
			state.widgets.push(
				createWidget({ kind: WidgetKind.Stopwatch })
			);
		},
		removeStopwatch: {
			reducer(state, { payload: id }: PayloadAction<string>) {
				remove(state.widgets, widget => widget.id === id);
			},
			prepare(id: string) {
				return { payload: id };
			}
		}
	}
});

export default stopwatchesSlice.reducer;
export const {addStopwatch, removeStopwatch} = stopwatchesSlice.actions;
export const selectAllStopwatches = (state: RootState) => state.stopwatches.widgets;

