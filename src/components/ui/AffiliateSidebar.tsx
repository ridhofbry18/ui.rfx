import { ArrowRight } from 'lucide-react';

const AFFILIATES = [
  { id: 1, name: 'Vercel Hosting', category: 'Deployment', desc: 'The gold standard for React application hosting and edge logic.', url: '#' },
  { id: 2, name: 'Tailwind CSS v4', category: 'Styling', desc: 'Exploring the new CSS-first configuration and performance.', url: '#' },
  { id: 3, name: 'Framer Motion', category: 'Design Tool', desc: 'World-class interaction design and site building.', url: '#' },
  { id: 4, name: 'Geist Typography', category: 'Font', desc: 'Optimal sans-serif for developer experiences.', url: '#' },
];

export default function AffiliateSidebar() {
  return (
    <div className="glass-panel p-8 rounded-lg">
      <h3 className="font-semibold text-[18px] text-primary mb-6 border-b border-white/5 pb-4">Curated Tech Stack</h3>
      <ul className="flex flex-col">
        {AFFILIATES.map(partner => (
          <li key={partner.id} className="border-b border-white/5 py-4 last:border-0 group">
            <a href={partner.url} className="flex justify-between items-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="font-body text-[14px]">{partner.name}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform -rotate-45" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
