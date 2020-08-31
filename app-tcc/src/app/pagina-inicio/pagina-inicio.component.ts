import { Component, OnInit } from '@angular/core';
import { UsuarioLogadoService } from '../services/usuario-logado.service';
import { Usuario } from '../models/usuario.model';
import { ImagemService } from '../services/imagem.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  usuarioLogado = '';
  usuarioObj: any = {_id: '', nomeCompleto: '', usuario: '', email: '', dataNasc: '', senha: '', privilegio: '', imagemPerfil: '' };

  pathPerfil = '';

  constructor(private usuarioLogadoService: UsuarioLogadoService, private imagemService: ImagemService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    const usuarioL = this.usuarioLogadoService.getUsuarioLogado();
    this.usuarioLogado = usuarioL[0].usuario;
    console.log(this.usuarioLogado);
    this.usuarioService.getUsuarioByUserName(this.usuarioLogado).subscribe( (usuario: any) => {
      this.usuarioObj = usuario;
    },
    null,
    () => {
      this.imagemService.getImagemById(this.usuarioObj.imagemPerfil).subscribe( (imagem: any) => {
        this.pathPerfil = imagem.path;
      });
    });
  }

  getPath( path ) {
    if (path) {
      return this.imagemService.getImgUrl() + path;
    } else {
      return this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao();
    }
  }

  getIdade(date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
  }

}
