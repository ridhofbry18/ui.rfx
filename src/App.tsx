import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Directory from './pages/Directory';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductDetails from './pages/ProductDetails';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="directory" element={<Directory />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="directory/:slug" element={<div className="flex-grow pt-32 pb-24 px-4 md:px-16 max-w-[1280px] mx-auto text-center flex flex-col justify-center items-center min-h-[60vh]"><h1 className="text-3xl md:text-5xl text-primary font-bold tracking-tight">Article Details</h1><p className="text-on-surface-variant mt-4 font-body max-w-lg">Full editorial content is reserved for premium subscribers.</p></div>} />
          <Route path="admin/login" element={<Login />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

