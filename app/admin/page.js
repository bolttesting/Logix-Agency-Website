'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-full" style={{ cursor: 'auto' }}>
      <header className="admin-content-anim bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="admin-btn text-sm text-red-600 hover:text-red-700 font-medium"
          style={{ cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <div className="p-8">
        <p className="admin-content-anim text-gray-600 mb-8">Select a section from the sidebar to manage content.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Link href="/admin/work" className="admin-card-anim admin-card bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0062a3] hover:shadow-lg flex items-center gap-3" style={{ cursor: 'pointer' }}>
            <span className="text-2xl">💼</span>
            <div>
              <h3 className="font-semibold text-gray-900">Work</h3>
              <p className="text-xs text-gray-500">Portfolio projects</p>
            </div>
          </Link>
          <Link href="/admin/services" className="admin-card-anim admin-card bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0062a3] hover:shadow-lg flex items-center gap-3" style={{ cursor: 'pointer' }}>
            <span className="text-2xl">🛠️</span>
            <div>
              <h3 className="font-semibold text-gray-900">Services</h3>
              <p className="text-xs text-gray-500">Service offerings</p>
            </div>
          </Link>
          <Link href="/admin/blog" className="admin-card-anim admin-card bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0062a3] hover:shadow-lg flex items-center gap-3" style={{ cursor: 'pointer' }}>
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-semibold text-gray-900">Blog</h3>
              <p className="text-xs text-gray-500">Blog posts</p>
            </div>
          </Link>
          <Link href="/admin/careers" className="admin-card-anim admin-card bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0062a3] hover:shadow-lg flex items-center gap-3" style={{ cursor: 'pointer' }}>
            <span className="text-2xl">👥</span>
            <div>
              <h3 className="font-semibold text-gray-900">Careers</h3>
              <p className="text-xs text-gray-500">Job openings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
