import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { createWidget, Widget, WidgetKind } from "features/widget/widget";
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
			if (!stopwatch) return;
			stopwatch.sessions.push({ start: createDateTime() });
		},
		stopStopwatch(state, { payload: id }: PayloadAction<string>) {
			const stopwatch = state.widgets.find(w => w.id === id);
			if (!stopwatch) return;
			const latestSession = stopwatch.sessions[stopwatch.sessions.length - 1];
			if (!latestSession) return;
			latestSession.end = createDateTime();
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
	if (!stopwatch) return false;
	const session = stopwatch.sessions[stopwatch.sessions.length - 1];
	if (!session) return false;
	return session.end == null;
}

export const selectStopwatchCurrentSessionDuration = (state: RootState, id: string): DurationMs => {
	const stopwatch = state.stopwatches.widgets.find(w => w.id === id);
	if (!stopwatch) return 0 as DurationMs;
	const session = stopwatch.sessions[stopwatch.sessions.length - 1];
	if (!session) return 0 as DurationMs;
	const durationMs = moment(session.end).diff(session.start, 'milliseconds');
	return durationMs as DurationMs;
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
 * Used string as the type for storing dates in redux in a serializable form so store peristance
 * and hydration isn't broken. Throws error if you try to store a Date type.
 * https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
 */
type DateTime = { kind: 'DateTime' } & string;

const isDateTime = (dateTime: string | DateTime): dateTime is DateTime => {
	// example: "2023-01-01T20:16:49.114Z"
	return moment(dateTime, 'YYYY-MM-DDTHH-mm-ss.SSSZ').isValid();
}

type DurationMs = { kind: 'DurationMs' } & number;

const throwIfNotDateString = (dateString: string | DateTime): DateTime => {
	if (!isDateTime(dateString)) throw new Error(`string ${dateString} is not a valid DateTime`);
	else return dateString;
}

const createDateTime = (): DateTime => {
	const dateString = throwIfNotDateString(new Date().toISOString());
	return dateString;
}

interface StopwatchSliceState {
	widgets: Stopwatch[]
}

