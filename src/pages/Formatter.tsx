import { Link } from 'react-router-dom';

export default function Formatter() {
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Torna alla Home</Link>
      <h1>Area di Lavoro</h1>
      <p>Qui ci sarà il form per inserire il testo.</p>
    </div>
  );
}