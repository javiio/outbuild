import React from 'react';
import cn from 'classnames';
import { ActionType } from '@/core/data';
import { RealtimeUsersPreview, ProfilePic } from '@/users';
import { useTasks } from '../';
import type { Task } from '../';

interface TaskBoardItemProps {
  task: Task;
  isDragging?: boolean;
};

export const TaskBoardItem = ({ task, isDragging }: TaskBoardItemProps) => {
  const { selected, setSelected } = useTasks();

  return (
    <div
      className={cn(
        'relative bg-gray-800 rounded-md p-2 text-sm border border-transparent cursor-pointer hover:bg-gray-800/80 transition-all',
        selected?.id === task.id ? 'border-yellow-400' : 'hover:border-slate-400'
      )}
      onClick={() => setSelected(task)}
    >
      {task.name}

      <div className={cn('mt-2', isDragging ? 'opacity-50' : '')}>
        <RealtimeUsersPreview item={task} />
      </div>

      {task.moving && !isDragging && (
        <div className="absolute -top-4 right-2">
          <ProfilePic user={task.moving} realtimeIndicator={ActionType.Move} showTooltip />
        </div>
      )}
    </div>
  );
};
