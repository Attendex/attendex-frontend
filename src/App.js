import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SheetPage from './pages/SheetPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/username" element={<HomePage />} /> {/* To change to dynamic route */}
        <Route path="/sheet" element={<SheetPage />} /> {/* To change to dynamic route */}
      </Routes>
    </div>
  );
}

export default App;
