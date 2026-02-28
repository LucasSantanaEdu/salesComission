export type Cargo = 'balcao' | 'televendas';

export interface DadosEntrada {
  valorVendido: number;
  cargo: Cargo;
  recebeVT: boolean;
  recebeVR: boolean;
}

export interface ResultadoCalculo {
  salarioBruto: number;
  inss: number;
  irrf: number;
  vt: number;
  vr: number;
  salarioLiquido: number; // O que cai na conta bancária (CLT)
  comissaoDiaSeguinte: number; // O que ele recebe em espécie
  valorTotalRecebido: number; // A soma de: salarioLiquido + comissaoDiaSeguinte
}