import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/modals/BookingModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { AssessmentModal } from './components/modals/AssessmentModal';
import { SearchProvider } from './contexts/SearchContext';
import { UIProvider } from './contexts/UIContext';
import { Home } from './components/pages/Home';
import { DynamicPage } from './components/pages/DynamicPage';
import { CookieConsent } from './components/layouts/CookieConsent';

function App() {
  return (
    <SearchProvider>
      <UIProvider>
        <Router>
          <div className="bg-background min-h-screen selection:bg-accent-cyan/30 selection:text-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:slug/*" element={<DynamicPage />} />
                <Route path="*" element={<DynamicPage />} />
              </Routes>
            </main>
            <Footer />
            <BookingModal />
            <ServiceDetailModal />
            <AssessmentModal />
            <CookieConsent />
          </div>
        </Router>
      </UIProvider>
    </SearchProvider>
  );
}

export default App;