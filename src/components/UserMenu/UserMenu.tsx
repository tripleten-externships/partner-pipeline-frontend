import React, { useRef, useState } from 'react';
import { Bell, LogOut, ChevronsUpDown, Settings } from 'lucide-react';

//TODO: Replace with auth context, useRefs for avatar and name, clicking outside of box should close

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const avatarSrc = "https://github.com/shadcn.png"; // later replace with prop or auth context

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between text-sm text-left p-2 rounded-md hover:bg-zinc-800 transition group"
      >
        <div className="flex items-center gap-2">
          <img
            src={avatarSrc}
            alt="user avatar"
            className="w-8 h-8 rounded-md border border-zinc-700"
          />
          <div className="flex flex-col text-xs leading-tight text-zinc-300">
            <span className="font-medium text-white">shadcn</span>
            <span className="text-zinc-400">m@example.com</span>
          </div>
        </div>
        <ChevronsUpDown size={16} className="text-zinc-400" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-full top-[calc(100%-10rem)] ml-2 w-64 z-50 bg-black border border-zinc-700 rounded-md shadow-lg overflow-hidden">
          <div className="p-3 border-b border-zinc-700">
            <div className="flex items-center gap-2">
              <img src={avatarSrc} alt="avatar" className="w-8 h-8 rounded-md" />
              <div className="text-sm">
                <p className="font-semibold text-white">shadcn</p>
                <p className="text-zinc-400 text-xs">m@example.com</p>
              </div>
            </div>
          </div>

          <ul className="text-sm text-white">
            <li className="px-4 py-2 hover:bg-zinc-800 flex items-center gap-2 cursor-pointer">
              <Settings size={16} /> Account
            </li>
            <li className="px-4 py-2 hover:bg-zinc-800 flex items-center gap-2 cursor-pointer">
              <Bell size={16} /> Notifications
            </li>
            <li className="px-4 py-2 hover:bg-zinc-800 flex items-center gap-2 cursor-pointer border-t border-zinc-700">
              <LogOut size={16} /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
