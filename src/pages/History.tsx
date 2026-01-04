import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function History() {
  // Requisito Esame: React Query GET
  const { data, isLoading, isError } = useQuery({
    queryKey: ['history'],
    queryFn: getHistory
  });

  if (isLoading) return <div>Caricamento... <Loader2 className="animate-spin"/></div>;
  if (isError) return <div style={{color: 'red'}}>Errore! Il server è acceso?</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'flex', gap: '5px', textDecoration: 'none', color: '#333', marginBottom: '20px' }}>
        <ArrowLeft /> Torna alla Home
      </Link>

      <h1>Cronologia</h1>

      <div style={{ display: 'grid', gap: '10px' }}>
        {data?.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <strong>{item.date}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}