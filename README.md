⚙️ Como Inicializar o Projeto Localmente
Para rodar o projeto na sua máquina, você precisará do Node.js instalado.

1. Clone o repositório:

Bash
git clone https://github.com/SEU_USUARIO/salesComission.git
2. Acesse o diretório do projeto:

Bash
cd salesComission
3. Instale as dependências:

Bash
npm install
4. Inicie o servidor de desenvolvimento:

Bash
npm run dev
O aplicativo estará disponível no seu navegador, geralmente em http://localhost:5173.

📱 Como Instalar no Celular (PWA)
Como este projeto é um Progressive Web App, ele pode ser instalado como um aplicativo nativo:

Acesse o link de produção (deploy na Vercel) pelo navegador do seu smartphone.

Android (Chrome): Toque no aviso "Adicionar à tela inicial" que aparecerá na parte inferior, ou vá no menu (três pontos) e selecione a opção de instalação.

iOS (Safari): Toque no ícone de "Compartilhar" na barra inferior e selecione "Adicionar à Tela de Início".

🛠️ Scripts Disponíveis
npm run dev: Inicia o servidor local com Hot Module Replacement (HMR).

npm run build: Compila o projeto em TypeScript e gera os arquivos estáticos otimizados na pasta dist/.

npm run preview: Simula o servidor de produção localmente servindo a pasta dist/.

Tecnologias Utilizadas
React - Biblioteca principal para construção da interface.

TypeScript - Tipagem estática para maior segurança e previsibilidade do código.

Vite - Bundler ultrarrápido para desenvolvimento e build.

Vite PWA Plugin - Configuração do Progressive Web App (Service Workers e Manifest).

Vercel - Hospedagem e CI/CD automatizado

O aplicativo processa duas vertentes financeiras do vendedor: o Salário em Folha (sujeito a impostos) e a Comissão do Dia Seguinte (paga em espécie por atingimento de meta).

1. Salário em Folha (Bruto)
Calculado sobre 2,25% do valor total vendido no mês.

2. Descontos e Impostos
Os descontos são aplicados estritamente sobre o Salário Bruto calculado:

INSS: Cálculo progressivo por faixas salariais (7,5% a 14%, com teto máximo de R$ 8.475,55).

IRRF: Isento até R$ 5.000,00. Acima deste valor, aplica-se a alíquota de 7,5%.

Vale Transporte (Opcional): Desconto de 6%.

Vale Refeição (Opcional): Desconto de 20%.

3. Comissão do Dia Seguinte (Espécie)
Valor extra pago fora da folha, baseado em metas por cargo:

Vendedor Balcão: Meta de R$ 25.000,00.

Vendedor Televendas: Meta de R$ 35.000,00.

Cálculo: (Valor Total Vendido - Meta do Cargo) / 1000.

Nota: Vendas abaixo da meta zeram esta comissão.
