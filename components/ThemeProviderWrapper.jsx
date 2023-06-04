import { useTheme } from "../context/useTheme";
import React from "react";

const ThemeProviderWrapper = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const styles = {
    backgroundColor: isDark ? "black" : "white",
    color: isDark ? "white" : "black",
    postBackgroundColor: isDark ? "#333" : "white",
    postTextColor: isDark ? "white" : "black",
  };

  return <div style={styles}>{children}</div>;
};

export default ThemeProviderWrapper;
