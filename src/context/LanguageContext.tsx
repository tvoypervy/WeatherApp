import React, { createContext, useState, useContext, useEffect } from "react";

type Language = "en" | "uk";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
}

const LANGUAGE_STORAGE_KEY = "gothic-weather-language";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === "uk" ? "uk" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "uk" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
