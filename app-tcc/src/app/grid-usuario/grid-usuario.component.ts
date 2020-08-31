import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

// Interface de pessoa
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-usuario',
  templateUrl: './grid-usuario.component.html',
  styleUrls: ['./grid-usuario.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])// ,
  ]// ,
})
export class GridUsuarioComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['nome-completo', 'usuario', 'email', 'acoes'];
  listaUsuarios: any = [];
  usuariosSub: Subscription;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

  // Previne memory leak
  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  buscarUsuarios() {
    this.usuariosSub = this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
          this.listaUsuarios = usuarios;
      },
      null,
      null
    );
  }
  cadastrarUsuario() {
    this.router.navigate([`/cadastrar-usuario`]);
  }
  editarUsuario(id) {
    this.router.navigate([`/cadastrar-usuario/${id}`]);
  }

  apagarUsuario(id) {
    this.usuarioService.deleteUsuario(id).subscribe( () => {
      this.buscarUsuarios();
    });
  }

}
