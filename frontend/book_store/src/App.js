import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home.js'; 
import AboutUs from './pages/AboutUs.js'; 
import Dashboard from './pages/Dashboard.js'; 
import AddBook from './pages/AddBook.js'; 
import './assets/sass/main.scss';
import Explore from "./pages/Explore.js";
import ListBook from "./pages/ListBook.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/explores" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/addBook" element={<AddBook />} />
        <Route path="*" element={<b>!!!Page Not Found!!!</b>} />
        <Route path="/listbook" element={<ListBook/>} />
      </Routes>
    </Router>
  );
}

export default App;
