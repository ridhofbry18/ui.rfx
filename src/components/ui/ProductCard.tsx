import { ShoppingCart, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ title, slug, price, preview_url, tags = [] }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  // Functional Cloudinary placeholder fallback with a tech abstract image
  const cloudinaryFallbackUrl = "https://res.cloudinary.com/demo/image/upload/v1683120612/docs_uploading_example/laptop_coffee.jpg";
  const imageUrl = preview_url || cloudinaryFallbackUrl;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };

  const handleCardClick = () => {
     navigate(`/product/${slug}`);
  };

  return (
    <div 
        onClick={handleCardClick}
        className="glass-panel rounded-lg overflow-hidden group flex flex-col cursor-pointer transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-surface-container relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
            <Link to={`/product/${slug}`} onClick={(e) => e.stopPropagation()} className="hover:opacity-80 transition-opacity">
                <h3 className="font-section-title text-[18px] font-semibold tracking-tight text-primary">
                    {title}
                </h3>
            </Link>
            <span className="font-label text-[12px] uppercase tracking-[0.05em] font-medium text-on-surface-variant">
                ${(price / 100).toFixed(0)}
            </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag: string) => (
             <span key={tag} className="font-label text-[12px] uppercase tracking-[0.05em] font-medium text-on-surface-variant px-2 py-1 border border-white/10 rounded">
                 {tag}
             </span>
          ))}
        </div>
        
        <div className="mt-auto">
            <button
              onClick={handleBuyNow}
              disabled={isAdding || added}
              className={`w-full py-3 rounded flex items-center justify-center gap-2 transition-all ${
                added 
                    ? 'bg-primary/10 border border-primary/20 text-primary'
                    : 'glass-panel hover:bg-white/5 text-primary'
              }`}
            >
                {isAdding ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : added ? (
                    <>
                        <span className="font-label text-[12px] uppercase tracking-[0.05em] font-medium text-primary">Placed in Cart</span>
                        <Check className="w-4 h-4 text-primary" />
                    </>
                ) : (
                    <>
                        <span className="font-label text-[12px] uppercase tracking-[0.05em] font-medium text-primary">Buy Now</span>
                        <ShoppingCart className="w-4 h-4 text-primary" />
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
