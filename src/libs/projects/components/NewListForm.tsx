import React, { useState } from 'react';
import { Button, IconButton, Input, Icon } from '@/core/ui';
import { useProjects, createListData, type Project } from '@/projects';

interface NewListFormProps {
  project: Project
}

export const NewListForm = ({ project }: NewListFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { update } = useProjects();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') return;
    setIsLoading(true);
    await update(project, {
      listsData: [...project.listsData ?? [], createListData({ name })],
    });
    setName('');
    setShowForm(false);
    setIsLoading(false);
  };

  return (
    <div className="w-64 h-28 shrink-0 bg-slate-800 rounded-md mx-2">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center w-full h-full space-x-1 hover:border rounded-md border-slate-600"
        >
          <Icon.Plus />
          <span>Add List</span>
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="List name..."
            autoFocus
          />
          <div className="flex space-x-2 items-center mt-2.5">
            <Button
              type="submit"
              isLoading={isLoading}
              size="sm"
            >
              Add list
            </Button>
            <IconButton.X
              onClick={() => setShowForm(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};
