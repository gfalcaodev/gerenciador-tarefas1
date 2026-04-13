import { ITarefa } from "../types/ITarefa";

interface ISidebarProps {
  tarefas: ITarefa[];
}

function formatarTempo(segundos: number): string {
  if (segundos === 0) return "—";
  if (segundos < 60) return `${segundos}s`;
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function Sidebar({ tarefas }: ISidebarProps) {
  const totalSegundos: number = tarefas.reduce(
    (acc: number, t: ITarefa) => acc + t.segundosGastos,
    0
  );

  const maxSegundos: number = Math.max(
    ...tarefas.map((t: ITarefa) => t.segundosGastos),
    1
  );

  return (
    <aside className="sidebar">
      <h2 className="sidebar-titulo">⏱️ Tempo Gasto</h2>
      <p className="sidebar-subtitulo">Acumulado por atividade</p>

      <div className="sidebar-lista">
        {tarefas.map((tarefa: ITarefa) => {
          const porcentagem: number =
            tarefa.segundosGastos > 0
              ? Math.round((tarefa.segundosGastos / maxSegundos) * 100)
              : 0;

          return (
            <div key={tarefa.id} className="sidebar-item">
              <div className="sidebar-item-header">
                <span className="sidebar-item-titulo">{tarefa.titulo}</span>
                <span className="sidebar-item-tempo">
                  {formatarTempo(tarefa.segundosGastos)}
                </span>
              </div>
              <div className="sidebar-barra-fundo">
                <div
                  className="sidebar-barra-preenchida"
                  style={{ width: `${porcentagem}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar-total">
        <span>Total gasto</span>
        <strong>{formatarTempo(totalSegundos)}</strong>
      </div>
    </aside>
  );
}
