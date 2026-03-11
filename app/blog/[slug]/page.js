'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CTA from '@/components/sections/CTA';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.slug === slug);
        setArticle(found || data[0]);
      })
      .catch(() => setArticle(null));
  }, [slug]);

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout darkNav={true}>
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="mb-8">
            <span className="bg-[#0062a2] text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
              {article.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-12">
            <span className="font-semibold">{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[#0062a2]"
            dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
          />
        </div>
      </article>
      <CTA />
    </MainLayout>
  );
}
