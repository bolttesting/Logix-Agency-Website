'use client';

import { useState, useEffect } from 'react';

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ id: '', title: '', icon: '', description: '', features: '', tech: '' });

  const load = async () => {
    const res = await fetch('/api/services');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = {
      ...form,
      features: form.features?.split('\n').map(s => s.trim()).filter(Boolean) || [],
      tech: form.tech?.split(',').map(s => s.trim()).filter(Boolean) || []
    };
    if (editing) {
      await fetch('/api/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setEditing(null);
    setForm({ id: '', title: '', icon: '', description: '', features: '', tech: '' });
    load();
  };

  const remove = async (id) => {
    if (confirm('Delete?')) {
      await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      load();
    }
  };

  const edit = (item) => {
    setEditing(item.id);
    setForm({
      ...item,
      features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '',
      tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech || ''
    });
  };

  return (
    <div className="min-h-full bg-gray-50" style={{ cursor: 'auto' }}>
      <header className="admin-content-anim bg-white border-b border-gray-200 px-8 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Services</h2>
      </header>
      <main className="p-8">
        <div className="admin-content-anim admin-card bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="font-semibold mb-4">{editing ? 'Edit' : 'Add'} Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Icon (emoji)" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" rows={2} style={{ cursor: 'text' }} />
            <textarea placeholder="Features (one per line)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" rows={4} style={{ cursor: 'text' }} />
            <input placeholder="Tech (comma-separated)" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <button onClick={save} className="admin-btn bg-[#0062a3] text-white px-4 py-2 rounded hover:bg-[#005090]" style={{ cursor: 'pointer' }}>Save</button>
            {editing && <button onClick={() => setEditing(null)} className="bg-gray-200 px-4 py-2 rounded" style={{ cursor: 'pointer' }}>Cancel</button>}
          </div>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item bg-white rounded-lg border p-4 flex justify-between items-center">
              <span className="font-semibold">{item.icon} {item.title}</span>
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
