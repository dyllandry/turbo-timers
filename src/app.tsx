import {Fragment} from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'

function render() {
	const root = createRoot(document.getElementById('root'));
	root.render(<App />);
}

function App() {
	return (
		<Fragment>
			<h2>Turbo Timers</h2>
			<StopwatchButton />
		</Fragment>
	);
}

function StopwatchButton() {
	const onClick = () => {
		console.log('This will, one day, create a stopwatch!');
	};
	return <button onClick={onClick}>Create Stopwatch</button>;
}

render();
