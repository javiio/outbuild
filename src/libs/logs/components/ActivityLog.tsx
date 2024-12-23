import React from 'react';
import { Icon, IconButton, Text } from '@/core/ui';
import { useRealtimeActions } from '@/core/data';
import { ProfilePic, useUsers, type User } from '@/users';
import { RealtimeIndicator } from '@/logs';
import { useTasks } from '@/tasks';
import { useProjects } from '@/projects';

/* Don't judge this code, it was late...:D */
export const ActivitysLog = () => {
	const { list: realtimeActions, remove } = useRealtimeActions();
	const { list: users } = useUsers();
	const { list: tasks } = useTasks();
	const { list: projects } = useProjects();

	return (
		<div className="p-4">
			<div className="flex space-x-2 text-green-100">
				<Icon.Outbuild className="mt-1.5" size={4} />
				<Text.H3>Activity Log</Text.H3>
			</div>
			<div className="h-[1px] w-20 bg-gradient-to-r from-green-100 opacity-70" />

			<div className="mt-2">
				{realtimeActions.map((action) => {
					const user = users.find((u) => u.id === action.userId) as User;
					const item = tasks.find((t) => t.id === action.itemId) || projects.find((p) => p.id === action.itemId);

					return (
						<div key={action.id} className="py-1 my-0.5 px-4 pr-2 flex space-x-1.5 group items-center hover:bg-slate-900/30 rounded -mx-3">
							<div className="scale-75">
								<RealtimeIndicator actionType={action.actionType} />
							</div>
							
							
							<Text className="font-thin flex-1 text-sm">
								<span className="mr-1">{action.name === 'projects' ? 'Proj' : 'Task'}</span>
								<strong>{item?.name.length && item?.name.length > 24 ? item?.name.substring(0, 21) + '...' : item?.name}</strong>
							</Text>

							<ProfilePic user={user} size="sm" />

							<div className="w-4">
								<IconButton.Remove
									size={4}
									className="hidden group-hover:block"
									onClick={() => remove(action)}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
