import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RBACProvider } from './context/RBACContext';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';

function App() {
  return (
    <RBACProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/" element={<UserManagement />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </RBACProvider>
  );
}

export default App;