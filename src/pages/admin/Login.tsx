import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      localStorage.setItem('rfx_admin_token', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 md:px-16 py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      
        <div className="w-full max-w-md glass-panel p-8 sm:p-12 rounded-lg relative z-10">
            <div className="mb-10 text-center">
                <span className="text-2xl md:text-3xl font-bold tracking-tighter text-primary">
                    RFX<span className="text-white/50">UI</span>
                </span>
                <h1 className="text-xl font-bold mt-6 text-primary">System Access</h1>
                <p className="font-body text-[14px] text-on-surface-variant mt-2">Enter your credentials to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 font-body text-[12px] p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <label className="font-label text-[12px] uppercase tracking-[0.05em] text-white/50">Email Address</label>
                    <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface-container border border-white/10 rounded-lg py-3 pl-10 pr-4 text-primary font-body text-[14px] focus:outline-none focus:border-white/30 transition-all font-medium"
                            placeholder="admin@rfx.ui"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="font-label text-[12px] uppercase tracking-[0.05em] text-white/50">Password</label>
                        <a href="#" className="font-label text-[12px] text-white/50 hover:text-primary transition-colors">Reset?</a>
                    </div>
                    <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface-container border border-white/10 rounded-lg py-3 pl-10 pr-4 text-primary font-body text-[14px] focus:outline-none focus:border-white/30 transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary text-on-primary font-label text-[12px] tracking-[0.05em] uppercase font-bold py-4 rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 mt-4"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                    ) : (
                        <>Authenticate <ArrowRight className="w-4 h-4" /></>
                    )}
                </button>
            </form>
        </div>
    </div>
  );
}
