import { useAppDispatch, useAppSelector } from "app/hooks";
import { DurationMs, removeStopwatch, selectStopwatchCurrentSessionDuration, selectStopwatchIsRunning, selectStopwatchTotalDuration, startStopwatch, stopStopwatch } from "features/stopwatch/stopwatchesSlice";
import moment from "moment";
import { useState } from "react";

export const Stopwatch = ({ id }: { id: string }) => {
	const isRunning = useAppSelector((state) => selectStopwatchIsRunning(state, id));
	const currentSessionDuration = useAppSelector((state) => selectStopwatchCurrentSessionDuration(state, id));
	const totalDuration = useAppSelector((state) => selectStopwatchTotalDuration(state, id));

	// This is how I get the component to rerender every second despite stopwatch state in redux not changing.
	// Timeout calls function that modifies a bit of component state, which is the timeout id itself.
	const [rerenderTimeoutId, setRerenderTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const startRerenderTimeout = (): void => setRerenderTimeoutId(setTimeout(startRerenderTimeout, 1000));

	const dispatch = useAppDispatch();
	const onClickRemove = () => dispatch(removeStopwatch(id));
	const onClickToggleStart = () => {
		if (rerenderTimeoutId) clearTimeout(rerenderTimeoutId);
		if (isRunning) {
			dispatch(stopStopwatch(id));
		} else {
			dispatch(startStopwatch(id));
			startRerenderTimeout();
		}
	}

	return (
		<div>
			<div>Total: {formatDuration(totalDuration)}</div>
			<div>Current Session: {formatDuration(currentSessionDuration)}</div>
			<button onClick={onClickRemove}>x</button>
			<ToggleStartButton isRunning={isRunning} onClick={onClickToggleStart} />
		</div>
	);
}

const ToggleStartButton = (
	{ isRunning, onClick }:
		{ isRunning: boolean, onClick: () => void }
) => {
	const label = isRunning ? 'Stop' : 'Start';
	return (
		<button onClick={onClick}>{label}</button>
	);
}

const formatDuration = (duration: DurationMs) => {
	const momentDuration = moment.duration(duration);
	const hours = momentDuration.hours();
	const minutes = momentDuration.minutes();
	const seconds = momentDuration.seconds();
	const formattedHours = hours < 10 ? '0' + hours.toString() : hours;
	const formattedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes;
	const formattedSeconds = seconds < 10 ? '0' + seconds.toString() : seconds;
	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
