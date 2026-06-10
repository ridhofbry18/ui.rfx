import { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { fetchProducts } from '../lib/turso';

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts();
        if (data && data.length > 0) {
            setProducts(data);
        } else {
            // Fallback for UI if DB is empty or unconfigured
            setProducts([
                { id: 1, title: 'Minimalist Portfolio Dev', slug: 'minimalist-portfolio', price: 4900, tags: ['React', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSFBjqw-i5jeJ4Bml6cFINu9iXDe7I1P5T3UMTWXvRrHB37gXs6Bauyd8hPxN4midBceZeXFQhMKwrAiIgZhjnLBEm5AtsAsA3g84MkstlzReNSbQfqKQW2xI0d_KhyvYyc0LdvlaMPOt2ph5to6tdQUZcJqBIZW3tQFSarOZ9IzeUpxb0_u9dPSIN3fBornbzANpljjLssAdorspbhFqqM5z0d0reYY3pRRMRmXpN3uz7gKEFL-KeM6Rph_GESmf9_RiJKU5wSbk' },
                { id: 2, title: 'Enterprise SaaS Admin', slug: 'enterprise-saas', price: 8900, tags: ['Next.js', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcA-wssBjm4ge7r8U5L5xVO_22aE_r0-ErbeCzznJitWtubh1nfDepJU0TizILO8mHMK5zndS5q-CnPglYegGkIU5vghAXiZKP6HylNSKPIY99rtVrhypvMxEM2p7DQILM7NMjIQD5xuCtichHkr7-8tXUcaTqczYmaWbB9SXtz2Yjt-AR5lXkiakMX4q1_YxTSuVIBcVcMt6ckSRYvQMb0AJPP3USY_DWlXjsAiKBScT-hwWTuAbZh7JbmjyoySGjraeBONcShuc' },
                { id: 3, title: 'Brutalist Agency Folio', slug: 'brutalist-agency', price: 3900, tags: ['Vue', 'Tailwind'], preview_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBakliY-YUWRGDQiz2ppccwfsWZb7yVCNjEM9rfJMHGiGA8HvcLwzEb6KzIwC2sPX8O5rpCyT3B1ga0UG785neT98FUwFF2BuSyT3e79tbNXimT0PxhtSW4QIBhhOiin65O8KG_j-d_lf6X449wrMI3BRVZKWpk2dS_Af3Q6E0l25TlZCcqGw-iQPDvyysDr6zG6WNlCmaSe7y-lh5zIcPcDVpD4AqJekBGLBIicz5OtWv2mLbxo0sJMoOX9C_ppZwsfCTo2Zmrttg' },
                { id: 4, title: 'SaaS Marketing Site', slug: 'saas-site', price: 3900, tags: ['Next.js', 'Tailwind'] },
                { id: 5, title: 'AI Chat Interface', slug: 'ai-chat', price: 5900, tags: ['React', 'Framer'] },
                { id: 6, title: 'E-commerce Storefront', slug: 'ecommerce', price: 12900, tags: ['Shopify', 'Liquid'] },
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
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <header className="mb-16">
          <h1 className="font-bold text-[32px] md:text-[64px] mb-6 text-primary tracking-tighter">Marketplace</h1>
          <p className="font-body text-[14px] md:text-[18px] text-on-surface-variant max-w-2xl">
            Production-ready UI templates and components to accelerate your next release.
          </p>
        </header>

        {/* Filters/Tabs placeholder */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {['All', 'React', 'Vue', 'Next.js', 'Figma', 'Mobile'].map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 font-label text-[12px] uppercase tracking-[0.05em] rounded-md font-medium whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-primary text-on-primary' : 'border border-white/10 text-primary hover:bg-white/5'}`}
                >
                    {filter}
                </button>
            ))}
        </div>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-[400px] glass-panel rounded-2xl"></div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeFilter === 'All' ? products : products.filter(product => product.tags && product.tags.includes(activeFilter))).map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
