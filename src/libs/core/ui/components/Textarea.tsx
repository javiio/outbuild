import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { ActionType } from '@/core/data';
import { ProfilePic, useUsers } from '@/users';

const DEBOUNCE_TIMEOUT = 1000;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChangeValue: (value: string) => Promise<void>;
  startEditing?: () => Promise<void>;
  finishEditing?: () => Promise<void>;
  getEditingUser?: () => string | undefined;
  className?: string;
}

export const Textarea = ({ value, onChangeValue, startEditing, finishEditing, getEditingUser, placeholder, className, ...props }: TextareaProps) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const { currentUser } = useUsers();
  const editingUser = getEditingUser && getEditingUser();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    onChangeDebounced(e.target.value);
  }

  const onChangeDebounced = debounce(onChangeValue, DEBOUNCE_TIMEOUT);

  return (
    <div className="relative">
      <textarea
        value={internalValue}
        placeholder={placeholder ?? 'Enter text...'}
        disabled={!!(editingUser && editingUser !== currentUser?.id)}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onFocus={startEditing}
        onBlur={finishEditing}
        className={`bg-slate-900 rounded mt-1 text-sm min-h-24 focus:outline-4 focus:outline-none focus:outline-blue-500 block p-2.5 w-full ${className}`}
        {...props}
      />

      {editingUser && (
        <div className="absolute -top-5 right-0">
          <ProfilePic user={editingUser} realtimeIndicator={ActionType.Edit} />
        </div>
      )}
    </div>
  );
};
