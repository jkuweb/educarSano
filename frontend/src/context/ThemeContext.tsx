// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		try {
			const stored = localStorage.getItem('theme') as Theme | null;
			const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const initial = stored ?? (systemDark ? 'dark' : 'light');
			setTheme(initial);
			const root = document.documentElement;
			root.classList.toggle('dark', initial === 'dark');
			root.setAttribute('data-theme', initial);
			if (!root.className.trim()) {
				root.removeAttribute('class');
			}
		} catch (e) {
			// no hacemos nada si localStorage arroja error (privacidad/incógnito)
		}
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', theme === 'dark');
		root.setAttribute('data-theme', theme);
		if (!root.className.trim()) {
			root.removeAttribute('class');
		}
		try {
			localStorage.setItem('theme', theme);
		} catch (e) {
			// ignore
		}
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
	return ctx;
};
