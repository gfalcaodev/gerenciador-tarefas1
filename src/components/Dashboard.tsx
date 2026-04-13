import { IDashboardProps } from "../types/ITarefa";

export default function Dashboard({ stats }: IDashboardProps) {
  return (
    <section className="dashboard">
      <h2>Resumo da Semana</h2>
      <div className="row text-center g-2">
        <div className="col-6 col-md-3">
          <div className="stat-item stat-afazer">
            <div className="stat-numero">{stats.afazer}</div>
            <div className="stat-label">A Fazer</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-item stat-andamento">
            <div className="stat-numero">{stats.andamento}</div>
            <div className="stat-label">Em Andamento</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-item stat-concluida">
            <div className="stat-numero">{stats.concluida}</div>
            <div className="stat-label">Concluídas</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-item stat-atrasada">
            <div className="stat-numero">{stats.atrasada}</div>
            <div className="stat-label">Atrasadas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
