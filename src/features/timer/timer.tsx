import { Fragment } from "react";

export const Timer = ({ id }: { id: string }) => {
	// const handleDurationInputOnChange = () => {
	// }
	return (
		<div>
			<div>
				<select>
					<Options length={24} />
				</select>
				<ColonSeparator />
				<select>
					<Options length={60} />
				</select>
				<ColonSeparator />
				<select>
					<Options length={60} />
				</select>
			</div>
		</div>
	);
}

const ColonSeparator = () => (
	<span style={{ marginLeft: 6, marginRight: 6 }}>:</span>
)

const Options = ({ length }: { length: number }) => {
	const options = Array.from({ length }).map((_, i) => {
		const twoDigitFormattedNumber: string = i.toString().length < 2 ? `0${i.toString()}` : i.toString();
		return (
			<option value={i}>{twoDigitFormattedNumber}</option>
		)
	});
	return <Fragment>{options}</Fragment>;
}

