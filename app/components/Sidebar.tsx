import { FaLaptopCode, FaCube, FaPaintBrush, FaRobot } from 'react-icons/fa';
import { IoAdd, IoMenu, IoChevronForward } from 'react-icons/io5';

const Sidebar = () => {
  const navItems = [
    { name: 'Computer', icon: FaLaptopCode, href: '#computer' },
    { name: 'Artifacts', icon: FaCube, href: '#artifacts' },
    { name: 'Customize', icon: FaPaintBrush, href: '#customize' },
  ];

  return (
    <aside className="w-64 border-r border-gray-800 h-screen flex flex-col justify-between text-gray-300 bg-[#0D1117] shrink-0">
      <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <FaRobot className="text-2xl text-cyan-400" />
          </div>
          <button className="text-gray-500 hover:text-white">
            <IoMenu className="text-2xl" />
          </button>
        </div>

        <div className="p-4">
          <button className="w-full flex items-center justify-start gap-2 px-4 py-2 bg-[#161B22] border border-gray-800 rounded-lg hover:bg-gray-800 transition">
            <IoAdd className="text-xl" />
            <span className="font-medium text-white">New</span>
          </button>
        </div>

        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                item.name === 'Computer'
                  ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 font-medium'
                  : 'hover:bg-gray-800/50 text-gray-400'
              }`}
            >
              <item.icon className="text-xl" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Projects</h3>
            <p className="text-sm text-gray-600 mt-2">No projects</p>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Sessions</h3>
            <p className="text-sm text-gray-600 mt-2">No recent sessions</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-gray-800/50 rounded-lg transition">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-sm">
              К
            </div>
            <span className="font-medium text-white text-sm">Sign In</span>
          </div>
          <IoChevronForward className="text-lg text-gray-500" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;