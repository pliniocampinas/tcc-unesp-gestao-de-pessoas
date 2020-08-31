import { Time } from '@angular/common';

export interface Atividade {
  usuario: string;
  dataInicio: Date;
  horaInicio: Time;
  dataTermino: Date;
  horaTermino: Time;
  sigla: string;
  descricao: string;
}
