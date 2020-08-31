import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Imagem64Service {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getImagens64() {
    // Usa template string para concatenar caminho
    return this.http.get(`${this.uri}/imagens64`);
  }

  getImagem64ById(id) {
    return this.http.get(`${this.uri}/imagens64/${id}`);
  }

  addImagem64(pNome, pTipo, pDescricao, pBase64) {
    const imagem64 = {
      nome: pNome,
      tipo: pTipo,
      descricao: pDescricao,
      base64: pBase64
    };
    return this.http.post(`${this.uri}/imagens64/cadastrar`, imagem64);
  }

  updateImagem64(pId, pNome, pTipo, pDescricao, pBase64) {
    const imagem64 = {
      nome: pNome,
      tipo: pTipo,
      descricao: pDescricao,
      base64: pBase64
    };

    console.log('Chamou edição');
    console.log(pId);

    return this.http.post(`${this.uri}/imagens64/editar/${pId}`, imagem64);
  }

  deleteImagem64(pId) {
    return this.http.get(`${this.uri}/imagens64/excluir/${pId}`);
  }

}


