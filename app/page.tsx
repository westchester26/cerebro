'use client';
import { useState } from 'react';
import { 
  Sparkles, Plus, Search, ArrowRight, 
  FileText, Settings, Computer as ComputerIcon, 
  EyeOff, Menu, Globe, DollarSign, Briefcase, 
  Heart, GraduationCap, Award, Mic, Volume2, ChevronDown
} from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [activeNav, setActiveNav] = useState('Computer');
  const [isIncognito, setIsIncognito] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navItems = [
    { name: 'Computer', icon: ComputerIcon },
    { name: 'Artifacts', icon: FileText },
    { name: 'Customize', icon: Settings },
  ];

  const categories = [
    { name: 'Discover', icon: Globe },
    { name: 'Finance', icon: DollarSign },
    { name: 'Personal CFO', icon: Briefcase },
    { name: 'Health', icon: Heart },
    { name: 'Academic', icon: GraduationCap },
    { name: 'Patents', icon: Award },
  ];

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ prompt }) 
      });
      const data = await res.json();
      setResponse(data.result || 'Ошибка получения ответа');
    } catch { 
      setResponse('Ошибка сервера'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className={`flex w-full h-screen font-sans select-none transition-colors duration-300 ${isIncognito ? 'bg-[#0b0c0c] text-gray-200' : 'bg-[#151616] text-[#E3E5E5]'}`}>
      
      {/* Левая боковая панель */}
      <aside className="w-[240px] bg-[#111212] border-r border-[#242626] p-3 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#20B8CD]/20 border border-[#20B8CD]/40 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#20B8CD]" />
              </div>
            </div>
            <div className="p-1.5 rounded-lg hover:bg-[#202222] text-gray-400 cursor-pointer">
              <Menu className="w-4 h-4" />
            </div>
          </div>

          <button
            onClick={() => { setResponse(''); setPrompt(''); setActiveNav('New'); }}
            className="w-full px-3 py-2 bg-[#1b1c1c] border border-[#2a2c2c] hover:border-[#20B8CD]/40 rounded-xl text-sm font-medium flex items-center gap-2 text-white transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-gray-400" /> New
          </button>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#20B8CD]/15 text-[#20B8CD] border border-[#20B8CD]/30' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1c1c]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="px-3 text-xs text-gray-500">
            <p className="mb-1 uppercase tracking-wider font-semibold">Projects</p>
            <p className="text-gray-400 py-0.5">No projects</p>
          </div>
          <div className="px-3 text-xs text-gray-500 border-t border-[#242626] pt-3">
            <p className="mb-1 uppercase tracking-wider font-semibold">Sessions</p>
            <p className="text-gray-400 py-0.5">No recent sessions</p>
          </div>

          <div className="pt-2 border-t border-[#242626]">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-[#1a1c1c] transition-colors">
              <span className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-teal-800 text-teal-200 flex items-center justify-center text-xs font-bold">👤</div>
                Sign In
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* Основная часть интерфейса */}
      <main className="flex-1 flex flex-col relative">
        
        {/* Кнопка инкогнито и меню категорий сверху справа */}
        <header className="absolute top-4 right-6 flex items-center gap-2.5 z-30">
          <button
            onClick={() => setIsIncognito(!isIncognito)}
            className={`p-2.5 rounded-xl border transition-all ${
              isIncognito 
                ? 'bg-purple-900/40 border-purple-500 text-purple-300 shadow-lg' 
                : 'bg-[#1b1c1c] border-[#2a2c2c] text-gray-300 hover:bg-[#222424] hover:text-white'
            }`}
            title="Режим инкогнито"
          >
            <EyeOff className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 bg-[#1b1c1c] border border-[#2a2c2c] hover:bg-[#222424] text-gray-300 hover:text-white rounded-xl transition-all"
              title="Категории"
            >
              <Menu className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#181919] border border-[#2a2c2c] rounded-2xl shadow-2xl py-2 z-50">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        isSelected 
                          ? 'bg-[#20B8CD]/15 text-[#20B8CD] font-medium' 
                          : 'text-gray-300 hover:bg-[#202222] hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        {/* Центр экрана */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full">
          
          <div className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Search</span>
            <h1 className="text-3xl font-medium text-white mt-1 tracking-tight">What do you want to know?</h1>
            {selectedCategory && (
              <span className="inline-block mt-2 px-3 py-1 bg-[#20B8CD]/10 border border-[#20B8CD]/30 text-[#20B8CD] text-xs rounded-full">
                Выбрано: {selectedCategory}
              </span>
            )}
          </div>

          {/* Поле ввода запроса */}
          <div className="w-full bg-[#1b1c1c] border border-[#2a2c2c] rounded-2xl p-3.5 shadow-xl focus-within:border-[#20B8CD]/50 transition-all">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type @ for connectors"
              rows={2}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none text-sm"
            />
            
            <div className="flex justify-between items-center pt-2.5 border-t border-[#2a2c2c]/60 mt-2">
              <div className="flex items-center gap-2">
                <button className="p-1.5 bg-[#242626] hover:bg-[#2d2f2f] rounded-lg text-gray-300 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <div className="px-3 py-1 bg-[#242626] text-xs text-gray-300 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#2d2f2f]">
                  <Search className="w-3 h-3 text-[#20B8CD]" /> Search
                </div>
                <div className="px-3 py-1 bg-[#242626] text-xs text-gray-300 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#2d2f2f]">
                  <ComputerIcon className="w-3 h-3 text-[#20B8CD]" /> {activeNav}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 flex items-center gap-1 cursor-pointer hover:text-white">
                  Model <ChevronDown className="w-3 h-3" />
                </span>
                <Mic className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="p-1.5 bg-[#20B8CD] hover:bg-[#1da6b9] text-black rounded-full transition-all disabled:opacity-50"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Карточки подсказок или ответ */}
          {response ? (
            <div className="w-full mt-6 p-4 bg-[#1b1c1c] border border-[#2a2c2c] rounded-2xl text-white text-sm whitespace-pre-wrap shadow-lg">
              {response}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 w-full mt-5">
              <div className="p-3.5 bg-[#171818] border border-[#242626] hover:border-[#20B8CD]/40 rounded-2xl cursor-pointer transition-all group">
                <div className="flex items-center gap-2 text-[#20B8CD] font-medium text-xs mb-1">
                  <Search className="w-3.5 h-3.5" /> Search anything
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">Get fast and accurate answers from the most trusted sources.</p>
              </div>
              <div className="p-3.5 bg-[#171818] border border-[#242626] hover:border-[#20B8CD]/40 rounded-2xl cursor-pointer transition-all group">
                <div className="flex items-center gap-2 text-[#20B8CD] font-medium text-xs mb-1">
                  <ComputerIcon className="w-3.5 h-3.5" /> Get work done with Computer <span className="text-[9px] px-1 py-0.2 bg-[#20B8CD]/20 text-[#20B8CD] rounded font-bold">NEW</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">Hand off your projects to get polished, reliable deliverables around the clock.</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
