// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/Toast/ToastContext";
import Home from "./pages/Home";
import About from "./pages/About";
import BottomNav from "./components/BottomNav/BottomNav";
import BouteilleForm from "./components/BouteilleForm/BouteilleForm";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleAddSuccess = () => {
    setShowForm(false);
    setRefreshList(prev => !prev);
  };

  return (
    <ToastProvider>
      <Router>
        <div style={{ paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={<Home refresh={refreshList} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <BottomNav onAddClick={() => setShowForm(true)} />
        {showForm && (
          <div className="modalBackdrop">
            <div className="modalContent">
              <BouteilleForm
                onAdd={handleAddSuccess}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </Router>
    </ToastProvider>
  );
}

export default App;
