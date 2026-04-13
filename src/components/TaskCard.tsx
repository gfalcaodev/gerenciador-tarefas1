import { useState } from "react";
import { ITaskCardProps, DiaSemana } from "../types/ITarefa";

const DIAS: DiaSemana[] = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];

function formatarTempo(segundos: number): string {
  if (segundos < 60) return `${segundos}s`;
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

export default function TaskCard({ tarefa, onMudarStatus, onMudarDia }: ITaskCardProps) {
  const [editandoDia, setEditandoDia] = useState<boolean>(false);

  return (
    <article className="task-card">
      <div className="task-titulo">{tarefa.titulo}</div>

      {/* Dia da semana — clicável */}
      <div className="task-dia">
        📅{" "}
        {editandoDia ? (
          <select
            className="select-dia"
            value={tarefa.diaSemana}
            autoFocus
            onChange={(e) => {
              onMudarDia(tarefa.id, e.target.value as DiaSemana);
              setEditandoDia(false);
            }}
            onBlur={() => setEditandoDia(false)}
          >
            {DIAS.map((d: DiaSemana) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        ) : (
          <span
            className="dia-texto"
            onClick={() => setEditandoDia(true)}
            title="Clique para editar o dia"
          >
            {tarefa.diaSemana} ✏️
          </span>
        )}
      </div>

      {/* Relatório se concluída */}
      {tarefa.status === "concluida" && (
        <div className="task-relatorio">
          <div>✅ Concluída em: <strong>{tarefa.concluidoEm}</strong></div>
          <div>⏱️ Tempo gasto: <strong>{formatarTempo(tarefa.segundosGastos)}</strong></div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="task-acoes">
        {tarefa.status === "afazer" && (
          <>
            <button className="btn-acao btn-iniciar" onClick={() => onMudarStatus(tarefa.id, "andamento")}>
              Iniciar
            </button>
            <button className="btn-acao btn-atrasar" onClick={() => onMudarStatus(tarefa.id, "atrasada")}>
              Atrasou
            </button>
          </>
        )}
        {tarefa.status === "andamento" && (
          <>
            <button className="btn-acao btn-concluir" onClick={() => onMudarStatus(tarefa.id, "concluida")}>
              Concluir
            </button>
            <button className="btn-acao btn-atrasar" onClick={() => onMudarStatus(tarefa.id, "atrasada")}>
              Atrasou
            </button>
          </>
        )}
        {tarefa.status === "atrasada" && (
          <>
            <button className="btn-acao btn-iniciar" onClick={() => onMudarStatus(tarefa.id, "andamento")}>
              Retomar
            </button>
            <button className="btn-acao btn-concluir" onClick={() => onMudarStatus(tarefa.id, "concluida")}>
              Concluir
            </button>
          </>
        )}
        {tarefa.status === "concluida" && (
          <button className="btn-acao btn-retornar" onClick={() => onMudarStatus(tarefa.id, "afazer")}>
            Refazer
          </button>
        )}
      </div>
    </article>
  );
}
