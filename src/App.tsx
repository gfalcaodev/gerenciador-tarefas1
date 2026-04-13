import { useState, useMemo } from "react";
import { ITarefa, IDashboardStats, StatusTarefa, DiaSemana } from "./types/ITarefa";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import Sidebar from "./components/Sidebar";
import "./styles/app.css";

function dataHoraAtual(): string {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();
  const h   = String(agora.getHours()).padStart(2, "0");
  const m   = String(agora.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${h}:${m}`;
}

const tarefasIniciais: ITarefa[] = [
  { id: 1, titulo: "Aspirar",     diaSemana: "Segunda", status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 2, titulo: "Roupa",        diaSemana: "Terça",   status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 3, titulo: "Fazer comida",       diaSemana: "Quarta",  status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 4, titulo: "Banheiro",   diaSemana: "Quinta",  status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 5, titulo: "Estudar",            diaSemana: "Segunda", status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 6, titulo: "Fazer atividades",   diaSemana: "Sexta",   status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 7, titulo: "Louça",        diaSemana: "Sábado",  status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
  { id: 8, titulo: "Quartos", diaSemana: "Domingo", status: "afazer", iniciadoEm: null, concluidoEm: null, segundosGastos: 0 },
];

export default function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>(tarefasIniciais);

  const mudarStatus = (id: number, novoStatus: StatusTarefa): void => {
    setTarefas((prev: ITarefa[]) =>
      prev.map((t: ITarefa) => {
        if (t.id !== id) return t;

        // Iniciando: guarda timestamp
        if (novoStatus === "andamento") {
          return { ...t, status: novoStatus, iniciadoEm: Date.now() };
        }

        // Concluindo: calcula tempo decorrido e registra data/hora
        if (novoStatus === "concluida") {
          const agora = Date.now();
          const elapsed = t.iniciadoEm
            ? Math.round((agora - t.iniciadoEm) / 1000)
            : 0;
          return {
            ...t,
            status: novoStatus,
            concluidoEm: dataHoraAtual(),
            segundosGastos: t.segundosGastos + elapsed,
            iniciadoEm: null,
          };
        }

        // Voltando para A Fazer (Refazer): reseta tudo
        if (novoStatus === "afazer") {
          return { ...t, status: novoStatus, iniciadoEm: null, concluidoEm: null, segundosGastos: 0 };
        }

        // Atrasado: apenas muda status
        return { ...t, status: novoStatus };
      })
    );
  };

  const mudarDia = (id: number, novoDia: DiaSemana): void => {
    setTarefas((prev: ITarefa[]) =>
      prev.map((t: ITarefa) => (t.id === id ? { ...t, diaSemana: novoDia } : t))
    );
  };

  const stats: IDashboardStats = useMemo(() => ({
    afazer:    tarefas.filter((t: ITarefa) => t.status === "afazer").length,
    andamento: tarefas.filter((t: ITarefa) => t.status === "andamento").length,
    concluida: tarefas.filter((t: ITarefa) => t.status === "concluida").length,
    atrasada:  tarefas.filter((t: ITarefa) => t.status === "atrasada").length,
  }), [tarefas]);

  return (
    <>
      <Navbar />

      <main>
        <div className="container">
          <Dashboard stats={stats} />

          {/* Layout assimétrico: aside 3 colunas + conteúdo 9 colunas */}
          <div className="row g-3">
            <div className="col-12 col-lg-3">
              <Sidebar tarefas={tarefas} />
            </div>
            <div className="col-12 col-lg-9">
              <TaskList tarefas={tarefas} onMudarStatus={mudarStatus} onMudarDia={mudarDia} />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <address>
            <strong>Gabriel Brito Falcão</strong> &nbsp;·&nbsp;
            Análise e Desenvolvimento de Sistemas — 4º Período &nbsp;·&nbsp;
            <span className="destaque">Desenvolvimento de Software WEB</span>
            <br />
            Prof. Alexandre Cláudio de Almeida &nbsp;·&nbsp; 2026
          </address>
        </div>
      </footer>
    </>
  );
}
