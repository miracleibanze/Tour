import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hotels from "./pages/Hotels";
import Café from "./pages/Café";
import Attractions from "./pages/Attractions";
import Support from "./pages/Support";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 h-full [&>*]:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/café" element={<Café />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/support" element={<Support />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
