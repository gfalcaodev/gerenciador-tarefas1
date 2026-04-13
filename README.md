# Gerenciador de Tarefas Semanais

> Trabalho 2 — React, TypeScript e Bootstrap
> Disciplina: Desenvolvimento de Software WEB
> Prof. Alexandre Cláudio de Almeida — 2026

---

## Sobre o Projeto

Aplicação para organizar afazeres semanais de casa, com 4 status de acompanhamento:
**A Fazer → Em Andamento → Concluído** (ou **Atrasado** quando não foi feito no dia previsto).

---

## Justificativa da Arquitetura

A divisão de componentes seguiu o princípio de que **cada componente faz apenas uma coisa**.

| Componente  | O que faz |
|-------------|-----------|
| `Navbar`    | Exibe o título e identificação. Não precisa saber de nada além disso. |
| `Dashboard` | Mostra os 4 contadores. Recebe apenas os números via props — só renderiza, não pensa. |
| `TaskList`  | Organiza as 4 colunas. Distribui as tarefas filtradas por status para cada `Coluna`. |
| `Coluna`    | Renderiza uma coluna específica com seu cabeçalho e lista de `TaskCard`s. |
| `TaskCard`  | Representa uma tarefa individual com os botões de ação disponíveis para o seu status atual. |
| `App`       | Único lugar com estado (`useState`). Calcula os stats com `useMemo` e passa tudo para baixo via props. |

### Fluxo de dados
```
App (único estado: tarefas[])
├── Navbar      ← sem props
├── Dashboard   ← recebe stats (só leitura)
└── TaskList    ← recebe tarefas[] + onMudarStatus()
    └── Coluna  ← recebe tarefas filtradas por status
        └── TaskCard ← recebe tarefa + onMudarStatus()
```

Quando o usuário clica em "Iniciar" ou "Concluir", o `TaskCard` chama `onMudarStatus(id, novoStatus)` → `App` atualiza o estado → React re-renderiza o `Dashboard` e as colunas automaticamente.

---

## Estrutura de Pastas

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Dashboard.tsx
│   ├── TaskList.tsx
│   ├── Coluna.tsx
│   └── TaskCard.tsx
├── types/
│   └── ITarefa.ts
├── styles/
│   └── app.css
├── App.tsx
└── main.tsx
```

---

## Como rodar

```bash
npm install
npm run dev
```

---

## Identificação

**Gabriel Brito Falcão**
Análise e Desenvolvimento de Sistemas — 4º Período — PUC Goiás
Desenvolvimento de Software WEB — Prof. Alexandre Cláudio de Almeida — 2026
