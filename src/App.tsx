import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Tools } from './pages/Tools';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { AddToolModal } from './components/features/AddToolModal';
import { EditToolModal } from './components/features/EditToolModal';
import { ToolDetailsModal } from './components/features/ToolDetailsModal';
import { DeleteConfirmModal } from './components/features/DeleteConfirmModal';
import { UFOScene } from './components/three/UFOScene';
import { UserProvider } from './contexts/UserContext';

// Use basename only in production (GitHub Pages)
const basename = import.meta.env.PROD ? '/Internal-Tools-Management-Dashboard' : '/';

function App() {
  return (
    <UserProvider>
      <BrowserRouter basename={basename}>
      {/* Global UFO - flies across all pages */}
      <UFOScene />
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tools" element={<Tools />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Global Modals */}
      <AddToolModal />
      <EditToolModal />
      <ToolDetailsModal />
      <DeleteConfirmModal />
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
