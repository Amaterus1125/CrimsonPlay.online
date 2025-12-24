import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import Home from "./components/Home";
import About from "./components/About";
import GameDetails from "./components/GameDetails";
import Categories from "./components/Categories";
import GenrePage from "./components/GenrePage";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<BackgroundVideo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

     
        <Route path="/categories" element={<Categories />} />
        {/* dynamic routes */}
        <Route path="/genre/:genre" element={<GenrePage />} />      

        <Route path="/game/:name" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}
