import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { useAuth } from '@/auth';
import { IconButton, Icon, Icons, type IconName } from '@/core/ui';

export const SidebarMenu = () => {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Tasks', href: '/', icon: Icons.Board },
    { name: 'Projects', href: '/projects', icon: Icons.Projects },
  ];

  return (
    <div className="absolute top-0 w-12 h-full">
      <Icon.Outbuild className="ml-3 mt-6 text-slate-800" size={7} />
      <div className="flex flex-col items-center space-y-4 mt-12">
        {navItems.map(({ name, href, icon }) => (
          <div className="h-9 flex flex-col justify-center" key={name}>
            <Link
              key={name}
              href={href}
              tabIndex={-1}
            >
              <IconButton
                name={icon as IconName}
                size={6}
                className={cn(
                  'p-0 hover:!bg-transparent hover:text-green-400',
                  pathname === href ? 'text-green-400' : ''
                )}
                iconClassName={cn(
                  'transition-all duration-300',
                  pathname !== href ? 'hover:w-7 hover:h-7 ' : ''
                )}
              />
            </Link>
          </div>
        ))}
      </div>

      <IconButton.Logout
        className="absolute bottom-6 left-2.5"
        size={6}
        onClick={logout}
      />
    </div>
  );
};
