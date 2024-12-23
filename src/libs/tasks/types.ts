import type { Data, RealtimeTrackable } from '@/core/data';

export interface TaskData extends Data {
	description: string;
	projectId: string;
	listId: string;
}

export interface Task extends TaskData, RealtimeTrackable {};
