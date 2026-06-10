import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Check, Info } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      
      setOrderCode(data.orderCode);
      
      // Auto-copy UX
      await navigator.clipboard.writeText(data.orderCode);
      setCopied(true);
      
      // Give users a moment to read before opening Saweria
      setTimeout(() => {
        window.open('https://saweria.co/RfxUI', '_blank'); // Replace with actual Saweria link
      }, 2000);
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin"></div></div>;
  if (error || !product) return <div className="min-h-[60vh] flex items-center justify-center"><h1 className="text-2xl text-primary font-bold">Product not found.</h1></div>;

  return (
    <div className="flex-grow pt-24 pb-32 px-4 md:px-16 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Preview Image */}
        <div className="glass-panel aspect-[4/3] rounded-lg overflow-hidden border border-white/10 relative">
          <img 
            src={product.preview_url || 'https://res.cloudinary.com/demo/image/upload/v1683120612/docs_uploading_example/laptop_coffee.jpg'} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details & Checkout */}
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-8 text-on-surface-variant font-label text-[14px]">
                <span className="text-[20px] font-bold text-primary">${(product.price / 100).toFixed(0)}</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>Immediate Access</span>
            </div>

            <p className="text-on-surface-variant font-body mb-8 leading-relaxed">
                {product.description || 'Premium developer template with optimized build configuration and glassmorphism styling elements.'}
            </p>

            <div className="space-y-4 mb-8">
                {product.tags?.map((tag: string) => (
                    <span key={tag} className="inline-block px-3 py-1 font-label text-[12px] uppercase tracking-widest text-on-surface-variant border border-white/10 rounded mr-2">
                        {tag}
                    </span>
                ))}
            </div>

            {orderCode ? (
               <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <Check className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-primary font-bold text-xl mb-2">Order Code Generated</h3>
                    <p className="text-on-surface-variant text-sm mb-4">We've copied your code to the clipboard.</p>
                    <div className="bg-black/40 px-6 py-3 rounded text-primary font-mono text-xl tracking-widest mb-4">
                        {orderCode}
                    </div>
                    <p className="text-primary/70 text-[12px] uppercase tracking-widest">
                        Paste this code in the Saweria message box!
                    </p>
               </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-4 items-start">
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-primary font-bold text-[14px] mb-1">0% Typo Rate Checkout</h4>
                            <p className="text-on-surface-variant text-[12px] leading-relaxed">
                                Clicking purchase will auto-copy your unique access code and open Saweria. Paste the code in the support message.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        disabled={checkoutLoading}
                        className="w-full bg-primary text-on-primary font-bold font-label text-[14px] tracking-widest uppercase py-4 rounded hover:bg-white/90 transition-all flex justify-center items-center gap-2"
                    >
                        {checkoutLoading ? (
                            <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                        ) : (
                            <>Secure Checkout</>
                        )}
                    </button>
                    <div className="flex items-center justify-center gap-2 opacity-50">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="font-label text-[10px] uppercase tracking-widest">SSL Encrypted Transaction</span>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
