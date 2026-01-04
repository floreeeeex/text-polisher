import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Benvenuto su TextPolisher ✨</h1>
      <p>L'IA che sistema tutti i tuoi testi</p>
      <Link to="/app">
        <button style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}>
          Inizia a formattare
        </button>
      </Link>
    </div>
  );
}