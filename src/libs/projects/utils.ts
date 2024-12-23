import { uid } from '@/core/data';

export const createListData = ({ name }: { name: string, color?: string, icon?: string }) => {
  return {
    id: uid(name),
    name,
  };
};
