import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PessoaService } from '../services/pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pessoa } from '../models/pessoa.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Imagem64Service } from '../services/imagem64.service';
import { Imagem64 } from '../models/imagem64.model';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ImagemService } from '../services/imagem.service';

@Component({
  selector: 'app-formulario-pessoa',
  templateUrl: './formulario-pessoa.component.html',
  styleUrls: ['./formulario-pessoa.component.css']
})
export class FormularioPessoaComponent implements OnInit {

  id: any = null;
  pessoa: Pessoa;

  formPessoa: FormGroup;
  imagemRgFoto = {id: '', nome: '', path: '', contentType: ''};
  imagemRgVerso = {id: '', nome: '', path: '', contentType: ''};

  // Exibir imagem, propriedades ligadas ao [src] do elemento html
  imagePathFoto = '';
  imagePathVerso = '';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private pessoaService: PessoaService, private imagem64Service: Imagem64Service,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
              private sanitizer: DomSanitizer, private http: HttpClient,
              private el: ElementRef, private imagemService: ImagemService) {
    this.formPessoa = this.fb.group({
      nomeCompleto: ['', Validators.required],
      rg: ['', Validators.required],
      orgaoEmissor: '',
      uf: '',
      cpf: '',
      dataNasc: new Date(),
      filiacaoPaterna: '',
      filiacaoMaterna: '',
      dataEmissao: new Date(),
    });

    this.pessoa = {
      id: '',
      nomeCompleto: '',
      numeroRg: '',
      orgaoEmissor: '',
      UF: '',
      CPF: '',
      filiacaoPaterna: '',
      filiacaoMaterna: '',
      dataEmissao: new Date(),
      email: '',
      dataNasc: new Date(),
      imagemRgFoto: '',
      imagemRgVerso: ''
    };
  }

  ngOnInit() {
    this.carregaPessoa();
  }

  carregaPessoa() {
    this.route.params.subscribe( params => {
      this.id = params.id;
      if (this.id) {
        this.pessoaService.getPessoaById(this.id).subscribe( (res: Pessoa) => {
          // Preencher formulario, como?
          this.pessoa = res;
          this.formPessoa.get('nomeCompleto').setValue(this.pessoa.nomeCompleto);
          this.formPessoa.get('rg').setValue(this.pessoa.numeroRg);
          this.formPessoa.get('orgaoEmissor').setValue(this.pessoa.orgaoEmissor);
          this.formPessoa.get('uf').setValue(this.pessoa.UF);
          this.formPessoa.get('cpf').setValue(this.pessoa.CPF);
          this.formPessoa.get('dataNasc').setValue(this.pessoaService.FormatDate(this.pessoa.dataNasc));
          this.formPessoa.get('filiacaoPaterna').setValue(this.pessoa.filiacaoPaterna);
          this.formPessoa.get('filiacaoMaterna').setValue(this.pessoa.filiacaoMaterna);
          this.formPessoa.get('dataEmissao').setValue(this.pessoaService.FormatDate(this.pessoa.dataEmissao));
          console.log('Carregou pessoa');
        },
        () => { console.log('erro carrega pessoa');
        },
        // onComplete do subscribe
        () => { this.carregaImagens();
        });
      } else {
        this.imagePathFoto = this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao('rgFoto');
        this.imagePathVerso = this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao('rgVerso');
        console.log(this.imagePathFoto);
      }
    });
  }

  // Carrega imagens frente e verso
  carregaImagens() {

    this.imagemService.getImagemById(this.pessoa.imagemRgFoto).subscribe( (res: any) => {
      if (res) {
        this.imagePathFoto = this.imagemService.getImgUrl() + res.path;
        this.imagemRgFoto.id = res._id;
        this.imagemRgFoto.nome = res.nome;
        this.imagemRgFoto.path = res.path;
        this.imagemRgFoto.contentType = res.contentType;
      }
    });

    this.imagemService.getImagemById(this.pessoa.imagemRgVerso).subscribe( (res: any) => {
      if (res) {
        this.imagePathVerso = this.imagemService.getImgUrl() + res.path;
        this.imagemRgVerso.id = res._id;
        this.imagemRgVerso.nome = res.nome;
        this.imagemRgVerso.path = res.path;
        this.imagemRgVerso.contentType = res.contentType;
      }
    });
  }

  onConfirmarPessoa(pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc, pFiliacaoPaterna, pFiliacaoMaterna,
                    pDataEmissao) {

    this.enviaPessoa(pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc, pFiliacaoPaterna, pFiliacaoMaterna,
                    pDataEmissao);
    this.formPessoa.reset();

    // zera tudo
    this.imagemRgFoto = {id: '', nome: '', path: '', contentType: ''};
    this.imagemRgVerso = {id: '', nome: '', path: '', contentType: ''};

    // Exibir imagem, propriedades ligadas ao [src] do elemento html
    this.imagePathFoto = '';
    this.imagePathVerso = '';

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagemVerso');
    inputEl.value = '';
    inputEl = this.el.nativeElement.querySelector('#imagemFoto');
    inputEl.value = '';

    // this.router.navigate([`/lista-pessoas`]);
  }

  enviaPessoa(pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc, pFiliacaoPaterna, pFiliacaoMaterna,
              pDataEmissao) {
        // Se tem Id, entao é update
    if (this.id) {
      this.pessoaService.updatePessoa(this.id, pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc,
                                        pFiliacaoPaterna, pFiliacaoMaterna, pDataEmissao,
                                        this.imagemRgFoto.id ? this.imagemRgFoto.id : null,
                                        this.imagemRgVerso.id ? this.imagemRgVerso.id : null)
      .subscribe( () => console.log('mandou editpessoa'));
    } else {
      this.pessoaService.addPessoa(pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc,
                                     pFiliacaoPaterna, pFiliacaoMaterna, pDataEmissao,
                                        this.imagemRgFoto.id ? this.imagemRgFoto.id : null,
                                        this.imagemRgVerso.id ? this.imagemRgVerso.id : null)
      .subscribe( () => console.log('mandou addpessoa'));
    }
  }

  uploadImagemFoto() {
    // locate the file element meant for the file upload.
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagemFoto');
    // get the total amount of files attached to the file input.
    const fileCount: number = inputEl.files.length;
    // create a new fromdata instance
    const formData = new FormData();
    // check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      // append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0), inputEl.files.item(0).name);
      // call the angular http method
      this.imagemService.addImagem(formData).subscribe(
                // map the success function and alert the response
                 (res: any) => {
                  if (res) {
                    this.imagePathFoto = this.imagemService.getImgUrl() + res.path;
                    this.imagemRgFoto.id = res._id;
                    this.imagemRgFoto.nome = res.nome;
                    this.imagemRgFoto.path = res.path;
                    this.imagemRgFoto.contentType = res.contentType;
                  }
                  console.log(res);
                },
                (error) => console.log());
    }
  }

  uploadImagemVerso() {
    // locate the file element meant for the file upload.
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagemVerso');
    // get the total amount of files attached to the file input.
    const fileCount: number = inputEl.files.length;
    // create a new fromdata instance
    const formData = new FormData();
    // check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      // append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0), inputEl.files.item(0).name);
      // call the angular http method
      this.imagemService.addImagem(formData).subscribe(
                // map the success function and alert the response
                 (res: any) => {
                  if (res) {
                    this.imagePathVerso = this.imagemService.getImgUrl() + res.path;
                    this.imagemRgVerso.id = res._id;
                    this.imagemRgVerso.nome = res.nome;
                    this.imagemRgVerso.path = res.path;
                    this.imagemRgVerso.contentType = res.contentType;
                  }
                  console.log(res);
                },
                (error) => console.log());
    }
  }

}
