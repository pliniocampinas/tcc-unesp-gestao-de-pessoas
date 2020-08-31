import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogadoService {

  private usuarioLogado: Usuario[] = [
    {
      nomeCompleto: '',
      usuario: 'plinioc',
      email: '',
      dataNasc: new Date(),
      senha: '',
      privilegio: 0
    }
  ];

  private usuarioLogadoUpdated = new Subject<Usuario[]>();

  constructor() { }

  // Versão antiga dos métodos, guardavam tudo na memória local, foi alterado para ler e gravar do banco
  getUsuarioLogado() {
    // [...] os 3 pontos mandam uma cópia do objeto, não o endereço do objeto
    return [...this.usuarioLogado];
  }

  getUsuarioLogadoUpdateListerner() {
    // retorna um observable da lista de pessoas
    return this.usuarioLogadoUpdated.asObservable();
  }

  autenticaUsuario(usuario: Usuario) {
    // atualiza o objeto private
    this.usuarioLogado.push(usuario);
    // atualiza o observable/subject
    this.usuarioLogadoUpdated.next([...this.usuarioLogado]);
  }

}
