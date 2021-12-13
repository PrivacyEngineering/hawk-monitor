import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { MappingsPage } from './MappingsPage';
import { Navigation } from './Navigation';

function App() {
  return (
    <>
      <Navigation />

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="mappings" element={<MappingsPage />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
