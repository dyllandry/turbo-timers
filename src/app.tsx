import {Fragment} from 'react';
import * as ReactDOM from 'react-dom';


function render() {
	ReactDOM.render(
		<Fragment>
			<h2>Turbo Timers</h2>
			<StopwatchButton />
		</Fragment>,
		document.body);
}

function StopwatchButton() {
	const onClick = () => {
		console.log('This will, one day, create a stopwatch!');
	};
	return <button onClick={onClick}>Create Stopwatch</button>;
}

render();
