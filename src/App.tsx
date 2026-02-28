import { useState } from 'react';
import { calcularSalario } from './utils/calculator';
import type { DadosEntrada, ResultadoCalculo } from './types';
import './App.css';

function App() {
  const [dados, setDados] = useState<DadosEntrada>({
    valorVendido: 0,
    cargo: 'balcao',
    recebeVT: false,
    recebeVR: false,
  });

  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const handleCalcular = () => {
    const res = calcularSalario(dados);
    setResultado(res);
  };

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/\D/g, '');
  
    const valorNumerico = Number(apenasNumeros) / 100;
    
    setDados({ ...dados, valorVendido: valorNumerico });
  };

  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      
      <h2 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
        Cálculo de Folha e Comissão
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <label style={{ color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
          Valor Total Vendido:
          <input 
            type="text" 
            value={dados.valorVendido === 0 ? '' : formatarMoeda(dados.valorVendido)} 
            onChange={handleValorChange}
            placeholder="R$ 0,00"
            style={{ width: '100%', padding: '10px', marginTop: '5px', fontSize: '16px', color: 'black' }}
          />
        </label>

        <label style={{ color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
          Cargo:
          <select 
            value={dados.cargo} 
            onChange={e => setDados({...dados, cargo: e.target.value as 'balcao' | 'televendas'})}
            style={{ width: '100%', padding: '10px', marginTop: '5px', fontSize: '16px', color: 'black' }}
          >
            <option value="balcao">Vendedor Balcão (Meta: 25k)</option>
            <option value="televendas">Vendedor Televendas (Meta: 35k)</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
          <input 
            type="checkbox" 
            checked={dados.recebeVT} 
            onChange={e => setDados({
              ...dados, 
              recebeVT: e.target.checked
            })}
            style={{ transform: 'scale(1.5)' }}
          />
          Recebe Vale Transporte (Desconto 6%)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
          <input 
            type="checkbox" 
            checked={dados.recebeVR} 
            onChange={e => setDados({
              ...dados, 
              recebeVR: e.target.checked
            })}
            style={{ transform: 'scale(1.5)' }}
          />
          Recebe Vale Refeição (Valor aproximado)
        </label>

        <button 
          onClick={handleCalcular}
          style={{ padding: '15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          Calcular
        </button>
      </div>

      {resultado && (
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{color:'red'}}>Resultados:</h3>
          <p style={{ color: 'red' }}><strong>Salário em Folha (Bruto):</strong> - {formatarMoeda(resultado.salarioBruto)}</p>
          <hr />
          <p style={{ color: 'red' }}><strong>Desconto INSS:</strong> - {formatarMoeda(resultado.inss)}</p>
          {resultado.irrf > 0 && (
            <p style={{ color: 'red' }}><strong>Desconto IRRF:</strong> - {formatarMoeda(resultado.irrf)}</p>
          )}
          
          {dados.recebeVT && <p style={{ color: 'red' }}><strong>Desconto VT:</strong> - {formatarMoeda(resultado.vt)}</p>}
          
          {dados.recebeVR && <p style={{ color: 'red' }}><strong>Desconto VR:</strong> - {formatarMoeda(resultado.vr)}</p>}
          
          <hr />
          <p style={{ fontSize: '18px', color: 'green' }}><strong>Salário Líquido:</strong> {formatarMoeda(resultado.salarioLiquido)}</p>
          
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e6ffe6', border: '1px solid #00cc00', borderRadius: '5px' }}>
            <p style={{ margin: 0, fontSize: '18px', color: '#006600' }}>
              <strong>Comissão Dia Seguinte (Espécie):</strong> <br/>
              {formatarMoeda(resultado.comissaoDiaSeguinte)}
            </p>
          </div>
          
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e6f2ff', border: '1px solid #005ce6', borderRadius: '5px' }}>
             <p style={{ margin: 0, fontSize: '16px', color: '#004080' }}>
              <strong>Ganho Total (Líquido + Espécie):</strong> <br/>
              {formatarMoeda(resultado.valorTotalRecebido || (resultado.salarioLiquido + resultado.comissaoDiaSeguinte))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;