import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OcorrenciaService } from '../services/ocorrencia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ocorrencia } from '../models/ocorrencia.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulario-ocorrencia',
  templateUrl: './formulario-ocorrencia.component.html',
  styleUrls: ['./formulario-ocorrencia.component.css']
})
export class FormularioOcorrenciaComponent implements OnInit {

  id: any = null;
  ocorrencia: Ocorrencia;
  formOcorrencia: FormGroup;

  opcoesSelectOcorrencia = ['ADVERTENCIA', 'EVENTO', 'NOTIFICACAO'];

  constructor(private ocorrenciaService: OcorrenciaService, private roter: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formOcorrencia = this.fb.group({
      nomeUsuario: ['', Validators.required],
      tipo: ['', Validators.required],
      titulo: '',
      texto: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = params.id;
      if (this.id) {
        this.ocorrenciaService.getOcorrenciaById(this.id).subscribe( (res: Ocorrencia) => {
          // Preencher formulario, como?
          this.ocorrencia = res;
          this.formOcorrencia.get('nomeUsuario').setValue(this.ocorrencia.nomeUsuario);
          this.formOcorrencia.get('tipo').setValue(this.ocorrencia.tipo);
          this.formOcorrencia.get('titulo').setValue(this.ocorrencia.titulo);
          this.formOcorrencia.get('texto').setValue(this.ocorrencia.texto);
        });
      }

    });
  }

  onConfirmar(pNomeUsuario, pTipo, pTitulo, pTexto) {
    // Se tem Id, entao é update
    if (this.id) {
      this.ocorrenciaService.updateOcorrencia(this.id, pNomeUsuario, '', pTipo, pTitulo, pTexto)
      .subscribe( () => console.log('mandou editocorrencia'));
    } else {
      this.ocorrenciaService.addOcorrencia(pNomeUsuario, '', pTipo, pTitulo, pTexto)
      .subscribe( () => console.log('mandou addOcorrencia'));
    }
    this.formOcorrencia.reset();
  }

  onApagar(form: NgForm) {
    if (this.id) {

    }
    form.reset();
  }

}
