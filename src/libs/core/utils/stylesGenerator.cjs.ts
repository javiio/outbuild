/**
 * How to regenerate:
 * Run `yarn generate-styles`.
 */

const fs = require('fs');

const colors = [
	'gray-400',
	'yellow-500',
	'yellow-540',
	'green-500',
	'sky-500',
	'orange-500',
	'purple-500',
  'red-500',
  'green-400',
  'blue-500',
  'blue-400',
  'gray-500',
  'black',
  'pink-500',
  'indigo-500',
  'teal-500',
  'cyan-500',
  'lime-500',
  'amber-500',
  'emerald-500',
  'sky-500',
  'fuchsia-500',
  'rose-500',
  'violet-500',
  'azure-500',
  'mint-500',
];

const variations = [
  'border-${color}',
	'text-${color}',
	'hover:text-${color}',
	'bg-${color}',
	'bg-${color}/10',
	'bg-${color}/25',
  'bg-${color}/50',
	'hover:bg-${color}',
	'hover:bg-${color}/75',
	'border-${color}/50',
	'border-${color}/75',
	'hover:border-${color}',
	'hover:border-${color}/25',
	'hover:border-${color}/50',
	'focus:outline-${color}',
	'after:bg-${color}',
	'from-${color}'
];
const extraClasses = ['hidden', 'h-10', 'h-9', 'h-8', 'h-7', 'h-6', 'h-5', 'h-4', 'h-3', 'h-3.5', 'h-2', 'h-2.5', 'w-8', 'w-7', 'w-6', 'w-5', 'w-4', 'w-3', 'w-3.5'];

const outputPath = './renderer/libs/core/ui/layout/GeneratedStyles.tsx';

// Utility function to generate className string
const generateClassNames = () => {
  return colors
    .map(color => {
      return variations.map(variation => variation.replace(/\$\{color\}/g, color)).join(' ');
    })
    .join(' ');
};

// Template for the generated component
const componentTemplate = `
/**
 * DO NOT TOUCH THIS FILE
 * This file was automatically generated. To update it, please modify the generator script and run it again.
 *
 * How to regenerate:
 * Run \`yarn generate-styles\`.
 */

import React from 'react';
import cn from 'classnames';

const GeneratedStyles: React.FC = () => {
  return (
    <div
      className={cn(
        '${extraClasses.join(' ')}',
        '${generateClassNames()}'
      )}
    />
  );
};

export default GeneratedStyles;
`;

// Write the file
fs.writeFileSync(outputPath, componentTemplate.trim());

console.log(`Component generated at ${outputPath}`);
