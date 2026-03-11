'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function BlogPage() {
  const [filter, setFilter] = useState('all');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  const categories = ['all', ...new Set(articles.map((a) => a.category).filter(Boolean))];
  const filteredArticles = filter === 'all' ? articles : articles.filter((a) => a.category === filter);
  const featured = articles[0];
  const gridArticles = filter === 'all' ? filteredArticles.slice(1) : filteredArticles;

  return (
    <MainLayout darkNav={true}>
      <section className="min-h-[70vh] pt-32 pb-20 flex items-center relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#0062a2] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0062a2] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#0062a2]/10 text-[#0062a2] font-semibold uppercase text-xs tracking-widest mb-6 px-4 py-2 rounded-full border border-[#0062a2]/20">
              <span className="w-2 h-2 bg-[#0062a2] rounded-full"></span> Insights & Articles
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
              <span className="text-[#0062a2]">BLOG</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Thoughts, tutorials, and insights on web development, AI, design, and digital innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs uppercase font-bold transition ${
                  filter === cat ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filter === 'all' && featured && (
            <Link href={`/blog/${featured.slug}`} className="mb-16 group cursor-pointer block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-6 left-6 bg-[#0062a2] text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
                    Featured
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-[#0062a2] text-xs font-bold uppercase tracking-wide mb-4">
                    {featured.category}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-[#0062a2] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center flex-wrap gap-3 xl:gap-4 text-sm text-gray-500">
                    <span className="font-semibold">{featured.author}</span>
                    <span>•</span>
                    <span>{featured.date}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group cursor-pointer block">
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="text-[#0062a2] text-xs font-bold uppercase tracking-wide mb-3">
                  {article.category}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#0062a2] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center flex-wrap gap-2 xl:gap-3 text-sm text-gray-500">
                  <span className="font-semibold">{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
