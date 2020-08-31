import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  uri = 'http://localhost:4000';
  ImgURL = 'http://localhost:4000/images/';

  constructor(private http: HttpClient) { }

  getImagens() {
    return this.http.get(`${this.uri}/imagens`);
  }

  getImagemById(id) {
    return this.http.get(`${this.uri}/imagens/${id}`);
  }

  addImagem(formData: FormData) {

    return this.http.post(`${this.uri}/imagens/cadastrar`, formData);
  }

  getImgUrl() {
    return this.ImgURL;
  }

  getImgPathPadrao(pTipo = 'perfil') {
    if ( pTipo === 'perfil') {
      return 'img-perfil-padrao.jpg';

    } else if ( pTipo === 'rgFoto') {
      return 'modelo-foto.jpg';
    } else if ( pTipo === 'rgVerso') {
      return 'modelo-verso.jpg';
    } else if ( pTipo === 'grafico-idade') {
      return 'grafico-idade.png';
    } else if ( pTipo === 'grafico-atividades') {
      return 'grafico-atividades.png';
    } else if ( pTipo === 'grafico-pizza') {
      return 'grafico-pizza.png';
    }

  }

}
