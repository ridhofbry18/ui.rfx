import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CreditCard, DollarSign, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('rfx_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        const dashboardData = await res.json();
        setData(dashboardData);
      } catch (err) {
        localStorage.removeItem('rfx_admin_token');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('rfx_admin_token');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow pt-24 pb-32 px-4 md:px-16 max-w-[1280px] mx-auto w-full">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary">System Overview</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded text-on-surface-variant hover:text-primary hover:border-white/20 transition-colors font-label text-[12px] uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Disconnect
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-lg border border-white/10">
          <div className="flex items-start justify-between mb-4">
            <span className="font-label text-on-surface-variant text-[12px] uppercase tracking-widest">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-primary/60" />
          </div>
          <span className="text-3xl font-bold text-primary">${((data?.stats?.totalRevenue || 0) / 100).toFixed(0)}</span>
        </div>
        
        <div className="glass-panel p-6 rounded-lg border border-white/10">
          <div className="flex items-start justify-between mb-4">
            <span className="font-label text-on-surface-variant text-[12px] uppercase tracking-widest">Successful TX</span>
            <CreditCard className="w-5 h-5 text-primary/60" />
          </div>
          <span className="text-3xl font-bold text-primary">{data?.stats?.successfulTransactions || 0}</span>
        </div>

        <div className="glass-panel p-6 rounded-lg border border-white/10">
          <div className="flex items-start justify-between mb-4">
            <span className="font-label text-on-surface-variant text-[12px] uppercase tracking-widest">Pending Syncs</span>
            <Activity className="w-5 h-5 text-primary/60" />
          </div>
          <span className="text-3xl font-bold text-primary">{data?.stats?.pendingTransactions || 0}</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-primary mb-6">Recent Transactions</h2>
      <div className="glass-panel rounded-lg overflow-hidden border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-label text-[12px] uppercase tracking-widest text-on-surface-variant">Order Code</th>
              <th className="p-4 font-label text-[12px] uppercase tracking-widest text-on-surface-variant">Product ID</th>
              <th className="p-4 font-label text-[12px] uppercase tracking-widest text-on-surface-variant">Amount</th>
              <th className="p-4 font-label text-[12px] uppercase tracking-widest text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentTransactions?.map((tx: any) => (
              <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-sm text-primary">{tx.code}</td>
                <td className="p-4 text-on-surface-variant text-sm">{tx.product_id}</td>
                <td className="p-4 text-primary font-medium text-sm">${(tx.amount / 100).toFixed(0)}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${
                    tx.status === 'PAID' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!data?.recentTransactions || data.recentTransactions.length === 0) && (
          <div className="p-8 text-center text-on-surface-variant">No recent transactions.</div>
        )}
      </div>

    </div>
  );
}
