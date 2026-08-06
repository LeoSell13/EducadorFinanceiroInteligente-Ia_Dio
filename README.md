# Educador Financeiro com IA

Este projeto é uma aplicação web em React + TypeScript para ajudar pessoas a planejar metas financeiras de forma simples e prática. A ideia é guiar o usuário por uma simulação de orçamento, mostrar quanto precisa economizar por mês para alcançar uma meta e oferecer orientações mais personalizadas com ajuda de IA.

## O que o projeto faz

- Ajuda a montar uma simulação financeira com base em renda, despesas, dívidas e prazo da meta.
- Calcula o valor necessário de economia mensal para atingir o objetivo.
- Exibe uma página de resultados com informações claras e visualmente organizadas.
- Permite conversar com uma assistente financeira por meio de IA.
- Salva o histórico das simulações no navegador para consulta posterior.

## Como executar a aplicação

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo chamado `.env.local` na raiz do projeto e adicione sua chave da API do Gemini:

```env
VITE_GEMINI_API_KEY=sua-chave-aqui
```

3. Inicie o projeto:

```bash
npm run dev
```

4. Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## Tecnologias usadas

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Local Storage para salvar o histórico
- API Gemini para gerar insights e respostas em linguagem natural

## Melhoria implementada

A principal melhoria foi adicionar um fluxo completo de histórico de simulações e um painel de conversa com IA, tornando a experiência mais personalizada e útil para o usuário.

## Como testar o fluxo principal

1. Acesse a página inicial da aplicação.
2. Preencha os dados da simulação: nome da meta, valor, prazo, renda, despesas e dívidas.
3. Avance pelas etapas do formulário até concluir.
4. Veja o resultado da economia mensal e os insights gerados.
5. Abra a página de histórico e confirme que a simulação foi salva.
6. Teste o chat para ver a resposta da IA no contexto da simulação.

## O que aprendi durante o desafio

Durante o desenvolvimento, aprendi a organizar melhor um fluxo de cadastro em várias etapas, integrar uma API externa em uma aplicação frontend e trabalhar com persistência local para melhorar a experiência do usuário. Também percebi como a combinação de interface, lógica financeira e IA pode tornar um projeto mais completo e útil.

