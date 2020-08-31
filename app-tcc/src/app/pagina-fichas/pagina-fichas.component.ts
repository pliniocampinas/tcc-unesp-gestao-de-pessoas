import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ImagemService } from '../services/imagem.service';
import { Subscription } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-pagina-fichas',
  templateUrl: './pagina-fichas.component.html',
  styleUrls: ['./pagina-fichas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaginaFichasComponent implements OnInit, OnDestroy {

  dataSource: any = [];
  columnsToDisplay = ['usuario', 'nomeCompleto']; // ['name', 'weight', 'symbol', 'position'];
  // expandedElement: PeriodicElement | null;
  expandedElement: any | null;

  usuariosSub: Subscription;
  listaUsuarios: any = [];
  listaUsuariosComPath: any = [];
  listaImagens: any[];

  constructor(private usuarioService: UsuarioService, private imagemService: ImagemService) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

    // Previne memory leak
  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  buscarUsuarios() {
    this.usuariosSub = this.usuarioService.getUsuarios().subscribe(
      (usuarios: any) => {

          this.listaUsuarios = usuarios;
          const lengthLista = this.listaUsuarios.length;
          for (let i = 0; i < lengthLista; i++) {
            const usuarioComPath = {
              id: this.listaUsuarios[i]._id,
              nomeCompleto: this.listaUsuarios[i].nomeCompleto,
              usuario: this.listaUsuarios[i].usuario,
              email: this.listaUsuarios[i].email,
              dataNasc: this.listaUsuarios[i].dataNasc,
              senha: this.listaUsuarios[i].senha,
              privilegio: this.listaUsuarios[i].Privilegio,
              imagemPerfil: this.listaUsuarios[i].ImagemPerfil,
              imagemPath: ''
            };
            this.listaUsuariosComPath.push(usuarioComPath);
          }

      },
      null,
      () => this.buscarImagens()
    );
  }

  buscarImagens() {
    this.imagemService.getImagens().subscribe( (imagens: any) => {
      this.listaImagens = imagens;
      // Percorre lista de usuarios
      const lengthListaUsuarios = this.listaUsuarios.length;
      for (let i = 0; i < lengthListaUsuarios; i++) {
        // Para cada item da lista, procura uma imagem com id igual
        const lengthListaImagens = this.listaImagens.length;
        for (let j = 0; j < lengthListaImagens; j++) {
          if ( this.listaUsuarios[i].imagemPerfil === this.listaImagens[j]._id) {
            this.listaUsuariosComPath[i].imagemPath = this.listaImagens[j].path;
          }
        }
      }
      console.log(this.listaUsuariosComPath);

    },
    null,
    () => this.dataSource = this.listaUsuariosComPath);
  }

  buscarPorNome(pNome) {
    // this.pessoaService.getAtividadesByUsuario(pUsuario).subscribe( (atividades) => {
    //   this.listaAtividades = atividades;
    // });
  }

  limparFiltros() {
    // Busca todos
    // this.buscarAtividades();
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
