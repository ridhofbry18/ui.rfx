import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import ArticleCard from '../components/ui/ArticleCard';
import AffiliateSidebar from '../components/ui/AffiliateSidebar';

// Dummy data for initial UI render
const DUMMY_PRODUCTS = [
  { id: 1, title: 'Minimalist Portfolio Dev', slug: 'minimalist-portfolio', price: 4900, tags: ['React', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSFBjqw-i5jeJ4Bml6cFINu9iXDe7I1P5T3UMTWXvRrHB37gXs6Bauyd8hPxN4midBceZeXFQhMKwrAiIgZhjnLBEm5AtsAsA3g84MkstlzReNSbQfqKQW2xI0d_KhyvYyc0LdvlaMPOt2ph5to6tdQUZcJqBIZW3tQFSarOZ9IzeUpxb0_u9dPSIN3fBornbzANpljjLssAdorspbhFqqM5z0d0reYY3pRRMRmXpN3uz7gKEFL-KeM6Rph_GESmf9_RiJKU5wSbk' },
  { id: 2, title: 'Enterprise SaaS Admin', slug: 'enterprise-saas', price: 8900, tags: ['Next.js', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcA-wssBjm4ge7r8U5L5xVO_22aE_r0-ErbeCzznJitWtubh1nfDepJU0TizILO8mHMK5zndS5q-CnPglYegGkIU5vghAXiZKP6HylNSKPIY99rtVrhypvMxEM2p7DQILM7NMjIQD5xuCtichHkr7-8tXUcaTqczYmaWbB9SXtz2Yjt-AR5lXkiakMX4q1_YxTSuVIBcVcMt6ckSRYvQMb0AJPP3USY_DWlXjsAiKBScT-hwWTuAbZh7JbmjyoySGjraeBONcShuc' },
  { id: 3, title: 'Brutalist Agency Folio', slug: 'brutalist-agency', price: 3900, tags: ['Vue', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBakliY-YUWRGDQiz2ppccwfsWZb7yVCNjEM9rfJMHGiGA8HvcLwzEb6KzIwC2sPX8O5rpCyT3B1ga0UG785neT98FUwFF2BuSyT3e79tbNXimT0PxhtSW4QIBhhOiin65O8KG_j-d_lf6X449wrMI3BRVZKWpk2dS_Af3Q6E0l25TlZCcqGw-iQPDvyysDr6zG6WNlCmaSe7y-lh5zIcPcDVpD4AqJekBGLBIicz5OtWv2mLbxo0sJMoOX9C_ppZwsfCTo2Zmrttg' },
];

const DUMMY_ARTICLES = [
  { id: 1, title: 'Top 10 Typography Tools for 2026', slug: 'typography-tools', content_markdown: 'Explore the cutting-edge utilities that are defining the next generation of web typography, focusing on performance and legibility.', thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Q-8eJYfe-rNQYDXO-ZB6rk-SW056xZLQwbcdkvEbqMjk288CqrEmWB65KUyBjeZ1HE04fj-qibalAWQXeLnrKBFFGzEsPJw61vlqWIlSx7Gx2_WepGfZdqkVYfyJXAfJY0izDYJ8jpJbk4xYNbgLTnRzPHNtKwWl7FsPncl_9HNQ16KacFfzES5V9GF-3uWDyfSv2b866Q8jLCSRvMXj3bEjQHhbe-tPrsokXu-OnqXDNF-LwYmrdev3ZXkJAfUvshWvMKN4OGI', category: 'Design Systems' },
  { id: 2, title: 'Mastering Depth Without Shadows', slug: 'glassmorphism-depth', content_markdown: 'How to build robust layered interfaces using advanced CSS backdrop filters and border-opacity techniques.', thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEcsWr-vxyCZlT3jCXvYeVzQvaly0iOn2bpY-6reR_g2Nl7SX7HtoVOXwnaTuC2x9Ow2y3L8Bbhx4qmYDs8EqARaE7yjBze08rhVQH9A8LjhICJfOREL1YpxUDIJvE4wJdRXGeZSsYEi4mitT4WEZgqHqgYWD9SSpLqqYTW5gKgc-Bc0YqOYzLu2v1m0BsXu5-To7jAm4DXINq84aNI1yiyd5Q431msC3oPWEGKhClHJbkyeAfRBHAU9UO0aT3apkdSHSV8nKx_uE', category: 'Development' },
];

export default function Home() {
  return (
    <div className="flex-grow pb-24">
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-24 md:py-32 lg:py-48 flex flex-col items-center text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <h1 className="font-bold text-[32px] md:text-[64px] leading-[1.1] tracking-[-0.04em] text-primary mb-6 max-w-4xl">
          Elevate Your Web Presence with Premium UI.
        </h1>
        <p className="font-body text-[14px] md:text-[18px] text-on-surface-variant max-w-2xl mb-12">
          Production-ready React &amp; Tailwind templates, plus curated tools for modern developers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/marketplace" className="bg-primary text-on-primary font-label text-[12px] font-medium tracking-[0.05em] uppercase px-8 py-4 rounded hover:bg-white/90 transition-colors">
            Explore Templates
          </Link>
          <Link to="/directory" className="glass-panel text-primary font-label text-[12px] font-medium tracking-[0.05em] uppercase px-8 py-4 rounded hover:bg-white/5 transition-colors">
            Read Directory
          </Link>
        </div>
      </section>

      {/* Marketplace Grid Section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-24" id="templates">
        <h2 className="font-bold text-[24px] md:text-[32px] text-primary mb-12 border-b border-white/5 pb-4">Latest Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_PRODUCTS.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Directory Section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-24 border-t border-white/5" id="directory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Blog Feed */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <h2 className="font-bold text-[24px] md:text-[32px] text-primary mb-4 border-b border-white/5 pb-4">Editorial</h2>
            {DUMMY_ARTICLES.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4">
             {/* Instead of importing the component, let's just place the Sidebar code exactly as in the design to ensure perfect match, wait, let's keep the AffiliateSidebar component but I will update it. For now I keep the component call. */}
             <div className="sticky top-32">
                <AffiliateSidebar />
             </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
