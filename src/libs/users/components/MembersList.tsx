import React from 'react';
import { Icon, IconButton, Text, Sorteable } from '@/core/ui';
import { ProfilePic, useUsers } from '@/users';

export const MembersList = () => {
	const { list: users, updateOrder, update, startMoving, finishMoving } = useUsers();

	return (
		<div className="px-4 py-2">
			<div className="flex space-x-2 text-green-100">
				<Icon.Users className="mt-1.5" size={4} />
				<Text.H3>Members</Text.H3>
			</div>
			<div className="h-[1px] w-20 bg-gradient-to-r from-green-100 opacity-70" />

			<div className="-mx-3 mt-2">
				<Sorteable
					items={users}
					updateOrder={updateOrder}
					startMoving={startMoving}
					finishMoving={finishMoving}
				>
					{users.map((user) => (
						<div
							key={user.id}
							id={user.id}
							className={`px-3 py-1 flex items-center space-x-2 cursor-default rounded hover:bg-slate-900/30 group ${user.isOnline ? '' : 'opacity-70'}`}
						>
							<ProfilePic user={user} size="lg" showStatus />
							<Text className="flex-1">{user.name}</Text>
							{user.isOnline && (
								<div className="w-4">
									<IconButton.Logout
										size={4}
										className="hidden group-hover:block text-white/80"
										onClick={() => update(user, { isOnline: false })}
										/>
								</div>
								)}
						</div>
					))}
				</Sorteable>
			</div>
		</div>
	);
};
