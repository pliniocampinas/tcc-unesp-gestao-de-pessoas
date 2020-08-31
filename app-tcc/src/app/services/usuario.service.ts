import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    // Usa template string para concatenar caminho
    return this.http.get(`${this.uri}/usuarios`);
  }

  getUsuariosComPath() {
    // Usa template string para concatenar caminho
    return this.http.get(`${this.uri}/usuarios-com-path`);
  }

  getUsuarioById(id) {
    return this.http.get(`${this.uri}/usuarios/${id}`);
  }

  getUsuarioByUserName(usuario) {
    return this.http.get(`${this.uri}/usuarios-username/${usuario}`);
  }

  addUsuario(pNomeCompleto, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio, pImagemPerfil) {
    const usuarioCadastrado = {
      nomeCompleto: pNomeCompleto,
      usuario: pUsuario,
      email: pEmail,
      dataNasc: pDataNasc,
      senha: pSenha,
      privilegio: pPrivilegio,
      imagemPerfil: pImagemPerfil
    };
    return this.http.post(`${this.uri}/usuarios/cadastrar`, usuarioCadastrado);
  }

  addUsuarioObj(pUsuarioNovo) {
    return this.addUsuario(
      pUsuarioNovo.nomeCompleto,
      pUsuarioNovo.usuario,
      pUsuarioNovo.email,
      pUsuarioNovo.dataNasc,
      pUsuarioNovo.senha,
      pUsuarioNovo.privilegio,
      pUsuarioNovo.pImagemPerfil
      );
  }

  updateUsuario(pId, pNomeCompleto, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio, pImagemPerfil) {
    const usuarioEditado = {
      nomeCompleto: pNomeCompleto,
      usuario: pUsuario,
      email: pEmail,
      dataNasc: pDataNasc,
      senha: pSenha,
      privilegio: pPrivilegio,
      imagemPerfil: pImagemPerfil
    };
    console.log('Chamou edição');
    console.log(pId);

    return this.http.post(`${this.uri}/usuarios/editar/${pId}`, usuarioEditado);
  }

  deleteUsuario(pId) {
    return this.http.get(`${this.uri}/usuarios/excluir/${pId}`);
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
