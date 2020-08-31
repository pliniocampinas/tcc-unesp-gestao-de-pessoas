import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OcorrenciaService } from '../services/ocorrencia.service';



@Component({
  selector: 'app-grid-ocorrencia',
  templateUrl: './grid-ocorrencia.component.html',
  styleUrls: ['./grid-ocorrencia.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])// ,
  ]// ,
})
export class GridOcorrenciaComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['titulo', 'usuario', 'tipo', 'acoes'];
  listaOcorrencias: any = [];
  ocorrrenciasSub: Subscription;

  constructor(private ocorrenciaService: OcorrenciaService, private router: Router) { }

  ngOnInit() {
    this.buscar();
  }

  // Previne memory leak
  ngOnDestroy() {
    this.ocorrrenciasSub.unsubscribe();
  }

  buscar() {
    this.ocorrrenciasSub = this.ocorrenciaService.getOcorrencias().subscribe(
      (ocorrencias) => {
          this.listaOcorrencias = ocorrencias;
      },
      null,
      null
    );
  }
  cadastrar() {
    this.router.navigate([`/cadastrar-ocorrencia`]);
  }
  editar(id) {
    this.router.navigate([`/cadastrar-ocorrencia/${id}`]);
  }

  apagar(id) {
    this.ocorrenciaService.deleteOcorrencia(id).subscribe( () => {
      this.buscar();
    });
  }

}
