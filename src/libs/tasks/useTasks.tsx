import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import {
  useCollection,
  defaultCollectionContext,
  useRealtimeTracking,
  type CollectionContext,
} from '@/core/data';
import { useProjects, type Project } from '@/projects';
import type { TaskData } from '@/tasks';

interface TaskContextProps extends CollectionContext<TaskData> {};

const TaskContext = createContext<TaskContextProps>(defaultCollectionContext);

export const ProvideTasks = ({ children }: { children: ReactNode }) => {
  const [currentProject, setCurrentProject] = useState<Project>();
  const { projects } = useProjects();
  const collection = useCollection<TaskData>('tasks');
  const realtimeTrackable = useRealtimeTracking(collection);

  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    } else {
      setCurrentProject(projects.find((project) => project.id === currentProject?.id));
    }
  }, [projects, currentProject]);

  return (
    <TaskContext.Provider value={{ currentProject, setCurrentProject, ...realtimeTrackable }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
