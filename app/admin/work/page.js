'use client';

import { useState, useEffect } from 'react';

export default function AdminWork() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: '', title: '', category: '', description: '', image: '', year: '',
    desc: '', services: '', client: ''
  });

  const load = async () => {
    const res = await fetch('/api/work');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = {
      ...form,
      services: form.services?.split(',').map(s => s.trim()).filter(Boolean) || []
    };
    if (editing) {
      await fetch('/api/work', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/work', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setEditing(null);
    setForm({ id: '', title: '', category: '', description: '', image: '', year: '', desc: '', services: '', client: '' });
    load();
  };

  const remove = async (id) => {
    if (confirm('Delete this project?')) {
      await fetch(`/api/work?id=${id}`, { method: 'DELETE' });
      load();
    }
  };

  const edit = (item) => {
    setEditing(item.id);
    setForm({
      ...item,
      services: Array.isArray(item.services) ? item.services.join(', ') : item.services || ''
    });
  };

  return (
    <div className="min-h-full bg-gray-50" style={{ cursor: 'auto' }}>
      <header className="admin-content-anim bg-white border-b border-gray-200 px-8 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Work / Projects</h2>
      </header>
      <main className="p-8">
        <div className="admin-content-anim admin-card bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="font-semibold mb-4">{editing ? 'Edit' : 'Add'} Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="ID (e.g. wristler)" value={form.id} onChange={e => setForm({...form, id: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Category (E-COMMERCE, AI, PLATFORMS)" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Year" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Short description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <textarea placeholder="Full description" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" rows={3} style={{ cursor: 'text' }} />
            <input placeholder="Services (comma-separated)" value={form.services} onChange={e => setForm({...form, services: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Client" value={form.client} onChange={e => setForm({...form, client: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <div className="flex gap-2">
              <button onClick={save} className="admin-btn bg-[#0062a3] text-white px-4 py-2 rounded hover:bg-[#005090]" style={{ cursor: 'pointer' }}>Save</button>
              {editing && <button onClick={() => setEditing(null)} className="admin-btn bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" style={{ cursor: 'pointer' }}>Cancel</button>}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item bg-white rounded-lg border p-4 flex justify-between items-center">
              <div>
                <span className="font-semibold">{item.title}</span>
                <span className="text-gray-500 ml-2">({item.category})</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(item)} className="admin-btn text-[#0062a3] text-sm" style={{ cursor: 'pointer' }}>Edit</button>
                <button onClick={() => remove(item.id)} className="admin-btn text-red-600 text-sm" style={{ cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
