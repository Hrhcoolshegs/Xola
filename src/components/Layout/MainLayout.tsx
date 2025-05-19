import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-30 md:relative"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;