import { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu"

function App() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/menu" element={<Menu />}/>
    </Routes>
  )
}

export default App;
