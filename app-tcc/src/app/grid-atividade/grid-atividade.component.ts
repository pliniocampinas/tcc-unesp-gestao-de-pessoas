import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Atividade } from '../models/atividade.model';
import { AtividadeService } from '../services/atividade.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-atividade',
  templateUrl: './grid-atividade.component.html',
  styleUrls: ['./grid-atividade.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])// ,
  ]// ,
})
export class GridAtividadeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['usuario', 'data-inicio', 'hora-inicio', 'hora-termino', 'descricao', 'acoes'];
  listaAtividades: any = [];
  atividadesSub: Subscription;

  constructor(public atividadeService: AtividadeService, private router: Router) { }

  ngOnInit() {
    this.buscarAtividades();
  }

  // Previne memory leak
  ngOnDestroy() {
    this.atividadesSub.unsubscribe();
  }

  buscarAtividades() {
    this.atividadesSub = this.atividadeService.getAtividades().subscribe(
      (atividades) => {
          this.listaAtividades = atividades;
      },
      null,
      null
    );
  }

  cadastrar() {
    this.router.navigate([`/cadastrar-atividade`]);
  }

  editar(id) {
    this.router.navigate([`/cadastrar-atividade/${id}`]);
  }

  apagar(id) {
    this.atividadeService.deleteAtividade(id).subscribe( () => {
      this.buscarAtividades();
    });
  }

  buscarPorUsuario(pUsuario) {
    this.atividadeService.getAtividadesByUsuario(pUsuario).subscribe( (atividades) => {
      this.listaAtividades = atividades;
    });
  }

  limparFiltros() {
    // Busca todos
    this.buscarAtividades();
  }

}
