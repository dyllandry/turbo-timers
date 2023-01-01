import { getId } from "utils"

export type Widget = {
	id: string;
	kind: WidgetKind;
}

export enum WidgetKind {
	Stopwatch = 'stopwatch',
	Timer = 'timer'
}

/**
 * Creates a widget and adds general widget properties like a unique id.
 */
export const createWidget = <T extends Omit<Widget, 'id'>>(base: T): Widget & T => {
	return { ...base, id: getId() } ;
}

