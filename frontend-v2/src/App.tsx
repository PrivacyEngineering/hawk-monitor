import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { MappingsPage } from './components/MappingsPage';
import { Navigation } from './components/Navigation';
import { NewMapping } from './components/NewMapping';
import { FieldsPage } from './components/FieldsPage';
import { RequestsPage } from './components/RequestsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fields" element={<FieldsPage />} />
            <Route path="/mappings" element={<MappingsPage />} />
            <Route path="/mappings/new-mapping" element={<NewMapping />} />
            <Route path="/requests" element={<RequestsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
