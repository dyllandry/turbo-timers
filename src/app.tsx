import { Fragment } from 'react';
import { createRoot } from 'react-dom/client'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addStopwatch, selectAllStopwatches } from 'features/stopwatch/stopwatchesSlice';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { Stopwatch } from 'features/stopwatch/stopwatch';
import { addTimer, selectAllTimers } from 'features/timer/timersSlice';
import { Timer } from 'features/timer/timer';

function render() {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const root = createRoot(document.getElementById('root')!);
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}

function App() {
	const stopwatches = useAppSelector(selectAllStopwatches);
	const stopwatchComponents = stopwatches.map(({ id }) =>
		<div key={id} style={{ marginBottom: 24 }}>
			<Stopwatch id={id} />
		</div>
	);
	const timers = useAppSelector(selectAllTimers);
	const timerComponents = timers.map(({ id }) =>
		<div key={id} style={{ marginBottom: 24 }}>
			<Timer id={id} />
		</div>
	);
	return (
		<Fragment>
			<h1>Turbo Timers</h1>
			<div style={{ marginBottom: 24 }}>
				<CreateStopwatchButton />
				<CreateTimerButton />
			</div>
			{stopwatchComponents}
			{timerComponents}
		</Fragment>
	);
}

function CreateStopwatchButton() {
	const dispatch = useAppDispatch();
	const onClick = () => {
		dispatch(addStopwatch());
	};
	return <button onClick={onClick}>Create Stopwatch</button>;
}

function CreateTimerButton() {
	const dispatch = useAppDispatch();
	const onClick = () => {
		dispatch(addTimer());
	};
	return <button onClick={onClick}>Create Timer</button>;
}

render();
