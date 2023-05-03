import { useEffect, useState } from "react";
import { Moon,Sun} from "lucide-react"
// import { useLocalStoreValues } from "./../store";

export const useDarkTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== 'undefined' ? (localStorage.theme ?? 'dark') : 'dark');

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (ev: MediaQueryListEvent) => {
      setTheme(ev.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  // //no-console("theme in hook=== ",theme)

  useEffect(() => {
    const colorTheme = theme === "dark" ? "light" : "dark";
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    if (theme) {
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const modeIcon = theme === "dark" ? Sun :Moon;
  const toggleTheme = () => {
    setTheme(nextTheme);
  };

  return { theme, toggleTheme, modeIcon };
};
