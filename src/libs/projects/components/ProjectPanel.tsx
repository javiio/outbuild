import React, { useState, useEffect } from 'react';
import { useProjects } from '../';
import { TitleForm, IconPicker, ColorPicker, Textarea, type IconName, type ColorName } from '@/core/ui';

export const ProjectPanel = () => {
	const { selected: project, updateSelected, removeSelected, startEditingSelected, finishEditingSelected, getEditingUserSelected } = useProjects();
	const [icon, setIcon] = useState<IconName>();
	const [color, setColor] = useState<ColorName>();

	useEffect(() => {
		if (project) {
			setIcon(project.icon);
			setColor(project.color);
		}
	}, [project]);

	const handleIconChange = (value: IconName) => {
		setIcon(value);
		updateSelected({ icon: value });
	}

	const handleColorChange = (value: ColorName) => {
		setColor(value);
		updateSelected({ color: value });
	}

	if (!project) {
		return;
	}

	return (
		<>
			<TitleForm
				item={project}
				update={updateSelected}
				remove={removeSelected}
				startEditing={startEditingSelected}
				finishEditing={finishEditingSelected}
				getEditingUser={getEditingUserSelected}
			/>

			<div className="flex space-x-2 my-2">
				<IconPicker value={icon} onChange={handleIconChange} size="xs" />
				<ColorPicker value={color} onChange={handleColorChange}  size="xs" />
			</div>

			<Textarea
				value={project.description}
				onChangeValue={(description: string) => updateSelected({ description })}
				startEditing={() => startEditingSelected('description')}
				finishEditing={() => finishEditingSelected('description')}
				getEditingUser={() => getEditingUserSelected('description')}
			/>
		</>
	)
};
