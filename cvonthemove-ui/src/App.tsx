import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import LoginPage from './features/auth/pages/LoginPage';
import './App.css';
import { CreateCVPage, EditCVPage } from './features/cv-builder/components/Pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateCVPage />} />
        <Route path="/edit" element={<EditCVPage />} />
        <Route path="/edit/:id" element={<EditCVPage />} />
        <Route path="/download" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
