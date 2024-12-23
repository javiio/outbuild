import React, { useState } from "react";

interface TooltipProps {
	content: string;
	children: React.ReactNode;
  disabled?: boolean;
}

export const Tooltip = ({ content, children, disabled }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0.5 w-max bg-black border border-slate-700 text-xs rounded-sm py-0.5 px-2 shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};
