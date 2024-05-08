import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === 'dark');

  const toggleTheme = () => {
    setIsChecked(!isChecked);
    setTheme(isChecked ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <label className="inline-flex items-center cursor-pointer ml-4">
      <span className="text-gray-700 dark:text-gray-200">Light</span>
      <div className="relative px-3 rounded-full w-6 h-6">
        <input
          id="theme-toggle"
          type="checkbox"
          className="hidden peer"
          checked={isChecked}
          onChange={toggleTheme}
        />
        <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 peer checked:left-4 peer:checked:bg-blue-600"></div>
      </div>
      <span className="text-gray-700 dark:text-gray-200">Dark</span>
    </label>
  );
}