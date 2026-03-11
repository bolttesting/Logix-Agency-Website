'use client';

import { useState, useEffect } from 'react';

export default function AdminCareers() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ id: '', title: '', location: '', type: '', department: '', description: '' });

  const load = async () => {
    const res = await fetch('/api/careers');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) {
      await fetch('/api/careers', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/careers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setEditing(null);
    setForm({ id: '', title: '', location: '', type: '', department: '', description: '' });
    load();
  };

  const remove = async (id) => {
    if (confirm('Delete?')) {
      await fetch(`/api/careers?id=${id}`, { method: 'DELETE' });
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
        <h2 className="text-lg font-semibold text-gray-900">Careers</h2>
      </header>
      <main className="p-8">
        <div className="admin-content-anim admin-card bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="font-semibold mb-4">{editing ? 'Edit' : 'Add'} Job</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Type (Full-time, Part-time)" value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <input placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded focus:border-[#0062a3] focus:outline-none" style={{ cursor: 'text' }} />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="admin-input border border-gray-200 px-3 py-2 rounded md:col-span-2 focus:border-[#0062a3] focus:outline-none" rows={4} style={{ cursor: 'text' }} />
            <button onClick={save} className="admin-btn bg-[#0062a3] text-white px-4 py-2 rounded hover:bg-[#005090]" style={{ cursor: 'pointer' }}>Save</button>
            {editing && <button onClick={() => setEditing(null)} className="bg-gray-200 px-4 py-2 rounded" style={{ cursor: 'pointer' }}>Cancel</button>}
          </div>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item bg-white rounded-lg border p-4 flex justify-between items-center">
              <div>
                <span className="font-semibold">{item.title}</span>
                <span className="text-gray-500 ml-2">({item.department})</span>
              </div>
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
