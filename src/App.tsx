import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Aggiunto Link qui
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Formatter from './pages/Formatter';
import NotFound from './pages/NotFound';
import History from './pages/History'; // 1. IMPORTIAMO LA NUOVA PAGINA

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        
        {/* Menu di navigazione (per cliccare e cambiare pagina) */}
        <nav style={{ padding: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px', display: 'flex', gap: '15px' }}>
          <Link to="/">Home</Link>
          <Link to="/app">Editor</Link>
          <Link to="/history">Cronologia</Link>
        </nav>

        {/* Qui definiamo le rotte */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Formatter />} />
          
          {/* 2. AGGIUNGIAMO LA ROTTA QUI */}
          <Route path="/history" element={<History />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;