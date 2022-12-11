import {Fragment} from 'react';
import {createRoot} from 'react-dom/client'
import {useAppDispatch, useAppSelector} from './app/hooks';
import {addStopwatch, selectStopwatches} from './features/stopwatch/stopwatchesSlice';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {Stopwatch} from './features/stopwatch/stopwatch';

function render() {
	const root = createRoot(document.getElementById('root'));
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}

function App() {
	const stopwatches = useAppSelector(selectStopwatches);
	const stopwatchComponents = stopwatches.map((_, index) => <Stopwatch key={index} />);
	return (
		<Fragment>
			<h1>Turbo Timers</h1>
			{stopwatchComponents}
			<StopwatchButton />
		</Fragment>
	);
}

function StopwatchButton() {
	const dispatch = useAppDispatch();
	const onClick = () => {
		dispatch(addStopwatch());
	};
	return <button onClick={onClick}>Create Stopwatch</button>;
}

render();
