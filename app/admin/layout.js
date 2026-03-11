'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminAnimations from '@/components/admin/AdminAnimations';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    document.body.classList.add('admin-cursor');
    return () => document.body.classList.remove('admin-cursor');
  }, []);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/work', label: 'Work / Projects', icon: '💼' },
    { href: '/admin/services', label: 'Services', icon: '🛠️' },
    { href: '/admin/blog', label: 'Blog', icon: '📝' },
    { href: '/admin/careers', label: 'Careers', icon: '👥' },
  ];

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  if (isLoginPage) {
    return (
      <div className="admin-layout min-h-screen" style={{ cursor: 'auto' }}>
        <AdminAnimations key="login" />
        {children}
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen flex" style={{ cursor: 'auto' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold" style={{ color: '#0062a3' }}>Logix Admin</h1>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ cursor: 'pointer' }}
              className={`admin-sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                isActive(item.href)
                  ? 'bg-[#0062a3]/10 text-[#0062a3]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            style={{ cursor: 'pointer' }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            ← View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main flex-1 overflow-auto" style={{ cursor: 'auto' }}>
        <AdminAnimations key={pathname} />
        {children}
      </main>
    </div>
  );
}
