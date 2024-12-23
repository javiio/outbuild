import { Icons, Colors } from '@/core/ui';

export interface Data {
	id: string;
	name: string;
}

export interface RealtimeTrackable {
	viewers: string[];
	editors: {
		userId: string;
		field: string;
	}[];
	moving?: string;
}

export interface CollectionConfig {
	order?: string[];
	[key: string]: any;
}

export enum ActionType {
  View = 'view',
  Edit = 'edit',
  Move = 'move',
}

export const ActionTypeData = {
  [ActionType.View]: { name: 'viewing', icon: Icons.Eye, color: Colors.blue },
  [ActionType.Edit]: { name: 'editing', icon: Icons.Pencil, color: Colors.green },
  [ActionType.Move]: { name: 'moving', icon: Icons.Move, color: Colors.yellow },
};

export interface RealtimeAction extends Data {
	itemId: string;
	actionType: ActionType;
	actionData?: string;
	userId: string;
}
