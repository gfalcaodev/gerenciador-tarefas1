import { ITarefa, StatusTarefa, DiaSemana } from "../types/ITarefa";
import Coluna from "./Coluna";

interface ITaskListProps {
  tarefas: ITarefa[];
  onMudarStatus: (id: number, novoStatus: StatusTarefa) => void;
  onMudarDia: (id: number, novoDia: DiaSemana) => void;
}

const colunas: StatusTarefa[] = ["afazer", "andamento", "atrasada", "concluida"];

export default function TaskList({ tarefas, onMudarStatus, onMudarDia }: ITaskListProps) {
  return (
    <section>
      <div className="row g-3">
        {colunas.map((status: StatusTarefa) => (
          <div key={status} className="col-12 col-sm-6 col-lg-3">
            <Coluna
              titulo={status}
              status={status}
              tarefas={tarefas.filter((t: ITarefa) => t.status === status)}
              onMudarStatus={onMudarStatus}
              onMudarDia={onMudarDia}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
