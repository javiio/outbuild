'use client';

import React, { useState } from 'react'
import { Page, Text, Button, Icons } from '@/core/ui';
import { Projects, ProjectPanel, NewProjectModal } from '@/projects';

export default function ProjectsPage() {
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  return (
    <Page>
      <Page.Header>
        <div className="px-6 flex items-center space-x-16">
          <Text.H1>Projects</Text.H1>
          <Button
            size='sm'
            icon={Icons.Plus}
            onClick={() => setIsNewFormOpen(true)}
          >
            New
          </Button>
        </div>
      </Page.Header>

      <Page.Content>
        <div className="p-4">
          <Projects />
        </div>

        <NewProjectModal
          isOpen={isNewFormOpen}
          onClose={() => setIsNewFormOpen(false)}
        />
      </Page.Content>

      <Page.Panel>
        <ProjectPanel />
      </Page.Panel>
    </Page>
  )
};
