import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { DurationMs, Session } from "features/session/session"
import { createWidget, Widget, WidgetKind } from "features/widget/widget";

const initialState: TimersSliceState = { widgets: [] };

export const timersSlice = createSlice({
	name: 'timers',
	initialState,
	reducers: {
		addTimer(state) {
			state.widgets.push(
				createWidget({ kind: WidgetKind.Timer, sessions: [], duration: null })
			);
		},
		setTimerDuration(state, { payload: { id, duration } }: PayloadAction<{ id: string, duration: DurationMs }>) {
			const timer = state.widgets.find(w => w.id === id);
			if (!timer) return;
			timer.duration = duration;
		}
	}
});

export const selectAllTimers = (state: RootState) => state.timers.widgets;

export default timersSlice.reducer;

export const { addTimer } = timersSlice.actions;

type TimersSliceState = {
	widgets: Timer[]
}

type Timer = Widget & {
	duration: number | null;
	sessions: Session[]
}
