import React from 'react';
import { useProjects } from '../';
import { Icon, Text, Sorteable } from '@/core/ui';
import { RealtimeUsersPreview } from '@/users';
import cn from 'classnames';

export const Projects = () => {
	const { projects, selected, setSelected, updateOrder, startMoving, finishMoving } = useProjects();

	return (
		<div className="max-w-md min-w-96">
			<Sorteable
				items={projects}
				updateOrder={updateOrder}
				startMoving={startMoving}
				finishMoving={finishMoving}
			>
				{projects.map((project) => (
					<div
						key={project.id}
						id={project.id}
						className={cn(
							'mt-1 py-2 pl-4 pr-2 rounded border hover:bg-slate-950/30 cursor-default transition-all',
							project.id === selected?.id ? `border-${project.color}-500` : `border-transparent hover:border-${project.color}-500/50`)
						}
						onClick={() => setSelected(project)}
					>
						<div className="flex gap-2.5">
							<Icon className="mt-1.5 ml-1" name={project.icon} color={project.color} />
							<Text.H2 className="flex-1">{project.name}</Text.H2>
						</div>
						<div className={cn('w-20 h-0.5 mt-1', `bg-${project.color}-500`)} />
						<div className="max-h-14 overflow-hidden m-2 ">
							<Text className="text-slate-300">{project.description}</Text>
						</div>

						<RealtimeUsersPreview item={project} />
					</div>
				))}
			</Sorteable>
		</div>
	);
};
