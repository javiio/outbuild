import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import cn from 'classnames';
import { Colors, IconButton, Text, type ColorName } from '../';

interface ColorPickerProps {
  value?: ColorName
  onChange: (value: ColorName) => Promise<void> | void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
}

const SIZES = {
  xs: 'm-1 w-4 h-4',
  sm: 'm-1.5 w-5 h-5',
  md: 'm-1.5 w-6 h-6',
  lg: 'm-2 w-7 h-7',
  xl: 'm-3 w-8 h-8',
}

export const ColorPicker = ({ value, onChange, size = 'md', showLabel }: ColorPickerProps) => {
  return (
    <div>
      {showLabel && <Text.Label>Color</Text.Label>}

      <Menu>
        <MenuButton className="border border-white/50 hover:border-white hover:bg-white/5 rounded-md leading-3 focus:outline-none focus:outline-blue-500 focus:outline-4 focus:outline-offset-0">
          <div className={cn('rounded-full', SIZES[size], `bg-${value || Colors.gray}-500`)} />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="grid grid-cols-6 gap-2 p-2 z-50 mt-1 origin-top-right rounded-md bg-white text-slate-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {Object.keys(Colors).map((color: ColorName) => (
            <MenuItem key={color}>
              <button
                onClick={() => onChange(color)}
                className="p-1 border border-transparent hover:border-blue-500 rounded data-[focus]:border-blue-500"
              >
                <div className={cn('w-6 h-6 border rounded-full', `bg-${color}-500`)} />
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
};
