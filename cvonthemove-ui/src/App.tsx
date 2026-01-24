import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Preloader from './components/Preloader';

const LandingPage = lazy(() => import('./features/landing/LandingPage'));
const LoginPage = lazy(() => import('./features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('./features/auth/pages/SignupPage'));
const AccountPage = lazy(() => import('./features/auth/pages/AccountPage').then(module => ({ default: module.AccountPage })));
const PrivacyPolicyPage = lazy(() => import('./features/legal/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./features/legal/TermsOfServicePage'));

const CreateCVPage = lazy(() => import('./features/cv-builder/components/CreateCVPage').then(module => ({ default: module.CreateCVPage })));
const EditCVPage = lazy(() => import('./features/cv-builder/components/EditCVPage').then(module => ({ default: module.EditCVPage })));
const DashboardPage = lazy(() => import('./features/cv-builder/components/DashboardPage').then(module => ({ default: module.DashboardPage })));

function App() {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
