import React from 'react';
import cn from 'classnames';
import { Icon, ButtonLoader, type IconName } from '../';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'clear' | 'link'
  theme?: 'light' | 'dark'
  icon?: IconName
  isLoading?: boolean
};

export const Button = ({
  className,
  size = 'md',
  variant = 'primary',
  theme = 'dark',
  icon,
  children,
  isLoading,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) => {
  const classes = cn(
    'focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-md flex justify-center items-center space-x-2 transition-all duration-200 ease-in-out min-w-20',
    size === 'xs' && 'text-xs py-0.5 px-2',
    size === 'sm' && 'text-sm py-1 px-3',
    size === 'md' && 'text-md py-2.5 px-5',
    variant === 'primary' && !disabled && 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br',
    variant === 'clear' && 'border border-white focus:ring-white/90',
    variant === 'link' && 'text-blue-500 hover:underline',
    theme === 'light' && '!text-slate-900 !border-slate-900',
    disabled && 'bg-gray-400',
    className && className
  );

  return (
    <button className={classes} {...props} disabled={disabled || isLoading} type={type}>
      {isLoading
        ? <ButtonLoader />
        : <>
          {icon && <Icon name={icon} size={4} />}
          <span>{children}</span>
        </>
      }
    </button>
  );
};
