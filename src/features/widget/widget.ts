import { WritableDraft } from "immer/dist/types/types-external";
import { getId } from "utils"

export type Widget = {
	id: string;
	kind: WidgetKind;
	name: string | null;
}

export enum WidgetKind {
	Stopwatch = 'stopwatch',
	Timer = 'timer'
}

/**
 * Creates a widget and adds general widget properties like a unique id.
 */
export const createWidget = <T extends Omit<Widget, 'id'>>(base: T): Widget & T => {
	return { ...base, id: getId(), name: null };
}

export const selectWidgetName = (widgets: Widget[], id: string): string | null => {
	const widget = widgets.find(w => w.id === id);
	if (!widget) return null;
	return widget.name;
}

export const setWidgetName = (widgets: WritableDraft<Widget>[], id: string, name: string | null) => {
	const widget = widgets.find(w => w.id === id);
	if (!widget) return;
	widget.name = name;
}
