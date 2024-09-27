import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import NewsDetailsPage from './pages/details/details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<NewsDetailsPage />} />
    </Routes>
  );
}

export default App;