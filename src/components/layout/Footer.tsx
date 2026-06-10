export default function Footer() {
  return (
    <footer className="bg-background w-full border-t border-white/5 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-12 max-w-[1280px] mx-auto gap-8">
        <div className="font-bold text-2xl md:text-3xl text-primary tracking-tighter">RFX UI</div>
        <div className="flex gap-6">
          <a className="text-on-surface-variant font-label text-[12px] hover:text-primary transition-colors opacity-80 hover:opacity-100 uppercase tracking-[0.05em]" href="#">Privacy</a>
          <a className="text-on-surface-variant font-label text-[12px] hover:text-primary transition-colors opacity-80 hover:opacity-100 uppercase tracking-[0.05em]" href="#">Terms</a>
          <a className="text-on-surface-variant font-label text-[12px] hover:text-primary transition-colors opacity-80 hover:opacity-100 uppercase tracking-[0.05em]" href="#">Docs</a>
          <a className="text-on-surface-variant font-label text-[12px] hover:text-primary transition-colors opacity-80 hover:opacity-100 uppercase tracking-[0.05em]" href="#">Support</a>
        </div>
        <div className="font-body text-[11px] text-on-surface-variant">© {new Date().getFullYear()} RFX UI. Built for developers.</div>
      </div>
    </footer>
  );
}
