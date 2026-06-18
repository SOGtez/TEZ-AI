import type { NavLink } from '~/common';
import { useActivePanel, resolveActivePanel } from '~/Providers';
import TezLogo from '~/components/Branding/TezLogo';

export default function Nav({ links }: { links: NavLink[] }) {
  const { active } = useActivePanel();
  const effectiveActive = resolveActivePanel(active, links);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden text-text-primary">
      <div className="flex flex-shrink-0 items-center px-3 pb-1 pt-3">
        <TezLogo className="text-[22px]" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {links.map((link) =>
          link.id === effectiveActive && link.Component ? <link.Component key={link.id} /> : null,
        )}
      </div>
    </div>
  );
}
