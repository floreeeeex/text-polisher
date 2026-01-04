import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import per React Query
import { addToHistory } from '../services/api'; // La funzione che abbiamo creato prima
import { ArrowLeft, Sparkles, Copy, Save } from 'lucide-react'; // Icone carine

export default function Formatter() {
  // 1. STATO: Qui teniamo il testo che scrivi e quello trasformato
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // 2. CONFIGURAZIONE SALVATAGGIO (POST)
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: addToHistory, // Usa la funzione api.ts che chiama il server
    onSuccess: () => {
      // Se il salvataggio va a buon fine:
      queryClient.invalidateQueries({ queryKey: ['history'] }); // Aggiorna la cronologia
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Nascondi il messaggio dopo 3 sec
    },
    onError: () => {
      alert("C'è stato un problema nel salvare i dati! Il server è acceso?");
    }
  });

  // 3. LA FUNZIONE CHE FA TUTTO
  const handleFormat = () => {
    if (!inputText) return;

    // A. Simuliamo l'IA (Per ora rendiamo tutto MAIUSCOLO per testare)
    // Più avanti qui metteremo la chiamata a Cohere vera
    const fakeAiResult = inputText.toUpperCase(); 
    setOutputText(fakeAiResult);

    // B. Salviamo nel database (Chiamata POST)
    mutation.mutate(inputText);
  };

  // 4. L'INTERFACCIA GRAFICA (HTML/JSX)
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      {/* Intestazione con Link Home */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ArrowLeft size={20} /> Torna alla Home
        </Link>
      </div>

      <h1>Formatta il tuo testo <Sparkles color="gold" style={{ display: 'inline' }} /></h1>
      <p style={{ color: '#666' }}>Scrivi a sinistra, premi il bottone, e guarda la magia (e il salvataggio automatico).</p>

      {/* Messaggio di conferma salvataggio */}
      {isSaved && (
        <div style={{ padding: '10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Save size={18} /> Testo salvato correttamente in cronologia!
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        
        {/* COLONNA SINISTRA: INPUT */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3>Testo Originale</h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Scrivi qui qualcosa..."
            style={{ 
              width: '100%', 
              height: '300px', 
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              fontSize: '16px'
            }}
          />
          <button 
            onClick={handleFormat}
            disabled={!inputText || mutation.isPending}
            style={{ 
              marginTop: '10px', 
              padding: '12px 24px', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {mutation.isPending ? 'Sto Salvando...' : '✨ Formatta e Salva'}
          </button>
        </div>

        {/* COLONNA DESTRA: OUTPUT */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3>Risultato</h3>
          <div style={{ 
            width: '100%', 
            height: '300px', 
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: '#f8fafc', 
            whiteSpace: 'pre-wrap', 
            overflowY: 'auto'
          }}>
            {outputText ? outputText : <span style={{ color: '#94a3b8' }}>Il risultato apparirà qui...</span>}
          </div>
          
          {outputText && (
            <button 
              onClick={() => navigator.clipboard.writeText(outputText)}
              style={{ marginTop: '10px', padding: '8px', cursor: 'pointer', background: 'white', border: '1px solid #ccc', borderRadius: '5px' }}
            >
              <Copy size={16} /> Copia
            </button>
          )}
        </div>

      </div>
    </div>
  );
}