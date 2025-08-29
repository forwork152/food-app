import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/UseThemeStore";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className="relative border border-gray-200 hover:border-gray-300 p-2 rounded-full shadow-md transition-transform transform hover:scale-105 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center">
            <Sun className="h-6 w-6 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center">
            <Moon className="h-6 w-6 text-gray-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
