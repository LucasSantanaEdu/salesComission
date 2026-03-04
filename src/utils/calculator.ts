import type { DadosEntrada, ResultadoCalculo } from '../types';

export function calcularSalario(dados: DadosEntrada): ResultadoCalculo {
  const { valorVendido, cargo, recebeVT, recebeVR } = dados;

  // 1. Salário em Folha (Bruto)
  const salarioBruto = valorVendido * 0.0225;

  // 2. INSS Progressivo
  let inssTotal = 0;
  const faixas = [
    { limite: 1621.00, aliq: 0.075 },
    { limite: 2902.84, aliq: 0.09 },
    { limite: 4354.27, aliq: 0.12 },
    { limite: 8475.55, aliq: 0.14 }
  ];

  const baseCalculoInss = Math.min(salarioBruto, 8475.55);
  let limiteAnterior = 0;

  for (const faixa of faixas) {
    if (baseCalculoInss > limiteAnterior) {
      const valorNaFaixa = Math.min(baseCalculoInss, faixa.limite) - limiteAnterior;
      inssTotal += valorNaFaixa * faixa.aliq;
      limiteAnterior = faixa.limite;
    }
  }

  // 3. IRRF (Regra de Negócio: > 5000 aplica 7.5%)
  const irrf = (salarioBruto - inssTotal) > 5000 ? (salarioBruto - inssTotal) * 0.075 : 0;

  // 5. Benefícios
  const vt = recebeVT ? salarioBruto * 0.06 : 0;
  
  //Vale Refeição fixo de 800 reais com desconto de 21% sobre esse valor
  const valorVRTotal = 800;
  const vr = recebeVR ? valorVRTotal * 0.21 : 0; // Resultado: R$ 168,00 - validar

  // 6. Salário Líquido
  const salarioLiquido = salarioBruto - inssTotal - irrf - vt - vr;

  // 7. Comissão do Dia Seguinte (Espécie)
  const meta = cargo === 'balcao' ? 25000 : 35000;
  const comissaoDiaSeguinte = valorVendido > meta ? (valorVendido - meta) / 100 : 0;

  return {
    salarioBruto,
    inss: inssTotal,
    irrf,
    vt,
    vr,
    salarioLiquido,
    comissaoDiaSeguinte,
    valorTotalRecebido: salarioLiquido + comissaoDiaSeguinte 
  };
}