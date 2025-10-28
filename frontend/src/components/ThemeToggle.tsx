import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full bg-red dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all"
			aria-label="Cambiar tema"
		>
			{theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
};