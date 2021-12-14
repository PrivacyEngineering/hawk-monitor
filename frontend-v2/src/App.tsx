import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { MappingsPage } from './components/MappingsPage';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="mappings" element={<MappingsPage />}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
