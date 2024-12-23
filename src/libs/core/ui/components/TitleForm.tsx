import React, { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { Button, IconButton, Input, Text, Icons, ActionsMenu } from '@/core/ui';
import { type Data, ActionType } from '@/core/data';
import { ProfilePic, useUsers } from '@/users';


interface TitleFormProps {
	item: Data;
  update: (item: Partial<Data>) => Promise<void>;
  remove?: () => Promise<void>;
  startEditing?: (field: string) => void;
  finishEditing?: (field: string) => void;
  getEditingUser?: (userId: string) => string | undefined;
}

export const TitleForm = ({ item, update, remove, startEditing, finishEditing, getEditingUser }: TitleFormProps) => {
  const { currentUser } = useUsers();
  const [name, setName] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);
  const editingUser = getEditingUser && getEditingUser('name');
  const formRef = useRef(null);
  useClickAway(formRef, () => handleFinishEditing());

  useEffect(() => {
    resetForm();
  }, [item]);

  const resetForm = () => {
    setName(item.name);
    setIsEditing(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') return;
    handleFinishEditing();
    update({ name });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      handleFinishEditing();
    }
  };

  const handleStartEditing = () => {
    if (editingUser) {
      return;
    }

    if (startEditing) {
      startEditing('name');
    }
    setIsEditing(true);
  }

  const handleFinishEditing = () => {
    resetForm();
    setIsEditing(false);
    if (finishEditing) {
      finishEditing('name');
    }
  }

  const handleOnRemove = async () => {
    if (remove) {
      remove();
    }
  }

  return (
    <>
      {isEditing ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="bg-slate-800 -mt-1 -ml-2 w-full"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-2xl font-light px-2 py-1"
            placeholder="Name..."
            autoFocus
          />
          <div className="flex items-center space-x-2 mt-2.5 mb-1">
            <Button type="submit" size="sm">
              Update
            </Button>
            <IconButton.X onClick={handleFinishEditing} />
          </div>
        </form>
      ) : (
        <div className="flex space-x-2 relative">
          <Text.H2 className="flex-1" onClick={handleStartEditing}>
            {item.name}
          </Text.H2>

          <div className="mt-1">
            <ActionsMenu
              items={[
                { icon: Icons.Edit, name: 'Edit', onClick: handleStartEditing, disabled: !!editingUser },
                { icon: Icons.Remove, name: 'Remove', onClick: handleOnRemove, disabled: !!editingUser },
              ]}
            />
          </div>

          {editingUser && editingUser !== currentUser?.id && (
            <div className="absolute -top-2 right-8">
              <ProfilePic user={editingUser} realtimeIndicator={ActionType.Edit} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
