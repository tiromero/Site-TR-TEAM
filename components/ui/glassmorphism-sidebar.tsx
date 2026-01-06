
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Dumbbell, 
  CreditCard, 
  HelpCircle, 
  Star,
  Instagram,
  MessageCircle
} from 'lucide-react';

export const navItems = [
    { id: 'inicio', label: 'Início', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'sobre', label: 'Sobre Mim', icon: <User className="w-5 h-5" /> },
    { id: 'metodo', label: 'Consultoria', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'planos', label: 'Pacotes', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'faq', label: 'Dúvidas', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'resultados', label: 'Evoluções', icon: <Star className="w-5 h-5" /> },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const GlassSidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-black/40 backdrop-blur-2xl border-r border-white/5 z-[100] transition-all duration-500">
        {/* Header / Logo */}
        <div className="h-24 flex items-center px-8 border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
                  <span className="font-heading font-black text-xl text-white">TR</span>
                </div>
                <span className="text-xl font-heading font-black tracking-tighter text-white">TEAM</span>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 ml-2">Menu Principal</p>
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                      ${activeSection === item.id 
                        ? 'bg-purple-600/20 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                >
                    <span className={`transition-transform duration-300 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    {activeSection === item.id && (
                      <div className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                    )}
                </button>
            ))}

            <div className="pt-8 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 ml-2">Redes Sociais</p>
              <a href="https://instagram.com" target="_blank" className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="font-bold text-sm">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold text-sm">WhatsApp</span>
              </a>
            </div>
        </nav>

        {/* Footer / Profile */}
        <div className="p-6 border-t border-white/5 bg-black/20">
            <div className="flex items-center gap-4 p-2">
                <div className="relative">
                  <img 
                    src="/tiromero-perfil.jpg" 
                    alt="Tiromero" 
                    className="w-11 h-11 rounded-xl border border-white/10 object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=150";
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
                </div>
                <div className="overflow-hidden">
                    <p className="font-black text-sm text-white truncate">Tiromero</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Membro Premium</p>
                </div>
            </div>
        </div>
    </aside>
);
