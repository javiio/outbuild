import React from 'react';
import { IconButton, Text, Sorteable } from '@/core/ui';
import { ProfilePic, useUsers } from '@/users';

export const Users = () => {
	const { list: users, updateOrder, remove } = useUsers();

	return (
		<div className="px-1">
			<Sorteable items={users} updateOrder={updateOrder}>
				{users.map((user) => (
					<div
						key={user.id}
						id={user.id}
						className={`px-3 py-1 flex items-center space-x-2 cursor-default hover:bg-slate-900/30 group ${user.isOnline ? '' : 'opacity-70'}`}
					>
						<ProfilePic user={user} size="lg" showStatus />
						<Text className="flex-1">{user.name}</Text>
						<div className="w-4">
							<IconButton.Remove
								size={4}
								className="hidden group-hover:block"
								onClick={() => remove(user)}
							/>
						</div>
					</div>
				))}
			</Sorteable>
		</div>
	);
};
