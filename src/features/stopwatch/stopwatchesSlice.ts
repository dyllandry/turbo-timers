import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "app/store";
import {createWidget, Widget, WidgetKind} from "features/widget/widget";
import remove from 'lodash/remove';
import moment from 'moment';

const initialState: StopwatchSliceState = { widgets: [] };

export const stopwatchesSlice = createSlice({
	name: 'stopwatches',
	initialState,
	reducers: {
		addStopwatch(state) {
			state.widgets.push(
				createWidget({ kind: WidgetKind.Stopwatch, sessions: [] })
			);
		},
		removeStopwatch(state, { payload: id }: PayloadAction<string>) {
			remove(state.widgets, widget => widget.id === id);
		},
		startStopwatch(state, { payload: id }: PayloadAction<string>) {
			const stopwatch = state.widgets.find(w => w.id === id);
			stopwatch.sessions.push({ start: createDateTime() });
		},
		stopStopwatch(state, { payload: id }: PayloadAction<string>) {
			const stopwatch = state.widgets.find(w => w.id === id);
			const session = stopwatch.sessions[stopwatch.sessions.length - 1];
			if (session != null) session.end = createDateTime();
		},
	}
});

export default stopwatchesSlice.reducer;

export const {
	addStopwatch,
	removeStopwatch,
	startStopwatch,
	stopStopwatch
} = stopwatchesSlice.actions;

export const selectAllStopwatches = (state: RootState) => state.stopwatches.widgets;

export const selectStopwatchIsRunning = (state: RootState, id: string): boolean => {
	const stopwatch = state.stopwatches.widgets.find(w => w.id === id);
	const session = stopwatch.sessions[stopwatch.sessions.length - 1];
	if (session == null) return false;
	else return session.end == null;
}

type Stopwatch = Widget & {
	kind: WidgetKind.Stopwatch;
	sessions: Session[]
}

type Session = {
	start: DateTime;
	end?: DateTime;
}

/**
 * Type for storing dates in redux in a serializable form so store peristance
 * and hydration isn't broken. Throws error if you try to store a date.
 * https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
 */
type DateTime = string;

const isDateString = (dateString: string): dateString is DateTime => {
	// example: 2023-01-01T20:16:49.114Z
	return moment(dateString, 'YYYY-MM-DDTHH-mm-ss.SSSZ').isValid();
}

const throwIfNotDateString = (dateString: string): DateTime => {
	if (!isDateString(dateString)) throw new Error(`string ${dateString} is not a valid DateString`);
	else return dateString;
}

const createDateTime = (): DateTime => {
	const dateString = throwIfNotDateString(new Date().toISOString());
	return dateString;
}

interface StopwatchSliceState {
	widgets: Stopwatch[]
};

