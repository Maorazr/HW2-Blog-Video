import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Switch from "@mui/material/Switch";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // <button onClick={toggleTheme}>
    // <ToggleButton onClick={toggleTheme}>
    <Switch onClick={toggleTheme} id="Toggle">
      Switch to {theme === "light" ? "dark" : "light"} mode
    </Switch>
    // </button>
    // </ToggleButton>
  );
};

export default ThemeToggleButton;
