import { useEffect, useState } from 'react';
import { useRealtimeActions } from '@/core/data';
import type { Data, RealtimeTrackable, CollectionContext } from '@/core/data';
import { useUsers } from '@/users';

export const useRealtimeTracking = <T extends Data & Partial<RealtimeTrackable>>(collection: CollectionContext<T>) => {
  const { currentUser } = useUsers();
  const { actionsMap, add: addAction, remove: removeAction } = useRealtimeActions();
  const [list, setList] = useState<T[]>([]);

  useEffect(() => {
    const _list = collection.list.map((item) => {
      const actions = actionsMap[`${collection.path}-${item.id}`] || [];
      const viewers = [] as string[];
      const editors = [] as { userId: string, field: string }[];
      let moving: string | undefined;

      actions.forEach((action) => {
        if (action.actionType === 'view') {
          viewers.push(action.userId);
        }
        if (action.actionType === 'edit') {
          editors.push({ userId: action.userId, field: action.actionData as string });
        }
        if (action.actionType === 'move') {
          moving = action.userId;
        }
      });

      return {
        ...item,
        viewers,
        editors,
        moving,
      };
    });
    setList(_list);
  }, [collection.list, collection.path, actionsMap]);

  const setSelected = (item: T) => {
    if (collection.selected && collection.selected.id === item.id) {
      return;
    }

    // Remove previous selected item from realtime tracking
    if (collection.selected) {
      const actions = actionsMap[`${collection.path}-${collection.selected.id}`] || [];
      const viewer = actions.find((action) => action.userId === currentUser?.id && action.actionType === 'view');
      if (viewer) {
        removeAction(viewer);
      }
    }

    addAction({
      name: collection.path,
      actionType: 'view',
      itemId: item.id,
      userId: currentUser?.id,
    });

    collection.setSelected(item);
  };

  const startEditing = (item: T, field: string) => {
    addAction({
      name: collection.path,
      actionType: 'edit',
      actionData: field,
      itemId: item.id,
      userId: currentUser?.id,
    });
  }
  
  const startEditingSelected = (field: string) => {
    if (collection.selected) {
      startEditing(collection.selected, field);
    }
  }

  const finishEditing = (item: T, field: string) => {
    const actions = actionsMap[`${collection.path}-${item.id}`] || [];
    const editingAction = actions.find((action) => action.userId === currentUser?.id && action.actionType === 'edit' && action.actionData === field);
    if (editingAction) {
      removeAction(editingAction);
    }
  }

  const finishEditingSelected = (field: string) => {
    if (collection.selected) {
      finishEditing(collection.selected, field);
    }
  }

  const getEditingUser = (item: T, field: string) => {
    const actions = actionsMap[`${collection.path}-${item.id}`] || [];
    const editAction = actions.find((action) => action.actionType === 'edit' && action.actionData === field);

    return editAction?.userId;
  }

  const getEditingUserSelected = (field: string) => {
    if (collection.selected) {
      return getEditingUser(collection.selected, field);
    }
    return undefined;
  }

  const startMoving = (item: T | string) => {
    const itemId = typeof item === 'string' ? item : item.id
    addAction({
      name: collection.path,
      actionType: 'move',
      itemId,
      userId: currentUser?.id,
    });
  }
  
  const finishMoving = (item: T | string) => {
    const itemId = typeof item === 'string' ? item : item.id
    const actions = actionsMap[`${collection.path}-${itemId}`] || [];
    const movingAction = actions.find((action) => action.userId === currentUser?.id && action.actionType === 'move');
    if (movingAction) {
      removeAction(movingAction);
    }
  }

  return {
    ...collection,
    list,
    setSelected,
    startEditing,
    startEditingSelected,
    finishEditing,
    finishEditingSelected,
    getEditingUser,
    getEditingUserSelected,
    startMoving,
    finishMoving,
  };
};
