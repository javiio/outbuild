import React, { Fragment } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import cn from 'classnames';
import { IconButton, Icon, Icons, type IconName } from '@/core/ui';

interface ActionsMenuProps {
  icon?: IconName
  items: Array<{
    icon?: IconName
    name: string
    onClick: () => void | Promise<void>
    disabled?: boolean
  }>
};

export const ActionsMenu = ({ icon = Icons.More, items }: ActionsMenuProps) => {
  return (
    <Menu as="div" className="relative block text-left">
      <MenuButton>
        <Icon name={icon} size={5} />
      </MenuButton>
      <MenuItems className="absolute w-36 right-0 z-10 origin-top-right rounded-md border divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
        {items.map((item) => (
          <MenuItem
            key={item.name}
            as="button"
            disabled={item.disabled}
            onClick={item.onClick}
            className="group flex w-full space-x-2.5 items-center rounded-md px-2 py-2.5 text-xs text-slate-900 data-[active]:bg-blue-500 data-[active]:text-white"
          >
            <Icon name={item.icon ?? Icons.Minus} size={3.5} />
            <span>{item.name}</span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
