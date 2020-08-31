import { Injectable } from '@angular/core';
import { Ocorrencia } from '../models/ocorrencia.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getOcorrencias() {
    // Usa template string para concatenar caminho
    return this.http.get(`${this.uri}/ocorrencias`);
  }

  getOcorrenciaById(id) {
    return this.http.get(`${this.uri}/ocorrencias/${id}`);
  }


  addOcorrencia(pNomeUsuario, pUsuarioId, pTipo, pTitulo, pTexto) {
    const ocorrenciaCadastrada = {
      nomeUsuario: pNomeUsuario,
      // Comentado para nao dar pau passando ''
      // usuarioId: pUsuarioId,
      tipo: pTipo,
      titulo: pTitulo,
      texto: pTexto
    };
    return this.http.post(`${this.uri}/ocorrencias/cadastrar`, ocorrenciaCadastrada);
  }
  updateOcorrencia(pId, pNomeUsuario, pUsuarioId, pTipo, pTitulo, pTexto) {
    const atividadeEditada = {
      nomeUsuario: pNomeUsuario,
      // usuarioId: pUsuarioId,
      tipo: pTipo,
      titulo: pTitulo,
      texto: pTexto
    };
    console.log('Chamou edição');
    console.log(pId);

    return this.http.post(`${this.uri}/ocorrencias/editar/${pId}`, atividadeEditada);
  }

  deleteOcorrencia(pId) {
    return this.http.get(`${this.uri}/ocorrencias/excluir/${pId}`);
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
