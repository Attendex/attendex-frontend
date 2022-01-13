import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import BookLandingPage from './pages/BookLandingPage';
import SheetPage from './pages/SheetPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/:username" element={<HomePage />} exact />
        <Route path="/:username/:bookName/:bookId" element={<BookLandingPage />} exact />
        <Route path="/:username/:bookName/:bookId/:date/:sheetId" element={<SheetPage />} />
      </Routes>
    </div>
  );
}

export default App;
