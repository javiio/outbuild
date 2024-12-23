import React from 'react';
import { RealtimeTrackable, removeDuplicates } from '@/core/data';
import { ProfilePicsGroup } from '@/users';
import { Icon } from '@/core/ui';

interface RealtimeUsersPreviewProps {
	item: RealtimeTrackable;
}

export const RealtimeUsersPreview = ({ item }: RealtimeUsersPreviewProps) => {
	const editors = item.editors.map((editor) => editor.userId);
	const viewers = item.viewers.filter((viewer) => !editors.includes(viewer));

	return (
		<div className="flex space-x-4">
			{viewers.length > 0 && (
				<div className="flex items-center space-x-1">
					<Icon.Eye className="text-blue-400/50" size={4} />
					<ProfilePicsGroup
						users={removeDuplicates(viewers)}
						size="sm"
						showTooltip
					/>
				</div>
			)}
			{editors.length > 0 && (
				<div className="flex items-center space-x-1">
					<Icon.Pencil className="text-green-400/50" size={4} />
					<ProfilePicsGroup
						users={removeDuplicates(editors)}
						size="sm"
						showTooltip
					/>
				</div>
			)}
		</div>
	)
};
