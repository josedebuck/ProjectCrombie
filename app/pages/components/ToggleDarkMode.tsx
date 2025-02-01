"use client";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

const ToggleDarkMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    // Si el contexto no está disponible, lanzar un error (esto es una medida de seguridad)
    throw new Error("ToggleDarkMode must be used within a ThemeProvider");
  }

  const { isDarkMode, toggleDarkMode } = context;

  return (
    <button
      onClick={toggleDarkMode}
      className="absolute right-2 top-4 px-6 py-1 bg-gray-200 dark:bg-slate-800 text-black dark:text-white rounded"
    >
      {isDarkMode ? "🌝" : "🌞"}
    </button>
  );
};

export default ToggleDarkMode;
