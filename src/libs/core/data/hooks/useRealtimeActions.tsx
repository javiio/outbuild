import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import {
  useCollection,
  defaultCollectionContext,
  type CollectionContext,
  type RealtimeAction,
} from '@/core/data';

interface RealtimeActionsContextProps extends CollectionContext<RealtimeAction> {
  actionsMap: Record<string, RealtimeAction[]>;
};

const RealtimeActionsContext = createContext<RealtimeActionsContextProps>({
  actionsMap: {},
  ...defaultCollectionContext,
});

export const ProvideRealtimeActions = ({ children }: { children: ReactNode }) => {
  const [actionsMap, setActionsMap] = useState<Record<string, RealtimeAction[]>>({});
  const collection = useCollection<RealtimeAction>('realtimeActions');

  useEffect(() => {
    const map = collection.list.reduce((map, action) => {
      const key = `${action.name}-${action.itemId}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(action);

      return map;
    }, {} as Record<string, RealtimeAction[]>);

    setActionsMap(map);
  }, [collection.list, collection.path]);

  return (
    <RealtimeActionsContext.Provider value={{ actionsMap, ...collection }}>
      {children}
    </RealtimeActionsContext.Provider>
  );
};

export const useRealtimeActions = () => useContext(RealtimeActionsContext);
