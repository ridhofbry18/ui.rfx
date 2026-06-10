import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ title, slug, content_markdown, thumbnail_url, category }: any) {
  
  // Extract a brief excerpt
  const excerpt = content_markdown ? content_markdown.substring(0, 120) + '...' : 'Premium curation insights and resources for elite developers and designers...';
  
  return (
    <article className="flex flex-col md:flex-row gap-6 glass-panel p-6 rounded-lg hover:border-white/20 transition-colors group">
      <div className="md:w-1/3 aspect-[4/3] bg-surface-container rounded overflow-hidden">
        {thumbnail_url ? (
            <img src={thumbnail_url} alt={title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent border border-white/5 m-1"></div>
        )}
      </div>
      
      <div className="md:w-2/3 flex flex-col justify-center">
        <span className="font-label text-[12px] uppercase tracking-[0.05em] text-on-surface-variant mb-2">
            {category || 'Editorial'}
        </span>
        <h3 className="font-section-title text-[18px] font-semibold text-primary mb-3">
            <Link to={`/directory/${slug}`} className="hover:text-primary/80 transition-colors">
              {title}
            </Link>
        </h3>
        <p className="font-body text-[14px] text-on-surface-variant mb-4 line-clamp-2">
            {excerpt}
        </p>
        <Link to={`/directory/${slug}`} className="inline-flex items-center gap-1 font-label text-[12px] uppercase tracking-[0.05em] text-primary hover:opacity-80 transition-opacity">
            Read Article <ArrowRight className="w-[14px] h-[14px]" />
        </Link>
      </div>
    </article>
  );
}
