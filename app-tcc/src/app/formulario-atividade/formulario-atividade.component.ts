import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AtividadeService } from '../services/atividade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Atividade } from '../models/atividade.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulario-atividade',
  templateUrl: './formulario-atividade.component.html',
  styleUrls: ['./formulario-atividade.component.css']
})
export class FormularioAtividadeComponent implements OnInit {

  id: any = null;
  atividade: any;
  formAtividade: FormGroup;
  atividadePadronizada = false;

  constructor(private atividadeService: AtividadeService, private roter: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formAtividade = this.fb.group({
      usuario: ['', Validators.required],
      dataInicio: new Date(),
      horaInicio: '',
      dataTermino: new Date(),
      horaTermino: '',
      sigla: '',
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Nao farei edição desse form, só será possível apagar e cadastrar
    // this.route.params.subscribe( params => {
    //   this.id = params.id;
    //   if (this.id) {
    //     this.atividadeService.getAtividadeById(this.id).subscribe( res => {
    //       // Preencher formulario, como?
    //       this.atividade = res;
    //       this.formAtividade.get('usuario').setValue(this.atividade.usuario);
    //       this.formAtividade.get('dataInicio').setValue(this.atividadeService.FormatDate(this.atividade.dataHoraInicio));
    //       this.formAtividade.get('horaInicio').setValue(this.atividade.dataHoraInicio);
    //       this.formAtividade.get('dataTermino').setValue(this.atividadeService.FormatDate(this.atividade.dataHoraTermino));
    //       this.formAtividade.get('horaTermino').setValue(this.atividade.dataHoraTermino);
    //       this.formAtividade.get('sigla').setValue(this.atividade.sigla);
    //       this.formAtividade.get('descricao').setValue(this.atividade.descricao);
    //     });
    //  }

    // });
  }


  onConfirmarAtividade(pUsuario, pDataInicio, pHoraInicio, pDataTermino, pHoraTermino, pSigla, pDescricao) {
    // Monta data-hora
    const dataHoraInicio = new Date(pDataInicio + ' ' + pHoraInicio);
    const dataHoraTermino = new Date(pDataTermino + ' ' + pHoraTermino);

    console.log(dataHoraInicio);
    console.log(dataHoraTermino);

    // Se tem Id, entao é update
    if (this.id) {
      this.atividadeService.updateAtividade(this.id, pUsuario, dataHoraInicio, dataHoraTermino, pSigla,
                                        pDescricao)
      .subscribe( () => console.log('mandou editatividade'));
    } else {
      this.atividadeService.addAtividade(pUsuario, dataHoraInicio, dataHoraTermino, pSigla, pDescricao)
      .subscribe( () => console.log('mandou addatividade'));
    }
    this.formAtividade.reset();
  }

  // Preenche a data término com a data inicial, por padrão
  onDataInicioChange() {
    this.formAtividade.get('dataTermino').setValue(this.formAtividade.get('dataInicio').value);
  }
}


