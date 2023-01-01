import { useAppDispatch, useAppSelector } from "app/hooks";
import { removeStopwatch, selectStopwatchIsRunning, startStopwatch, stopStopwatch } from "features/stopwatch/stopwatchesSlice";

export const Stopwatch = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();

	const isRunning = useAppSelector((state) => selectStopwatchIsRunning(state, id));

	const onClickRemove = () => dispatch(removeStopwatch(id));
	const onClickToggleStart = () => isRunning ? dispatch(stopStopwatch(id)) : dispatch(startStopwatch(id));

	return (
		<div>
			<span>This is stopwatch: {id}</span>
			<button onClick={onClickRemove}>x</button>
			<ToggleStartButton isRunning={isRunning} onClick={onClickToggleStart}/>
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
