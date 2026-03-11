'use client';

import { useEffect, useState } from 'react';

export default function ProjectOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectsMap, setProjectsMap] = useState({});

  useEffect(() => {
    fetch('/api/work')
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((p) => { map[p.id] = p; });
        setProjectsMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleOpen = (e) => {
      const projectId = e.detail;
      const project = projectsMap[projectId];
      if (project) {
        setCurrentProject(project);
        setIsOpen(true);
      }
    };
    window.addEventListener('openProject', handleOpen);
    return () => window.removeEventListener('openProject', handleOpen);
  }, [projectsMap]);

  const closeProject = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('project-open');
      requestAnimationFrame(() => {
        const items = document.querySelectorAll('.project-anim-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('project-anim-active');
          }, index * 80);
        });
      });
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('project-open');
      const items = document.querySelectorAll('.project-anim-item');
      items.forEach((item) => {
        item.classList.remove('project-anim-active');
      });
    }
  }, [isOpen]);

  if (!currentProject) return null;

  return (
    <div id="project-overlay" className={`fixed inset-0 bg-white z-[70] overflow-y-auto transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'}`}>
      <button onClick={closeProject} className="absolute top-8 right-8 z-50 text-black hover:scale-110 transition-transform group flex items-center gap-2">
        <span className="text-sm font-bold uppercase tracking-widest hidden md:block text-gray-500 group-hover:text-black">Close Case</span>
        <div className="w-12 h-12 border border-black/10 rounded-full flex items-center justify-center group-hover:border-black transition-colors bg-white">✕</div>
      </button>

      <div className="min-h-screen pt-32 px-6 md:px-20 pb-20 max-w-7xl mx-auto">
        <div className="project-anim-item">
          <span className="inline-block px-4 py-1.5 border border-black rounded-md text-[10px] font-bold uppercase mb-8 tracking-widest bg-black text-white">
            {currentProject.category}
          </span>
        </div>

        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-12 leading-none project-anim-item">
          {currentProject.title}
        </h1>

        <div className="relative w-full h-[60vh] mb-16 overflow-hidden rounded-2xl shadow-2xl project-anim-item">
          <img src={currentProject.image} className="w-full h-full object-cover" alt={currentProject.title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 project-anim-item">
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold mb-6">The Story</h3>
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              {currentProject.desc}
            </p>
            <div className="mt-12 flex gap-4">
              <button className="bg-[#0062a2] text-white px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                Visit Website
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Services</h3>
              <ul className="space-y-2 text-lg font-medium border-l-2 border-gray-100 pl-4">
                {currentProject.services?.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Client</h3>
              <p className="text-lg font-medium border-l-2 border-gray-100 pl-4">{currentProject.client}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
