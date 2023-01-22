import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="right" py={4}>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label={"Change theme mode"}
      />
    </Box>
  );
}
