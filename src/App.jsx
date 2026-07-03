import { Routes, Route } from 'react-router-dom';
import GatePage from './pages/GatePage';
import MainPage from './pages/MainPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GatePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
