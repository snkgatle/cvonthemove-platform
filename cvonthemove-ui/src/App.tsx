import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/landing/components/LandingPage';
import { CreateCVPage, EditCVPage } from './features/cv-builder/components/Placeholders';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateCVPage />} />
        <Route path="/edit/:id" element={<EditCVPage />} />
      </Routes>
    </Router>
  );
}

export default App;
