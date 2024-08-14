import { useEffect, useState } from 'react';

export default function useDarkTheme() {
  const [theme, setTheme] = useState(localStorage.theme);
  const visualPreference = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(visualPreference);
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme, visualPreference]);

  return [visualPreference, setTheme] as const;
}
