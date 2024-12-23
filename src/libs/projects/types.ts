import type { Data, RealtimeTrackable } from '@/core/data';
import type { IconName, ColorName } from '@/core/ui';
import type { Task } from '@/tasks';

export interface BoardListData extends Data {};

export interface BoardList extends BoardListData {
	tasks: Task[];
};

export interface ProjectData extends Data {
	description: string;
	icon: IconName;
	color: ColorName;
	listsData: BoardListData[];
};

export interface Project extends ProjectData, RealtimeTrackable {
	lists: BoardList[];
};
