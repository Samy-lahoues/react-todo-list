import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import LanguageProvider from "./context/providers/LanguageProvider";
import { ThemeProvider } from "./context/providers/ThemeProvider";
import ToDosProvider from "./context/providers/TodosProvider";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToDosProvider>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToDosProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
