import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import CreateCVPage from './features/cv-builder/pages/CreateCVPage';
import EditCVPage from './features/cv-builder/pages/EditCVPage';
import DownloadCVPage from './features/cv-builder/pages/DownloadCVPage';
import LoginPage from './features/auth/pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateCVPage />} />
        <Route path="/edit" element={<EditCVPage />} />
        <Route path="/edit/:id" element={<EditCVPage />} />
        <Route path="/download" element={<DownloadCVPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
