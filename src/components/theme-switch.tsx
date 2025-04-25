import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-background/80 hover:bg-background/80"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
