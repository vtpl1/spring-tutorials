import {
  ColorModeProvider,
  CSSReset,
  theme,
  ThemeProvider,
} from "@chakra-ui/react";
import SplitScrenLogin from "./components/Login";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <SplitScrenLogin />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
