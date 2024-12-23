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
  useSortable,
  type CollectionContext,
} from '@/core/data';
import { useTasks, type Task } from '@/tasks';
import type { ProjectData, Project } from '@/projects';

interface ProjectContextProps extends CollectionContext<ProjectData> {
  projects: Project[];
};

const ProjectContext = createContext<ProjectContextProps>({
  projects: [],
  ...defaultCollectionContext,
});

export const ProvideProjects = ({ children }: { children: ReactNode }) => {
  const collection = useCollection<ProjectData>('projects');
  const sortable = useSortable(collection);
  const realtimeTrackable = useRealtimeTracking(sortable);

  const { list: tasks } = useTasks();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const taskMap = tasks.reduce((map, task) => {
      const key = `${task.projectId}:${task.listId}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(task);
      return map;
    }, {} as Record<string, Task[]>);

    setProjects(realtimeTrackable.list.map((project) => ({
      ...project,
      lists: project.listsData?.map((listData) => ({
        ...listData,
        tasks: taskMap[`${project.id}:${listData.id}`] || [],
      })) || [],
    })));
  }, [collection.list, tasks, realtimeTrackable.list]);

  const value = {
    projects,
    ...realtimeTrackable,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
