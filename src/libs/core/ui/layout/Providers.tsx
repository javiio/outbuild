import React from 'react';
// import { ProvideDomains } from '~domains';
import { ProvideRealtimeActions } from '@/core/data';
import { ProvideProjects } from '@/projects';
import { ProvideTasks } from '@/tasks';
import { ProvideUsers } from '@/users';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProvideUsers>
      <ProvideRealtimeActions>
        <ProvideProjects>
          <ProvideTasks>
            {children}
          </ProvideTasks>
        </ProvideProjects>
      </ProvideRealtimeActions>
    </ProvideUsers>
  );
};
