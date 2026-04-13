export type StatusTarefa = "afazer" | "andamento" | "concluida" | "atrasada";

export type DiaSemana =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado"
  | "Domingo";

export interface ITarefa {
  id: number;
  titulo: string;
  diaSemana: DiaSemana;
  status: StatusTarefa;
  iniciadoEm: number | null;      // timestamp Date.now() quando clicou Iniciar
  concluidoEm: string | null;     // data formatada "dd/mm/aaaa hh:mm"
  segundosGastos: number;         // acumulado em segundos
}

export interface IDashboardStats {
  afazer: number;
  andamento: number;
  concluida: number;
  atrasada: number;
}

export interface ITaskCardProps {
  tarefa: ITarefa;
  onMudarStatus: (id: number, novoStatus: StatusTarefa) => void;
  onMudarDia: (id: number, novoDia: DiaSemana) => void;
}

export interface IColunaProps {
  titulo: string;
  status: StatusTarefa;
  tarefas: ITarefa[];
  onMudarStatus: (id: number, novoStatus: StatusTarefa) => void;
  onMudarDia: (id: number, novoDia: DiaSemana) => void;
}

export interface IDashboardProps {
  stats: IDashboardStats;
}
