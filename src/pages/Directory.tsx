import { useState, useEffect } from 'react';
import ArticleCard from '../components/ui/ArticleCard';
import AffiliateSidebar from '../components/ui/AffiliateSidebar';
import { fetchArticles } from '../lib/turso';

export default function Directory() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchArticles();
        if (data && data.length > 0) {
            setArticles(data);
        } else {
            setArticles([
                { id: 1, title: 'Top 10 Typography Tools for 2026', slug: 'typography-tools', content_markdown: 'Explore the cutting-edge utilities that are defining the next generation of web typography, focusing on performance and legibility.', thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Q-8eJYfe-rNQYDXO-ZB6rk-SW056xZLQwbcdkvEbqMjk288CqrEmWB65KUyBjeZ1HE04fj-qibalAWQXeLnrKBFFGzEsPJw61vlqWIlSx7Gx2_WepGfZdqkVYfyJXAfJY0izDYJ8jpJbk4xYNbgLTnRzPHNtKwWl7FsPncl_9HNQ16KacFfzES5V9GF-3uWDyfSv2b866Q8jLCSRvMXj3bEjQHhbe-tPrsokXu-OnqXDNF-LwYmrdev3ZXkJAfUvshWvMKN4OGI', category: 'Design Systems' },
                { id: 2, title: 'Mastering Depth Without Shadows', slug: 'glassmorphism-depth', content_markdown: 'How to build robust layered interfaces using advanced CSS backdrop filters and border-opacity techniques.', thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEcsWr-vxyCZlT3jCXvYeVzQvaly0iOn2bpY-6reR_g2Nl7SX7HtoVOXwnaTuC2x9Ow2y3L8Bbhx4qmYDs8EqARaE7yjBze08rhVQH9A8LjhICJfOREL1YpxUDIJvE4wJdRXGeZSsYEi4mitT4WEZgqHqgYWD9SSpLqqYTW5gKgc-Bc0YqOYzLu2v1m0BsXu5-To7jAm4DXINq84aNI1yiyd5Q431msC3oPWEGKhClHJbkyeAfRBHAU9UO0aT3apkdSHSV8nKx_uE', category: 'Development' },
            ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex-grow pt-24 pb-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <header className="mb-16">
            <h1 className="font-bold text-[32px] md:text-[64px] mb-6 tracking-tighter text-primary">Directory</h1>
            <p className="font-body text-[14px] md:text-[18px] text-on-surface-variant max-w-xl">
              Editorial insights, technical deep-dives, and curated dev resources.
            </p>
          </header>

          {loading ? (
             <div className="space-y-6 animate-pulse">
             {[1, 2, 3].map(i => (
                 <div key={i} className="h-48 glass-panel rounded-2xl"></div>
             ))}
         </div>
          ) : (
            <div className="space-y-2">
              {articles.map(article => (
                  <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-hidden">
           <AffiliateSidebar />
        </div>
        
      </div>
    </div>
  );
}
