import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Appointments from './pages/Appointments';
import Clinical from './pages/Clinical';
import Analytics from './pages/Analytics';
import Report from './pages/Report';
import TreatmentDashboard from './pages/Treatment/TreatmentDashboard';
import TreatmentList from './pages/Treatment/TreatmentList';
import TreatmentReports from './pages/Treatment/TreatmentReports';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="clinical" element={<Clinical />} />
            <Route path="treatment" element={<TreatmentDashboard />} />
            <Route path="treatment/reports" element={<TreatmentReports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="report" element={<Report />} />
            <Route path="medications" element={<ComingSoon title="Medications" />} />
            <Route path="reports" element={<ComingSoon title="Reports" />} />
            <Route path="settings" element={<ComingSoon title="Settings" />} />
            <Route path="support" element={<ComingSoon title="Support" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;