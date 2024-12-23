import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Icon, IconButton, Text } from '../';
import { Icons, type IconName } from '../Icons';

interface IconPickerProps {
  value?: IconName
  onChange: (value: IconName) => Promise<void> | void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
}

const AVAILABLE_ICONS = [
  Icons.Outbuild,
  Icons.Fire,
  Icons.Sales,
  Icons.Gamging,
  Icons.Sports,
  Icons.Board,
  Icons.Edit,
  Icons.Home,
  Icons.Development,
  Icons.Plus,
  Icons.Projects,
  Icons.Design,
];

const SIZES = {
  xs: 4,
  sm: 5,
  md: 6,
  lg: 7,
  xl: 8,
}

const MARGIN = {
  xs: 'm-1',
  sm: 'm-1.5',
  md: 'm-1.5',
  lg: 'm-2',
  xl: 'm-3',
}

export const IconPicker = ({ value, onChange, size = 'md', showLabel }: IconPickerProps) => {
  return (
    <div>
      {showLabel && <Text.Label>Icon</Text.Label>}

      <Menu>
        <MenuButton className="border border-white/50 hover:border-white hover:bg-white/5 rounded-md leading-3 focus:outline-none focus:outline-blue-500 focus:outline-4 focus:outline-offset-0">
          <Icon
            className={MARGIN[size]}
            name={value || Icons.More}
            size={SIZES[size]}
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="grid grid-cols-6 gap-2 p-2 z-50 mt-1 origin-top-right rounded-md bg-white text-slate-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {AVAILABLE_ICONS.map((icon) => (
            <MenuItem key={icon}>
              <IconButton
                name={icon}
                size={6}
                className="!p-2 hover:!bg-blue-500 hover:!text-white data-[focus]:bg-blue-500 data-[focus]:text-white"
                onClick={() => onChange(icon)}
              />
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
};
