import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <footer className="container">
            <p>&copy; 2026 Retail Ordering Website</p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
