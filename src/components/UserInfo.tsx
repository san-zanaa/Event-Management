"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, CirclePlus, Settings, CircleCheck, LogOut } from 'lucide-react'
import Link from 'next/link';
const UserInfo = () => {
    const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        alert(error.message || "Logout failed!");
        return;
      }
      setIsOpen(false);
      alert("Signed out successfully!");
      router.push("/");
      router.refresh();

    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong!");
    }
  };

  if (isPending) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative">

      {user ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={user.image || ""}
              alt={user.name || "User"}/>
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <button
            onClick={handleSignOut}
            className="flex gap-2 bg-[#e12020] text-white py-2 px-4 rounded-md hover:bg-[#f03636] cursor-pointer">
            <LogOut size={20} />
            Log Out
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[12px] text-gray-500 cursor-pointer">⮟</button>

          {isOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:bg-[#353841] dark:border-gray-500">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{user.name}</h2>
              <p className="mb-8 text-gray-500">{user.email}</p>

              <Link
                href="/create-event"
                onClick={() => setIsOpen(false)}
                className="mb-3 block text-sm text-gray-700 flex gap-2 dark:text-gray-300">
                <CirclePlus size={16} className="text-[#0ead69]" />
                Create Events
              </Link>

              <Link
                href="/manage-events"
                onClick={() => setIsOpen(false)}
                className="mb-3 block text-sm text-gray-700 flex gap-2 dark:text-gray-300">
                <Settings size={16} className="text-[#0ead69]" />
                Manage Events
              </Link>

              <Link
                href="/joined-events"
                onClick={() => setIsOpen(false)}
                className="mb-6 block text-sm text-gray-800 flex gap-2 dark:text-gray-300">
                <CircleCheck size={16} className="text-[#0ead69]" />
                Joined Events
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-500 cursor-pointer">
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}
        </div>

      ) : (
        <Link
          href="/login"
          className="flex gap-2 bg-[#0ead69] text-white py-2 px-4 rounded-md hover:bg-[#07c573] cursor-pointer">
          <LogIn size={20} />
          Login
        </Link>
      )}

    </div>
  );
};

export default UserInfo;