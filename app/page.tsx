import Sidebar from './components/Sidebar';
import { FaLaptopCode, FaMicrophone, FaSearch } from 'react-icons/fa';
import { IoVolumeHigh, IoMenu, IoEyeOff, IoAdd, IoChevronDown } from 'react-icons/io5';

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0D1117]">
      <Sidebar />

      <main className="flex-1 text-gray-300 flex flex-col h-screen overflow-y-auto">
        <header className="flex items-center justify-end gap-3 p-4 border-b border-gray-800/60">
          <button className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800">
            <IoEyeOff className="text-xl" />
          </button>
          <button className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800">
            <IoMenu className="text-xl" />
          </button>
        </header>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl text-center flex flex-col items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Search</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              What do you want to know?
            </h1>

            {/* Главная поисковая строка */}
            <div className="w-full bg-[#161B22] border border-gray-800 rounded-2xl p-3 flex flex-col gap-3 shadow-xl mb-6">
              <div className="flex items-center gap-2 px-2 pt-1">
                <span className="text-gray-500 text-sm">Type @ for connectors</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-800/80 hover:bg-gray-700 rounded-xl text-gray-300 transition">
                    <IoAdd className="text-lg" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/80 border border-gray-700/50 rounded-xl hover:bg-gray-700 transition text-sm">
                    <FaSearch className="text-cyan-400 text-xs" />
                    <span>Search</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-cyan-950/60 border border-cyan-800/60 rounded-xl text-cyan-300 transition text-sm font-medium">
                    <FaLaptopCode className="text-cyan-400 text-xs" />
                    <span>Computer</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm px-2 py-1 rounded-lg">
                    <span>Model</span>
                    <IoChevronDown className="text-xs" />
                  </button>
                  <button className="text-gray-400 hover:text-white p-1.5">
                    <FaMicrophone className="text-base" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition">
                    <IoVolumeHigh className="text-base" />
                  </button>
                </div>
              </div>
            </div>

            {/* Две нижние карточки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-4 text-left flex gap-4 transition hover:border-gray-700 cursor-pointer">
                <FaSearch className="text-2xl text-cyan-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">Search anything</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Get fast and accurate answers from the most trusted sources.
                  </p>
                </div>
              </div>

              <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-4 text-left flex gap-4 transition hover:border-gray-700 cursor-pointer">
                <FaLaptopCode className="text-2xl text-cyan-400 mt-1 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white text-sm">Get work done with Computer</h4>
                    <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Hand off your projects to get polished, reliable deliverables around the clock.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}