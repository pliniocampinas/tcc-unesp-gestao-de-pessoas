import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { DatePipe } from '@angular/common';

import { DomSanitizer } from '@angular/platform-browser';
import { Imagem64Service } from '../services/imagem64.service';
import { Imagem64 } from '../models/imagem64.model';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ImagemService } from '../services/imagem.service';
// import the do function to be used with the http library.
// import 'rxjs/add/operator/do';
// import the map function to be used with the http library
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  id: any = null;
  usuario: any;
  formUsuario: FormGroup;

  imagemPerfil = {id: '', nome: '', path: '', contentType: ''};
  // Imagem64 = { id: '', nome: '', tipo: '', base64: '', descricao: ''};
  imagemPerfilAlterada = false;

  // Exibir imagem, propriedades ligadas ao [src] do elemento html
  imagePathPerfil = ''; // 'http://localhost:4000/1fb6615e701be50ed6369b00702693ec.png';


  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private usuarioService: UsuarioService, private roter: Router, private route: ActivatedRoute, private fb: FormBuilder,
              private sanitizer: DomSanitizer, private imagem64Service: Imagem64Service, private http: HttpClient,
              private el: ElementRef, private imagemService: ImagemService) {
    this.formUsuario = this.fb.group({
      nomeCompleto: ['', Validators.required],
      usuario: ['', Validators.required],
      email: '',
      dataNasc: new Date(),
      senha: '',
      privilegio: 0
       // imagemPerfil: null
    });
  }


  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = params.id;
      if (this.id) {
        this.usuarioService.getUsuarioById(this.id).subscribe( res => {
          // Preencher formulario, como?
          this.usuario = res;
          this.formUsuario.get('nomeCompleto').setValue(this.usuario.nomeCompleto);
          this.formUsuario.get('usuario').setValue(this.usuario.usuario);
          this.formUsuario.get('email').setValue(this.usuario.email);
          // this.formUsuario = this.usuarioService.FormatDate(this.usuario.dataNasc);
          this.formUsuario.get('dataNasc').setValue(this.usuarioService.FormatDate(this.usuario.dataNasc));
          this.formUsuario.get('senha').setValue(this.usuario.senha);
          this.formUsuario.get('privilegio').setValue(this.usuario.privilegio);
        },
        () => console.log('Erro'),
        () => { this.carregaImagens();
                console.log('Carregou imagem');
        } );
      } else {
        this.imagePathPerfil = this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao();
        console.log(this.imagePathPerfil);
      }

    });
  }

  carregaImagens() {
    this.imagemService.getImagemById(this.usuario.imagemPerfil).subscribe( (res: any) => {
      if (res) {
        this.imagePathPerfil = this.imagemService.getImgUrl() + res.path;
        this.imagemPerfil.id = res._id;
        this.imagemPerfil.nome = res.nome;
        this.imagemPerfil.path = res.path;
        this.imagemPerfil.contentType = res.contentType;
      }
    });

    // this.imagem64Service.getImagem64ById(this.usuario.imagemPerfil).subscribe( res => {
    //   const imagem: any = res;
    //   this.imagemPerfil.id = imagem._id;
    //   this.imagemPerfil.nome = imagem.nome;
    //   this.imagemPerfil.tipo = imagem.tipo;
    //   this.imagemPerfil.base64 = imagem.base64;
    //   this.imagemPerfil.descricao = imagem.descricao;
    //   this.imagePathFoto = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
    //   + this.imagemPerfil.base64);
    // });

  }

  onConfirmarUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio) {

    // this.enviaImagemFotoEUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio);
    this.enviaUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio);

    this.formUsuario.reset();

    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagemPerfil');
    inputEl.value = '';
    this.imagemPerfil = {id: '', nome: '', path: '', contentType: ''};
    this.imagePathPerfil = '';
  }

  enviaImagemFotoEUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio) {
    // if (this.usuario.imagemPerfil) {
    //   this.imagem64Service.updateImagem64(this.usuario.imagemPerfil, this.imagemPerfil.nome, this.imagemPerfil.tipo,
    //                                       this.imagemPerfil.descricao, this.imagemPerfil.base64)
    //   .subscribe( (res: any) => { this.imagemPerfil.id = res._id; },
    //   // onError, é o método executado em caso de erro
    //   () => {
    //     this.enviaUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio);
    //     console.log('Erro no envio da imagemPerfil');
    //   },
    //   // onCOmpleto enviando imagemPerfil, envia usuario
    //   () => {
    //     this.enviaUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio);
    //   });
    // } else {
    //   this.imagem64Service.addImagem64(this.imagemPerfil.nome, this.imagemPerfil.tipo,
    //                                    this.imagemPerfil.descricao, this.imagemPerfil.base64)
    //   .subscribe( (res: any) => { this.imagemPerfil.id = res._id; },
    //   // onError, é o método executado em caso de erro
    //   () => {
    //     this.enviaUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio);
    //     console.log('Erro no envio da imagemPerfil');
    //   },
    //   // onComplete enviando imagemPerfil, envia usuario
    //   () => {
    //     this.enviaUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio);
    //   });
    // }
  }

  enviaUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio) {
    // Se tem Id, entao é update
    if (this.id) {
      this.usuarioService.updateUsuario(this.id, pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio,
        this.imagemPerfil.id ? this.imagemPerfil.id : null)
      .subscribe( () => console.log('mandou editusuario'));
    } else {
      this.usuarioService.addUsuario(pNome, pUsuario, pEmail, pDataNasc, pSenha, pPrivilegio,
        this.imagemPerfil.id ? this.imagemPerfil.id : null)
      .subscribe( () => console.log('mandou addusuario'));
    }
  }

  onFileChangePerfil(event) {
    // const reader = new FileReader();
    // if (event.target.files && event.target.files.length > 0) {
    //   console.log('Entrou evento guarda arquivo');
    //   const file = event.target.files[0];
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.imagemPerfil.nome = file.name;
    //     this.imagemPerfil.tipo = file.type;
    //     this.imagemPerfil.base64 = (reader.result as string).split(',')[1];
    //     this.imagePathFoto = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
    //              + this.imagemPerfil.base64);
    //     this.imagemPerfilAlterada = true;
    //   };
    // }
  }

  uploadImagem() {
    // locate the file element meant for the file upload.
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagemPerfil');
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
                    this.imagePathPerfil = this.imagemService.getImgUrl() + res.path;
                    this.imagemPerfil.id = res._id;
                    this.imagemPerfil.nome = res.nome;
                    this.imagemPerfil.path = res.path;
                    this.imagemPerfil.contentType = res.contentType;
                  }

                  console.log(res);
                },
                (error) => console.log());
    }
  }
}
