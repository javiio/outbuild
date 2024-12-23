import React from 'react';
import { ProfilePic, type User } from '@/users';

interface ProfilePicsGroupProps {
	users: (User | string)[];
	showTooltip?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

export const ProfilePicsGroup = ({ users, showTooltip, size }: ProfilePicsGroupProps) => {
	return (
		<div className="flex -space-x-1.5">
			{users.map((user) => (
				<div key={typeof user === 'string' ? user : user.id}>
					<ProfilePic user={user} showTooltip={showTooltip} size={size} />
				</div>
			))}
		</div>
	);
};
