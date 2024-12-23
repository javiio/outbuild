import React from 'react';

interface BaseTextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

const TextBase = <T extends React.ElementType = 'span'>({ as, children, ...props }: { as?: T } & BaseTextProps) => {
  const Component = as || 'span';

  return (
    <Component {...props}>
      {children}
    </Component>
  );
};

export const Text = ({ className = '', children, ...props }: BaseTextProps) => {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
};

Text.H1 = ({ className = '', children, ...props }: BaseTextProps) => {
  return (
    <TextBase as="h1" className={`text-3xl font-thin mb-2 ${className}`} {...props}>
      {children}
    </TextBase>
  );
};

Text.H2 = ({ className = '', children, ...props }: BaseTextProps) => {
  return (
    <TextBase as="h2" className={`text-2xl font-light mb-2 ${className}`} {...props}>
      {children}
    </TextBase>
  );
};

Text.H3 = ({ className = '', children, ...props }: BaseTextProps) => {
  return (
    <TextBase as="h3" className={`text-lg font-thin mb-2 ${className}`} {...props}>
      {children}
    </TextBase>
  );
};

Text.Label = ({ className = '', children, ...props }: BaseTextProps) => {
  return (
    <TextBase as="label" className={`block font-medium mb-2 ${className}`} {...props}>
      {children}
    </TextBase>
  );
};

Text.displayName = 'Text';
Text.H1.displayName = 'Text.H1';
Text.H2.displayName = 'Text.H2';
Text.H3.displayName = 'Text.H3';
Text.Label.displayName = 'Text.Label';

export default Text;
