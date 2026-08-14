'use client';

import { useState, useEffect } from 'react';
import { 
  Sparkles, Plus, Search, 
  User, Loader2, ChevronDown, Monitor, LayoutGrid, Hexagon, 
  MoreHorizontal, PanelLeft, Mic, AudioLines, FolderGit2,
  Menu, Compass, TrendingUp, Briefcase, Heart, GraduationCap, Gavel, X
} from 'lucide-react';

const IncognitoIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10h20" />
    <path d="M12 2a5 5 0 0 0-5 5v3h10V7a5 5 0 0 0-5-5z" />
    <circle cx="7" cy="16" r="3" />
    <circle cx="17" cy="16" r="3" />
    <path d="M10 16h4" />
  </svg>
);

const SEARCH_GREETINGS = [
  "What do you want to know?",
  "Where knowledge begins...",
  "What's on your mind today?",
  "How can I help you explore?",
  "What are we researching today?"
];

const COMPUTER_GREETINGS = [
  "What should we work on?",
  "What are we building today?",
  "Ready to get things done?",
  "What task shall we tackle?",
  "Let's bring your idea to life."
];

const RIGHT_MENU_ITEMS = [
  { label: 'Discover', icon: Compass },
  { label: 'Finance', icon: TrendingUp },
  { label: 'Personal CFO', icon: Briefcase },
  { label: 'Health', icon: Heart },
  { label: 'Academic', icon: GraduationCap },
  { label: 'Patents', icon: Gavel },
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  
  const [mode, setMode] = useState<'search' | 'computer'>('search');
  const [isIncognito, setIsIncognito] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  const [greetingIndex, setGreetingIndex] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Computer');
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isSessionsOpen, setIsSessionsOpen] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SEARCH_GREETINGS.length);
    setGreetingIndex(randomIndex);
    
    // Авто-открытие сайдбара только на больших экранах
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode, isIncognito }),
      });
      const data = await res.json();
      setResponse(data.result || 'Ошибка получения ответа от Cerebro.');
    } catch (error) {
      setResponse('Произошла ошибка при подключении к серверу Cerebro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#141414', color: '#E3E5E5' }} className="flex w-full h-screen font-sans overflow-hidden select-none relative">
      
      {/* Затемнение фона для мобильного сайдбара */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* 1. Левый Сайдбар (Overlay на мобилках, сдвиг на десктопе) */}
      <aside 
        style={{ backgroundColor: '#0F1010', borderColor: '#222424' }} 
        className={`fixed md:relative inset-y-0 left-0 h-full flex flex-col justify-between flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-r overflow-hidden z-50 ${
          isSidebarOpen 
            ? 'w-[250px] md:w-[230px] p-3 opacity-100 translate-x-0' 
            : 'w-0 p-0 opacity-0 -translate-x-full md:translate-x-0 border-transparent pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4 min-w-[220px] md:min-w-[206px]">
          
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <div style={{ backgroundColor: 'rgba(32, 184, 205, 0.15)', borderColor: 'rgba(32, 184, 205, 0.4)' }} className="w-5 h-5 rounded-md border flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#20B8CD]" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-white md:hidden">CEREBRO</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 hover:bg-[#202222] rounded-lg text-gray-400 hover:text-white transition-colors duration-300"
              title="Collapse sidebar"
            >
              <X className="w-4 h-4 md:hidden" />
              <PanelLeft className="hidden md:block w-3.5 h-3.5" />
            </button>
          </div>

          <nav className="flex flex-col gap-0.5 mt-1">
            <button 
              onClick={() => { setResponse(''); setPrompt(''); setActiveTab('New'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
              className="flex items-center gap-2.5 px-2.5 py-2 md:py-1.5 text-xs text-[#E3E5E5] hover:bg-[#202222] rounded-lg transition-all duration-300 font-medium text-left group"
            >
              <div className="w-5 h-5 rounded-full bg-[#202222] group-hover:bg-[#2A2C2C] flex items-center justify-center border border-[#2E3030] transition-colors duration-300">
                <Plus className="w-3 h-3 text-white" />
              </div>
              <span>New</span>
            </button>

            <button 
              onClick={() => { setActiveTab('Computer'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
              className={`flex items-center gap-2.5 px-2.5 py-2 md:py-1.5 text-xs rounded-lg transition-all duration-300 font-medium text-left ${activeTab === 'Computer' ? 'bg-[#202222] text-white' : 'text-[#8E9393] hover:text-white hover:bg-[#202222]/50'}`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Computer</span>
            </button>

            <button 
              onClick={() => { setActiveTab('Artifacts'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
              className={`flex items-center gap-2.5 px-2.5 py-2 md:py-1.5 text-xs rounded-lg transition-all duration-300 font-medium text-left ${activeTab === 'Artifacts' ? 'bg-[#202222] text-white' : 'text-[#8E9393] hover:text-white hover:bg-[#202222]/50'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Artifacts</span>
            </button>

            <button 
              onClick={() => { setActiveTab('Customize'); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
              className={`flex items-center gap-2.5 px-2.5 py-2 md:py-1.5 text-xs rounded-lg transition-all duration-300 font-medium text-left ${activeTab === 'Customize' ? 'bg-[#202222] text-white' : 'text-[#8E9393] hover:text-white hover:bg-[#202222]/50'}`}
            >
              <Hexagon className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          </nav>

          <div className="flex flex-col gap-2 pt-3 border-t border-[#2E3030]/60">
            <div className="flex flex-col px-1">
              <div 
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="flex items-center justify-between p-1 rounded-md text-[11px] font-semibold text-[#8E9393] cursor-pointer hover:bg-[#202222] hover:text-white transition-all duration-300 group"
              >
                <span>Projects</span>
                <div className="flex items-center gap-1">
                  <MoreHorizontal className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white" />
                  <ChevronDown className={`w-3 h-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isProjectsOpen ? 'rotate-0' : '-rotate-90'}`} />
                </div>
              </div>

              <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isProjectsOpen ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden px-1.5">
                  <span className="text-[11px] text-[#5e6262] py-0.5 block">No projects</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col px-1">
              <div 
                onClick={() => setIsSessionsOpen(!isSessionsOpen)}
                className="flex items-center justify-between p-1 rounded-md text-[11px] font-semibold text-[#8E9393] cursor-pointer hover:bg-[#202222] hover:text-white transition-all duration-300"
              >
                <span>Sessions</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSessionsOpen ? 'rotate-0' : '-rotate-90'}`} />
              </div>

              <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSessionsOpen ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden px-1.5">
                  <span className="text-[11px] text-[#5e6262] py-0.5 block">No recent sessions</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{ borderColor: '#2E3030' }} className="pt-2 border-t min-w-[220px] md:min-w-[206px]">
          <button className="flex items-center gap-2.5 w-full px-2.5 py-1.5 text-xs hover:bg-[#202222] rounded-lg transition-colors duration-300 text-[#8E9393] hover:text-white">
            <div style={{ backgroundColor: '#2E3030' }} className="w-6 h-6 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-xs">Sign In</span>
          </button>
        </div>
      </aside>

      {/* 2. Правые верхние кнопки */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-30 flex items-center gap-1.5 md:gap-2">
        <button
          onClick={() => setIsIncognito(!isIncognito)}
          className={`p-2 rounded-xl transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer ${
            isIncognito 
              ? 'bg-[#E3E5E5] text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105' 
              : 'bg-[#1F2020] text-gray-400 hover:text-white border border-[#2E3030] hover:border-[#404343]'
          }`}
          title="Toggle Incognito Mode"
        >
          <IncognitoIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsRightMenuOpen(!isRightMenuOpen)}
          className={`p-2 rounded-xl bg-[#1F2020] border border-[#2E3030] text-gray-400 hover:text-white hover:border-[#404343] transition-all duration-300 flex items-center justify-center ${
            isRightMenuOpen ? 'bg-[#2A2C2C] text-white border-gray-500 shadow-md' : ''
          }`}
          title="Open Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Выпадающее меню */}
        <div 
          className={`absolute top-12 right-0 w-48 bg-[#1A1B1B]/95 backdrop-blur-md border border-[#2E3030] rounded-2xl p-1.5 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-right z-50 ${
            isRightMenuOpen 
              ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' 
              : 'opacity-0 scale-95 pointer-events-none -translate-y-2'
          }`}
        >
          {RIGHT_MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => setIsRightMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#D1D5D5] hover:text-white hover:bg-[#262828] rounded-xl transition-all duration-200 text-left"
              >
                <Icon className="w-4 h-4 text-[#8E9393]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Основная область */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative" onClick={() => isRightMenuOpen && setIsRightMenuOpen(false)}>
        
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className={`absolute top-3 left-3 md:top-4 md:left-4 z-30 p-2 rounded-xl bg-[#1F2020] border border-[#2E3030] text-gray-400 hover:text-white hover:border-[#20B8CD]/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md ${
            isSidebarOpen ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center max-w-[750px] w-full mx-auto px-3 sm:px-4 py-6 mt-6 md:mt-0">
          
          {/* Заголовок */}
          {!response && !isLoading && (
            <div className="w-full text-left mb-4 md:mb-6 relative min-h-[50px] md:min-h-[60px] pl-2 md:pl-3">
              
              <div className={`flex flex-col gap-0.5 md:gap-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] absolute top-0 left-2 md:left-3 w-full ${
                isIncognito ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}>
                <span className="text-[11px] md:text-[12px] font-normal text-[#8E9393]">
                  {mode === 'search' ? 'Search' : 'Computer'}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-[26px] font-normal tracking-tight text-[#E3E5E5] pr-16 md:pr-0">
                  {mode === 'search' ? SEARCH_GREETINGS[greetingIndex] : COMPUTER_GREETINGS[greetingIndex]}
                </h1>
              </div>

              <div className={`flex flex-col gap-0.5 md:gap-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] absolute top-0 left-2 md:left-3 w-full ${
                isIncognito ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <span className="text-[11px] md:text-[12px] font-normal text-[#20B8CD]">
                  Incognito
                </span>
                <h1 className="text-xl sm:text-2xl md:text-[26px] font-normal tracking-tight text-[#E3E5E5]">
                  You’re incognito
                </h1>
              </div>

            </div>
          )}

          {/* Контейнер Поиска */}
          <div className="relative w-full rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            
            <div style={{ backgroundColor: '#1F2020' }} className="absolute inset-0 rounded-2xl" />

            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mode === 'computer' 
                ? 'border border-[#20B8CD]/40 shadow-[0_0_40px_rgba(32,184,205,0.15)]' 
                : 'border border-[#2E3030] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            } ${isIncognito ? 'opacity-0' : 'opacity-100'}`} />

            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-2 border-dashed border-[#20B8CD]/50 shadow-[0_0_35px_rgba(32,184,205,0.15)] ${
              isIncognito ? 'opacity-100' : 'opacity-0'
            }`} />

            <div className="relative z-10 p-3 md:p-4 flex flex-col">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Type @ for connectors"
                rows={2}
                className="w-full bg-transparent text-[#E3E5E5] placeholder-[#6E7373] outline-none resize-none text-sm md:text-base leading-relaxed border-none mb-2"
              />

              {/* Нижние кнопки (Адаптированные для мобилок) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                
                <div className="flex items-center gap-1.5 md:gap-2">
                  <button type="button" className="p-1 text-[#8E9393] hover:text-white transition-colors duration-300 rounded-md hover:bg-[#2A2C2C]">
                    <Plus className="w-4 h-4" />
                  </button>

                  <div style={{ backgroundColor: '#141414' }} className="flex items-center p-0.5 rounded-lg border border-[#2E3030]">
                    <button
                      type="button"
                      onClick={() => setMode('search')}
                      className={`flex items-center gap-1 px-2.5 md:px-3 py-1 rounded-md text-[10px] md:text-[11px] font-medium transition-all duration-300 ${
                        mode === 'search' ? 'bg-[#2A2C2C] text-white shadow-sm' : 'text-[#8E9393] hover:text-white'
                      }`}
                    >
                      <Search className="w-3 h-3" />
                      <span>Search</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode('computer')}
                      className={`flex items-center gap-1 px-2.5 md:px-3 py-1 rounded-md text-[10px] md:text-[11px] font-medium transition-all duration-300 ${
                        mode === 'computer' ? 'bg-[#2A2C2C] text-white shadow-sm' : 'text-[#8E9393] hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Computer</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 ml-auto">
                  <button type="button" className="hidden sm:flex items-center gap-1 text-[11px] text-[#8E9393] hover:text-white font-medium transition-colors duration-300">
                    <span>{mode === 'search' ? 'Model' : 'Claude Opus 5'}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <button type="button" className="text-[#8E9393] hover:text-white transition-colors duration-300 p-1">
                    <Mic className="w-3.5 h-3.5" />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => handleSubmit()}
                    disabled={isLoading || !prompt.trim()}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#E3E5E5] hover:bg-white text-black flex items-center justify-center transition-all duration-300 disabled:opacity-30 hover:scale-105 active:scale-95"
                  >
                    {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-black" /> : <AudioLines className="w-3.5 h-3.5 text-black" />}
                  </button>
                </div>

              </div>

              {/* Блок "Work in a project" */}
              <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mode === 'computer' ? 'grid-rows-[1fr] opacity-100 pt-2 mt-2 border-t border-[#2E3030]/60' : 'grid-rows-[0fr] opacity-0 pt-0 mt-0 border-t border-transparent'
              }`}>
                <div className="overflow-hidden">
                  <button type="button" className="flex items-center gap-1.5 text-[11px] text-[#8E9393] hover:text-white font-medium transition-colors duration-300 px-0.5 py-0.5">
                    <FolderGit2 className="w-3 h-3 text-[#20B8CD]" />
                    <span>Work in a project</span>
                    <ChevronDown className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Карточки снизу */}
          {!response && !isLoading && (
            <div className="w-full mt-3 md:mt-4 min-h-[80px] relative">
              
              <div className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] absolute inset-0 flex items-center justify-center ${
                isIncognito ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}>
                <p className="text-[#8E9393] text-[11px] md:text-xs text-center py-4 tracking-wide px-2">
                  Sessions you create won't save to your history and expire after 24 hours
                </p>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                !isIncognito ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
              }`}>
                
                <div 
                  onClick={() => setMode('search')}
                  className={`relative overflow-hidden p-3.5 md:p-4 rounded-xl border cursor-pointer transition-all duration-500 hover:scale-[1.01] ${
                    mode === 'search' ? 'border-[#20B8CD]/50 shadow-lg' : 'border-[#2E3030] hover:border-[#404343]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#0D5C68] to-[#0A4852] transition-opacity duration-500 ${mode === 'search' ? 'opacity-100' : 'opacity-0'}`} />
                  <div className={`absolute inset-0 bg-[#191A1A] transition-opacity duration-500 ${mode === 'search' ? 'opacity-0' : 'opacity-100'}`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-white mb-1">
                      <Search className="w-4 h-4 text-white" />
                      <span>Search anything</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed transition-colors duration-500 ${mode === 'search' ? 'text-[#C2ECEE]' : 'text-[#8E9393]'}`}>
                      Get fast and accurate answers from the most trusted sources.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setMode('computer')}
                  className={`relative overflow-hidden p-3.5 md:p-4 rounded-xl border cursor-pointer transition-all duration-500 hover:scale-[1.01] ${
                    mode === 'computer' ? 'border-[#20B8CD]/60 shadow-lg ring-1 ring-[#20B8CD]/30' : 'border-[#2E3030] hover:border-[#404343]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#09353C] to-[#0D2428] transition-opacity duration-500 ${mode === 'computer' ? 'opacity-100' : 'opacity-0'}`} />
                  <div className={`absolute inset-0 bg-[#191A1A] transition-opacity duration-500 ${mode === 'computer' ? 'opacity-0' : 'opacity-100'}`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs md:text-sm font-medium text-white mb-1">
                      <div className="flex items-center gap-1.5">
                        <Monitor className="w-4 h-4 text-[#20B8CD]" />
                        <span>Get work done with Computer</span>
                      </div>
                      <span className="text-[9px] font-semibold tracking-wider text-[#20B8CD] bg-[#20B8CD]/15 border border-[#20B8CD]/30 px-1.5 py-0.2 rounded">NEW</span>
                    </div>
                    <p className="text-[11px] text-[#8E9393] leading-relaxed">
                      Hand off your projects to get polished, reliable deliverables around the clock.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Ответ Cerebro */}
          {(isLoading || response) && (
            <div style={{ backgroundColor: '#1F2020', borderColor: '#2E3030' }} className="w-full mt-4 md:mt-6 p-4 md:p-5 border rounded-xl shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div style={{ borderColor: '#2E3030' }} className="flex items-center gap-2 mb-3 pb-2.5 border-b text-[#8E9393] text-xs uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#20B8CD]" /> Cerebro Answer {isIncognito && '(Incognito)'}
              </div>

              {isLoading ? (
                <div className="flex items-center gap-2.5 text-[#8E9393] py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-[#20B8CD]" />
                  <span className="text-xs font-medium animate-pulse">Cerebro ищет и анализирует информацию...</span>
                </div>
              ) : (
                <div className="text-white text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans transition-opacity duration-300">
                  {response}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}