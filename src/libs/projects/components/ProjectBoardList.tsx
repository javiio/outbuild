import React from 'react';
import { IconButton } from '@/core/ui';
import { NewTaskForm } from '@/tasks';
import type { Project, BoardList } from '..';

interface ProjectBoardListProps {
  project: Project
  list: BoardList
  handleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  children: React.ReactNode
};

export const ProjectBoardList = ({
  project,
  list,
  handleProps,
  children,
}: ProjectBoardListProps) => {
  return (
      <div className="w-64 bg-slate-950 rounded-lg shrink-0">
        <div className="flex justify-between px-4 py-2">
          <h4
            className="flex-1 cursor-grab"
            {...(handleProps ?? {})}
          >
            {list.name}
          </h4>
          <IconButton.More
            onClick={() => {}}
          />
        </div>

            <div className="px-2 pb-4 flex flex-col space-y-3 overflow-y-auto max-h-[calc(100vh-9.7rem)] shrink-0 bg-slate-950 rounded-lg">
              <NewTaskForm project={project} list={list} />
              {children}
            </div>
      </div>
  );
};
