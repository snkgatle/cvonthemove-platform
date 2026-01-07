import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import { AccountPage } from './features/auth/pages/AccountPage';
import PrivacyPolicyPage from './features/legal/PrivacyPolicyPage';
import TermsOfServicePage from './features/legal/TermsOfServicePage';
import './App.css';
import { CreateCVPage, EditCVPage, DashboardPage } from './features/cv-builder/components/Pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateCVPage />} />
        <Route path="/edit" element={<Navigate to="/dashboard" />} />
        <Route path="/edit/:id" element={<EditCVPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/download" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
