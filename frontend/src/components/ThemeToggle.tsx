import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-red text-gray-800 dark:text-gray-100 transition-all self-center dark:bg-[#317670]  absolute top-[100px] right-[16px] sm:relative sm:top-0 sm:right-0"
      aria-label="Cambiar tema"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};
