import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import {
  useData,
  useCollection,
  useSortable,
  useRealtimeTracking,
  defaultCollectionContext,
  type CollectionContext,
} from '@/core/data';
import type { User } from '@/users';

interface UserContextProps extends CollectionContext<User> {
  currentUser?: User;
};

const UserContext = createContext<UserContextProps>(defaultCollectionContext);

export const ProvideUsers = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const { currentUser: currentFbUser } = useData();
  const collection = useCollection<User>('users');
  const sortable = useSortable(collection);
  const realtimeTrackable = useRealtimeTracking(sortable);

  useEffect(() => {
    if (currentFbUser) {
      const user = collection.list.find((user) => user.id === currentFbUser.uid)
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
    }
  }, [collection.list, currentFbUser]);

  return (
    <UserContext.Provider value={{ currentUser, ...realtimeTrackable }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
