import { Injectable } from '@angular/core';
import { Atividade } from '../models/atividade.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAtividades() {
    // Usa template string para concatenar caminho
    return this.http.get(`${this.uri}/atividades`);
  }

  // Busca atividades por usuario
  getAtividadesByUsuario(pUsuario) {
    return this.http.get(`${this.uri}/atividades/usuario/${pUsuario}`);
  }

  getAtividadeById(id) {
    return this.http.get(`${this.uri}/atividades/${id}`);
  }


  addAtividade(pUsuario, pDataHoraInicio, pDataHoraTermino, pSigla, pDescricao) {
    const atividadeCadastrada = {
      usuario: pUsuario,
      dataHoraInicio: pDataHoraInicio,
      dataHoraTermino: pDataHoraTermino,
      sigla: pSigla,
      descricao: pDescricao
    };
    return this.http.post(`${this.uri}/atividades/cadastrar`, atividadeCadastrada);
  }
  updateAtividade(pId, pUsuario, pDataHoraInicio, pDataHoraTermino, pSigla, pDescricao) {
    const atividadeEditada = {
      usuario: pUsuario,
      dataHoraInicio: pDataHoraInicio,
      dataHoraTermino: pDataHoraTermino,
      sigla: pSigla,
      descricao: pDescricao
    };
    console.log('Chamou edição');
    console.log(pId);

    return this.http.post(`${this.uri}/atividades/editar/${pId}`, atividadeEditada);
  }

  deleteAtividade(pId) {
    return this.http.get(`${this.uri}/atividades/excluir/${pId}`);
  }

  // Métodos uteis
  FormatDate(iDate: Date) {
    const inputDate = new Date(iDate);
    let formattedDate = inputDate.getFullYear() + '-';
    if ((inputDate.getMonth() + 1) < 10) {
      formattedDate += '0' + (inputDate.getMonth() + 1);
    } else {
      formattedDate += (inputDate.getMonth() + 1);
    }
    // Se a data for < 10, nao pode esquecer o zero a esquerda
    if ( (inputDate.getDate() + 1) < 10) {
      formattedDate += '-0' + (inputDate.getDate() + 1);
    } else {
      formattedDate += '-' + (inputDate.getDate() + 1);
    }
    return formattedDate;
  }
}
