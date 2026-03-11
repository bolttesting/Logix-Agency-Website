'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CTA from '@/components/sections/CTA';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug;
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch('/api/work')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === slug);
        setProject(found);
      })
      .catch(() => setProject(null));
  }, [slug]);

  if (!project) {
    return (
      <MainLayout>
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <p className="text-gray-500">Project not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout darkNav={true}>
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <span className="bg-[#0062a2] text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mt-8 mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{project.year} • {project.client}</p>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">The Story</h2>
              <p className="text-xl text-gray-700 leading-relaxed">{project.desc}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Services</h3>
              <ul className="space-y-2">
                {(project.services || []).map((s, i) => (
                  <li key={i} className="font-medium">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
      <CTA />
    </MainLayout>
  );
}
