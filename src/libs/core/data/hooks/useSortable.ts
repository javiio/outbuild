import {
  useEffect,
  useState,
} from 'react';
import { useData, uid } from '@/core/data';
import type { Data, CollectionContext } from '@/core/data';

interface CollectionConfig {
  order: string[];
}

type PartialWithId<T> = Partial<T> & { id: string };

export const useSortable = <T extends Data>(collection: CollectionContext<T>) => {
  const [list, setList] = useState<T[]>([]);
  const [config, setConfig] = useState<CollectionConfig>();

  const { doc, setDoc, addItemToArrayDoc } = useData();
  const [configData, isLoadingConfig, errorConfig] = doc(`config/${collection.path}`);

  useEffect(() => {
    if (configData && !isLoadingConfig && !errorConfig) {
      setConfig(configData.data() as CollectionConfig);
    }
  }, [configData, isLoadingConfig, errorConfig]);

  useEffect(() => {
    if (config) {
      const orderedList = config.order.map((id: string) => collection.list.find((item: T) => item.id === id)) as T[];
      setList(orderedList.filter(Boolean));
    } else {
      setList(collection.list);
    }
  }, [collection.list, config]);

  const add = async (item: Partial<T>) => {
    const newItem = {
      id: item.id ?? uid(item.name),
      ...item,
    } as T;

    collection.add(newItem);
    addItemToArrayDoc(newItem.id, 'order', 'config', collection.path);
  }

  const updateOrder = async (order: PartialWithId<Data>[]) => {
    const orderIds = order.map((item) => item.id);
    setConfig({ ...config, order: orderIds });

    setDoc({ order: orderIds }, 'config', collection.path);
  }

  return {
    ...collection,
    list,
    config: {},
    add,
    updateOrder,
  };
};
