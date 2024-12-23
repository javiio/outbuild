import React from 'react';
import { Icon, type IconName } from '../';
import { IconsMap } from '../Icons';

interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: IconName
  size?: string | number
  className?: string
  iconClassName?: string
}

const IconButton = ({
  name,
  size,
  className = '',
  iconClassName = '',
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`hover:bg-white/5 rounded-md p-[1px] opacity-90 hover:opacity-100 focus-visible:outline-blue-500 focus-visible:outline-none focus-visible:outline-4 transition-all duration-150 ${className}`}
      type="button"
      {...props}
    >
      <Icon name={name} size={size} className={iconClassName} />
    </button>
  );
};

Object.entries(IconsMap).forEach(([name]) => {
  IconButton[name] = (props: Omit<IconButtonProps, 'name'>) => (
    <IconButton name={name as IconName} {...props} />
  );
});

type IconButtonComponent = typeof IconButton & {
  [K in IconName]: (props: Omit<IconButtonProps, 'name'>) => JSX.Element;
};

const TypedIconButton = IconButton as IconButtonComponent;

export {
  TypedIconButton as IconButton,
};
