import React from "react";
import { Bell, LogOut, ChevronsUpDown, Settings } from "lucide-react";
import { UserMenuProps } from "@/utils/types";
import { useUserData } from "@/utils/api";

const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  toggleMenu,
  menuRef,
  userEmail,
}) => {
  const avatarSrc = "https://github.com/shadcn.png";
  const { data, loading, error } = useUserData(userEmail);

  const user = data?.user ?? null;
  const displayName = user?.name ?? (userEmail ? userEmail.split("@")[0] : "User");
  const displayEmail = user?.email ?? userEmail ?? "";

  return (
    <div className="relative" ref={menuRef}>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p className="text-red-400 text-sm">Failed to load user</p>
      ) : (
        <>
          <button
            onClick={toggleMenu}
            className="w-full flex items-center justify-between text-sm p-2 rounded-md hover:bg-zinc-800 transition"
          >
            <div className="flex items-center gap-2">
              <img
                src={avatarSrc}
                alt="user avatar"
                className="w-8 h-8 rounded-md border border-zinc-700"
              />
              <div className="flex flex-col text-xs leading-tight text-zinc-300">
                <span className="font-medium text-white">{displayName}</span>
                <span className="text-zinc-400">{displayEmail}</span>
              </div>
            </div>
            <ChevronsUpDown size={16} className="text-zinc-400" />
          </button>

          {isOpen && (
            <div className="absolute left-full top-[-110px] ml-2 w-64 z-50 bg-black border border-zinc-700 rounded-md shadow-lg">
              <div className="p-3 border-b border-zinc-700 flex items-center gap-2">
                <img src={avatarSrc} alt="avatar" className="w-8 h-8 rounded-md" />
                <div className="text-sm">
                  <p className="font-semibold text-white">{displayName}</p>
                  <p className="text-zinc-400 text-xs">{displayEmail}</p>
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
        </>
      )}
    </div>
  );
};

export default UserMenu;