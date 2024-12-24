'use client';
import Head from 'next/head';
import React from 'react'
import { Page } from '@/core/ui';
import { ProjectBoard, ProjectsTabs } from '@/projects';
import { TaskPanel, useTasks } from '@/tasks';

export default function ProjectsPage() {
  const { currentProject } = useTasks();

  return (
    <>
    <Head>
        <title>Outbuild | Kanban</title>
        <link rel="icon" href='/favicon.png' />
      </Head>
    <Page>
      <Page.Header>
        <ProjectsTabs />
      </Page.Header>

      <Page.Content>
        <div className="mt-4">
          {currentProject && <ProjectBoard project={currentProject} />}
        </div>
      </Page.Content>

      <Page.Panel>
        <TaskPanel />
      </Page.Panel>
    </Page></>
  )
}