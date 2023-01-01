import { useAppDispatch } from "app/hooks";
import { removeStopwatch } from "features/stopwatch/stopwatchesSlice";

export const Stopwatch = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();

	const onClickRemove = () => {
		dispatch(removeStopwatch(id))
	};

	return (
		<div>
			<span>This is stopwatch: {id}</span>
			<button onClick={onClickRemove}>x</button>
		</div>
	);
}
