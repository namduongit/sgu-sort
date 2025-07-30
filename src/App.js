
import './App.css';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm';

// Pages
import MainPage from './pages/Main/Main';
import SortPage from './pages/Sort/Sort';
import ListPage from './pages/List/List';
import NotFoundPage from './pages/NotFound/NotFound';

function App() {
  return (
    <div class="App position-relative" style={{
      zIndex: 1
    }}>
      <Header />
      <div className="main-content" style={{ height: "100vh", overflowY: "auto" }}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/sort" element={<SortPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
      <LoginForm />
    </div>
  );
}

export default App;
