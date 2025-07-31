
import './App.css';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './client/components/layout/Header/Header';
import Footer from './client/components/layout/Footer/Footer';

// Pages
import MainPage from './client/pages/Main/Main';
import SortPage from './client/pages/Sort/Sort';
import ListPage from './client/pages/List/List';
import NotFoundPage from './client/pages/NotFound/NotFound';

function App() {
  return (
    <div className="App position-relative" style={{
      zIndex: 1
    }}>
      <Router>
        <Header />    
        <div className="main-content" style={{ height: "100vh", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/sort" element={<SortPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
