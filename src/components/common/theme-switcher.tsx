'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import useColorScheme from '../../contexts/useColorScheme';
import { ColorScheme } from '../../interfaces/colorScheme';

function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const isDark = colorScheme !== ColorScheme.LIGHT;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [colorScheme]);

  const onColorSchemeChange = () => {
    setColorScheme(
      colorScheme === ColorScheme.LIGHT ? ColorScheme.DARK : ColorScheme.LIGHT
    );
  };

  return (
    <div className="cursor-pointer" onClick={onColorSchemeChange}>
      {colorScheme === ColorScheme.LIGHT ? (
        <Sun className="mr-2 h-6 w-6" />
      ) : (
        <Moon className="mr-2 h-6 w-6" />
      )}
    </div>
  );
}
export default ThemeSwitcher;