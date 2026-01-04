import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Formatter from './pages/Formatter';
import NotFound from './pages/NotFound';

// Creiamo il gestore delle chiamate API (Requisito React Query)
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Qui dentro definiamo le rotte */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Formatter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;