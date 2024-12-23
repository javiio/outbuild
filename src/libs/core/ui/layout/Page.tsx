import React from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

export const PageHeader: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
	return (
    <div className="h-12">
      {children}
    </div>
  );
};

export const PageContent: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
	return (
    <div className='h-full overflow-auto'>
      {children}
    </div>
  );
};

export const PagePanel: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="p-4 h-full overflow-auto">
      {children}
    </div>
	);
};

type PageType = React.FC<{ children: React.ReactNode }> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Content: React.FC<{ children: React.ReactNode }>;
  Panel: React.FC<{ children: React.ReactNode }>;
};

export const Page: PageType = ({ children }: { children: React.ReactNode }) => {
	const getChild = (type: string) => {
		return React.Children.toArray(children).find((child: any) => child.type.displayName === type);
	}

	const header = getChild('PageHeader');
  const content = getChild('PageContent');
	const panel = getChild('PagePanel');

	return (
    <>
      {header}
      <PanelGroup direction="horizontal">
        <Panel defaultSize={70} minSize={25} className='pr-0.5'>
          {content}
        </Panel>

        <PanelResizeHandle className="bg-slate-600 cursor-col-resize w-1 hover:bg-slate-500 hover:shadow-xl" />

        <Panel minSize={20} className="bg-slate-800">
          {panel}
        </Panel>
      </PanelGroup>
    </>
  );
};

Page.Header = PageHeader;
Page.Header.displayName = 'PageHeader';

Page.Content = PageContent;
Page.Content.displayName = 'PageContent';

Page.Panel = PagePanel;
Page.Panel.displayName = 'PagePanel';

