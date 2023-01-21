import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { createDateTime, DurationMs, Session } from "features/session/session";
import { createWidget, selectWidgetName, setWidgetName, Widget, WidgetKind } from "features/widget/widget";
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
		setStopwatchName(state, { payload: { id, name } }: PayloadAction<{ id: string, name: string | null }>) {
			setWidgetName(state.widgets, id, name);
		},
		resetStopwatch(state, { payload: id }: PayloadAction<string>) {
			const stopwatch = state.widgets.find(w => w.id === id);
			if (!stopwatch) return;
			stopwatch.sessions = [];
		}
	}
});

export default stopwatchesSlice.reducer;

export const {
	addStopwatch,
	removeStopwatch,
	startStopwatch,
	stopStopwatch,
	setStopwatchName,
	resetStopwatch
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
	return sessionDuration(session);
}

export const selectStopwatchTotalDuration = (state: RootState, id: string): DurationMs => {
	const stopwatch = state.stopwatches.widgets.find(w => w.id === id);
	if (!stopwatch) return 0 as DurationMs;
	const totalDuration = stopwatch.sessions.reduce((total, session) => total + sessionDuration(session), 0) as DurationMs;
	return totalDuration;
}

export const selectStopwatchName = (state: RootState, id: string): ReturnType<typeof selectWidgetName> => {
	return selectWidgetName(state.stopwatches.widgets, id);
}

const sessionDuration = (session: Session): DurationMs => {
	const durationMs = moment(session.end).diff(session.start, 'milliseconds');
	return durationMs as DurationMs;
}

type Stopwatch = Widget & {
	kind: WidgetKind.Stopwatch;
	sessions: Session[]
}

interface StopwatchSliceState {
	widgets: Stopwatch[]
}

