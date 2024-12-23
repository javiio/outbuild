import {
  useEffect,
  useState,
} from 'react';
import type { FirestoreError } from 'firebase/firestore';
import { useData, uid, type Data } from '@/core/data';

export interface CollectionContext<T> {
  path: string;
  list: T[];
  add: (item: Partial<T>) => Promise<void>
  update: (item: T | string, attrs: Partial<T>) => Promise<void>
  remove: (item: T) => Promise<void>
  selected: T | undefined;
  setSelected: (item: T) => void;
  updateSelected: (attrs: Partial<T>) => Promise<void>
  removeSelected: () => Promise<void>
  isLoading: boolean;
  error: FirestoreError | null;
}

export const defaultCollectionContext = {
  path: '',
  list: [],
  add: async () => {},
  update: async () => {},
  remove: async () => {},
  updateSelected: async () => {},
  removeSelected: async () => {},
  selected: undefined,
  setSelected: () => {},
  isLoading: false,
  error: null,
};

export const useCollection = <T extends Data>(path: string): CollectionContext<T> => {
  const [list, setList] = useState<T[]>([]);
  const [selected, setSelected] = useState<T>();

  const { collection, updateDoc, setDoc, deleteDoc } = useData();
  const [collectionData, isLoadingCollection, errorCollection] = collection(path);

  useEffect(() => {
    if (collectionData && !isLoadingCollection && !errorCollection) {
      setList(collectionData.docs.map((doc) => doc.data() as T));
    }
  }, [collectionData, isLoadingCollection, errorCollection]);

  const add = async (item: Partial<T>) => {
    const newItem = {
      id: item.id ?? uid(item.name),
      ...item,
    } as T;

    setSelected(newItem);
    setDoc(newItem, path, newItem.id);
  }

  const update = async (item: T | string, attrs: Partial<T>) => {
    const id = typeof item === 'string' ? item : item.id
    if (selected && selected.id === id) {
      setSelected({
        ...selected,
        ...attrs,
      });
    }

    await updateDoc(attrs, path, id);
  }

  const updateSelected = async (attrs: Partial<T>) => {
    if (selected) {
      update(selected, attrs);
    }
  }

  const remove = async (item: T) => {
    if (selected && selected.id === item.id) {
      setSelected(undefined);
    }

    await deleteDoc(path, item.id);
  }

  const removeSelected = async () => {
    if (selected) {
      await remove(selected);
    }
  }

  return {
    path,
    list,
    add,
    update,
    remove,
    selected,
    setSelected,
    updateSelected,
    removeSelected,
    isLoading: isLoadingCollection,
    error: errorCollection,
  };
};
