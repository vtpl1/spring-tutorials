import { ChakraProvider, Box } from "@chakra-ui/react";
import Login from "./components/Login";
function App() {
  return (
    <ChakraProvider>
      <Box p={10}>
        <Login />
      </Box>
    </ChakraProvider>
  );
}

export default App;
