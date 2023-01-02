import { useEffect, useState } from "react";
// import { useLocalStoreValues } from "./../store";

export const useTheme = () => {

  const [theme, setTheme] = useState(localStorage.theme ?? "dark");
  // console.log("theme in hook=== ",theme)
  useEffect(() => {
    const colorTheme = theme === "dark" ? "light" : "dark";
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    if (theme) {
      root.classList.add(theme);
     localStorage.setItem('theme',theme)
    }
  }, [theme]);
  return { theme, setTheme };
};
