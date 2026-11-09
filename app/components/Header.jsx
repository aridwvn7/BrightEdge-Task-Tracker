
import { Bell, Menu } from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b
    border-white/60 bg-white/70 px-6 py-5 shadow-sm backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Task Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your tasks and stay productive.
          </p>
        </div>
      </div>

      <button
        className="rounded-full p-3 text-slate-600 transition hover:bg-slate-100"
        aria-label="Notifications"
      >
        <Bell size={20} />
      </button>
    </header>
  );
};

export default Header;
