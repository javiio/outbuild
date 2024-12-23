import React from 'react';
import { TitleForm, Textarea } from '@/core/ui';
import { useTasks, type Task } from '../';

export const TaskPanel = () => {
	const {
		selected: task,
		updateSelected: update,
		removeSelected: remove,
		startEditingSelected,
		finishEditingSelected,
		getEditingUserSelected,
	} = useTasks();

	if (!task) {
		return;
	}

	return (
		<>
			<TitleForm
				item={task}
				update={(t: Partial<Task>) => update(t)}
				remove={remove}
				startEditing={startEditingSelected}
				finishEditing={finishEditingSelected}
				getEditingUser={getEditingUserSelected}
			/>

			<Textarea
				value={task.description}
				onChangeValue={(description: string) => update({ description })}
				startEditing={() => startEditingSelected('description')}
				finishEditing={() => finishEditingSelected('description')}
				getEditingUser={() => getEditingUserSelected('description')}
				className="mt-6"
			/>
		</>
	)
};
