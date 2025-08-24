
import './App.css';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"

// Pages
import MainPage from "./pages/Main/Main";
import SortPage from "./pages/Sort/Sort";
import ListPage from "./pages/List/List";
import ContactPage from './pages/Contact/Contact';
import DonatePage from './pages/Donate/Donate';
import NotFoundPage from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App position-relative" style={{
      zIndex: 1
    }}>
      <Router>
        <Header />    
        <div className="main-content" style={{ height: "85vh", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/page/donate" element={<DonatePage />} />
            <Route path="/page/contact" element={<ContactPage />} />
            <Route path="/feature/sort" element={<SortPage />} />
            <Route path="/feature/list" element={<ListPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
