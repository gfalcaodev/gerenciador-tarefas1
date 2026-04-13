import { IColunaProps, ITarefa, StatusTarefa } from "../types/ITarefa";
import TaskCard from "./TaskCard";

const titulos: Record<StatusTarefa, string> = {
  afazer:    "A Fazer",
  andamento: "Em Andamento",
  concluida: "Concluído",
  atrasada:  "Atrasado",
};

export default function Coluna({ status, tarefas, onMudarStatus, onMudarDia }: IColunaProps) {
  return (
    <div className={`coluna coluna-${status}`}>
      <div className="coluna-header">
        <span className="coluna-titulo">{titulos[status]}</span>
        <span className="badge-count">{tarefas.length}</span>
      </div>

      {tarefas.length === 0 ? (
        <div className="coluna-vazia">Nenhuma tarefa</div>
      ) : (
        tarefas.map((tarefa: ITarefa) => (
          <TaskCard key={tarefa.id} tarefa={tarefa} onMudarStatus={onMudarStatus} onMudarDia={onMudarDia} />
        ))
      )}
    </div>
  );
}
