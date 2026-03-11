'use client';

import { useState, useEffect } from 'react';

export default function AdminBlog() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: '', slug: '', title: '', category: '', excerpt: '', image: '',
    author: '', authorRole: '', authorAvatar: '', date: '', readTime: '', content: ''
  });

  const load = async () => {
    const res = await fetch('/api/blog');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const slug = form.slug || form.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const payload = { ...form, slug };
    if (editing) {
      await fetch('/api/blog', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setEditing(null);
    setForm({ id: '', slug: '', title: '', category: '', excerpt: '', image: '', author: '', authorRole: '', authorAvatar: '', date: '', readTime: '', content: '' });
    load();
  };

  const remove = async (id) => {
    if (confirm('Delete?')) {
      await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      load();
    }
  };

  const edit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
  };

  return (
    <div className="min-h-full bg-gray-50" style={{ cursor: 'auto' }}>
      <header className="admin-content-anim bg-white border-b border-gray-200 px-8 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Blog</h2>
      </header>
      <main className="p-8">
        <div className="admin-content-anim admin-card bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="font-semibold mb-4">{editing ? 'Edit' : 'Add'} Post</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <textarea placeholder="Excerpt" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" rows={2} style={{ cursor: 'text' }} />
            <input placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Author role" value={form.authorRole} onChange={e => setForm({...form, authorRole: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Author avatar URL" value={form.authorAvatar} onChange={e => setForm({...form, authorAvatar: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Read time" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <textarea placeholder="Content (HTML)" value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" rows={6} style={{ cursor: 'text' }} />
            <button onClick={save} className="admin-btn bg-[#0062a3] text-white px-4 py-2 rounded hover:bg-[#005090]" style={{ cursor: 'pointer' }}>Save</button>
            {editing && <button onClick={() => setEditing(null)} className="bg-gray-200 px-4 py-2 rounded" style={{ cursor: 'pointer' }}>Cancel</button>}
          </div>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item bg-white rounded-lg border p-4 flex justify-between items-center">
              <span className="font-semibold">{item.title}</span>
              <div className="flex gap-2">
                <button onClick={() => edit(item)} className="text-[#0062a3] text-sm" style={{ cursor: 'pointer' }}>Edit</button>
                <button onClick={() => remove(item.id)} className="text-red-600 text-sm" style={{ cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
