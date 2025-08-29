import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

export const useThemeStore = create<any>()(
  persist(
    (set, get) => ({
      theme: "light", // Default
      setTheme: (theme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
      },
      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === "light" ? "dark" : "light";

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
        localStorage.setItem("vite-ui-theme", newTheme);

        set({ theme: newTheme });
      },
      loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => {
        const storedTheme =
          (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        set({ theme: storedTheme });
      },
      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storedTheme = localStorage.getItem("vite-ui-theme") as Theme;
          const themeToApply = storedTheme || "light";

          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(themeToApply);

          set({ theme: themeToApply });
        }
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
