import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/pessoa.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-grid-pessoa',
  templateUrl: './grid-pessoa.component.html',
  styleUrls: ['./grid-pessoa.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])// ,
  ]// ,
})
export class GridPessoaComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['nome-completo', 'rg', 'data-nasc', 'acoes'];
  listaPessoas: any = [];
  pessoasSub: Subscription;

  constructor(public pessoaService: PessoaService, private router: Router, public utilsService: UtilsService) { }

  ngOnInit() {
    this.buscarPessoas();
  }

  // Previne memory leak
  ngOnDestroy() {
    this.pessoasSub.unsubscribe();
  }

  buscarPessoas() {
    this.pessoasSub = this.pessoaService.getPessoas().subscribe(
      (pessoas) => {
          this.listaPessoas = pessoas;
          console.log(pessoas);
      },
      null,
      null
    );
  }

  cadastrar() {
    this.router.navigate([`/cadastrar-pessoa`]);
  }

  editar(id) {
    this.router.navigate([`/cadastrar-pessoa/${id}`]);
  }

  apagar(id) {
    this.pessoaService.deletePessoa(id).subscribe( () => {
      this.buscarPessoas();
    });
  }
}
