import { Home, Menu, School } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= MOBILE NAVBAR  ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-gray-800 z-20 px-4 flex items-center justify-between">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
            <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
          </div>
          <Link to="/">
            <h1 className="font-bold text-[16px]! tracking-tight">
              Task Management
            </h1>
          </Link>
        </div>

        {/* RIGHT — MENU BUTTON */}
<div className="flex items-center gap-2">
  <ThemeSwitch />
  <Button
    className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 hover:bg-gray-50 dark:border-0 active:scale-95 transition shadow-sm hover:shadow-md"
    onClick={() => setOpen(true)}
  >
    <Menu size={20} className="text-gray-800 dark:text-gray-200"/>
  </Button>
</div>

      </div>

      {/* ================= MOBILE SIDEBAR MENU ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden">
          <div className="absolute top-0 right-0 w-60 h-full bg-white dark:bg-[#111] shadow-xl p-6 animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-base">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-300 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col space-y-4 text-sm">
              <Link
                to="/"
                className="text-gray-800 dark:text-gray-200"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>

             
            </nav>
          </div>
        </div>
      )}

      {/* ================= DESKTOP VERTICAL SIDEBAR ================= */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-gray-800 flex-col justify-between py-6 items-center z-20">
        {/* LOGO */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 mb-6">
            <div className="w-5 h-5 bg-teal-400 rounded-full"></div>
            <div className="w-5 h-5 bg-teal-600 rounded-full"></div>
          </div>
         

          {/* NAV ICONS */}
          <nav className="flex flex-col gap-6 items-center">
            <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-teal-500 transition">
              <Home size={24} />
            </Link>
            {/*  icons here if needed */}
          </nav>
        </div>

        {/* THEME SWITCH AT BOTTOM */}
        <div className="pb-4">
          <ThemeSwitch />
        </div>
      </div>
    </>
  );
};

export default Navbar;
