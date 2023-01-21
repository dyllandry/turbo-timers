import moment from "moment";

export type Session = {
	start: DateTime;
	end?: DateTime;
}

/**
 * Used string as the type for storing dates in redux in a serializable form so store peristance
 * and hydration isn't broken. Throws error if you try to store a Date type.
 * https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
 */
export type DateTime = { kind: 'DateTime' } & string;

export const createDateTime = (): DateTime => {
	const dateString = throwIfNotDateString(new Date().toISOString());
	return dateString;
}

export type DurationMs = { kind: 'DurationMs' } & number;

export const throwIfNotDateString = (dateString: string | DateTime): DateTime => {
	if (!isDateTime(dateString)) throw new Error(`string ${dateString} is not a valid DateTime`);
	else return dateString;
}

export const isDateTime = (dateTime: string | DateTime): dateTime is DateTime => {
	// example: "2023-01-01T20:16:49.114Z"
	return moment(dateTime, 'YYYY-MM-DDTHH-mm-ss.SSSZ').isValid();
}
