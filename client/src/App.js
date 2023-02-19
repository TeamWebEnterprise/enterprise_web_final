import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Home theme={darkTheme} setMode={setMode} mode={mode}/>
    </ThemeProvider>
  );
}

export default App;
