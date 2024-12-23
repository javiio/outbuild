import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  animate?: boolean;
  variant?: 'primary' | 'secondary'
}

export const Input = ({ animate = true, variant = 'primary', className, ...props }: InputProps) => {
  const classes = [
    'rounded-md focus:outline-4 focus:outline-none focus:outline-blue-500 block p-2.5 w-full',
    animate ? 'w-48 focus:flex-1 focus:w-full transition-all' : '',
    variant === 'secondary' ? 'bg-white/5 border border-white/30' : 'bg-slate-900',
    className,
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  }

  return (
    <input
      onKeyDown={handleKeyDown}
      className={classes.join(' ')}
      {...props}
    />
  );
};
