import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Show from "./pages/Show";

const App = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <Box mx="10vw">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Show />} />
        </Routes>
      </BrowserRouter>
      </Box>
      <Footer/>
    </ChakraProvider>
  );
};

export default App;
