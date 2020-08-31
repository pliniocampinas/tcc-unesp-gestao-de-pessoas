import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  usuario: any;
  formLogin: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      senha: '',
    });
  }

  ngOnInit() {
  }

  onConfirmarLogin(pUsuario, pSenha) {
    this.router.navigate([`/inicio`]);
  }

}
