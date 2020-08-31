import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { GridUsuarioComponent } from './grid-usuario/grid-usuario.component';

import { GridPessoaComponent } from './grid-pessoa/grid-pessoa.component';
import { FormularioPessoaComponent } from './formulario-pessoa/formulario-pessoa.component';

import { FormularioAtividadeComponent } from './formulario-atividade/formulario-atividade.component';
import { GridAtividadeComponent } from './grid-atividade/grid-atividade.component';

import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';

import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PaginaFichasComponent } from './pagina-fichas/pagina-fichas.component';
import { FormularioOcorrenciaComponent } from './formulario-ocorrencia/formulario-ocorrencia.component';
import { GridOcorrenciaComponent } from './grid-ocorrencia/grid-ocorrencia.component';
import { VisaoGeralComponent } from './visao-geral/visao-geral.component';
import { PaginaGraficoIdadeComponent } from './pagina-grafico-idade/pagina-grafico-idade.component';
import { PaginaGraficoAtividadesComponent } from './pagina-grafico-atividades/pagina-grafico-atividades.component';
import { PaginaGraficoEstadosComponent } from './pagina-grafico-estados/pagina-grafico-estados.component';



const routes: Routes = [
  // Usuarios
  { path: 'cadastrar-usuario', component: FormularioUsuarioComponent },
  { path: 'cadastrar-usuario/:id', component: FormularioUsuarioComponent },
  { path: 'lista-usuarios',      component: GridUsuarioComponent },
  // Pessoas
  { path: 'cadastrar-pessoa', component: FormularioPessoaComponent },
  { path: 'cadastrar-pessoa/:id', component: FormularioPessoaComponent },
  { path: 'lista-pessoas',      component: GridPessoaComponent },
  // Atividades
  { path: 'cadastrar-atividade', component: FormularioAtividadeComponent },
  { path: 'cadastrar-atividade/:id', component: FormularioAtividadeComponent },
  { path: 'lista-atividades',      component: GridAtividadeComponent },
  // Perfil
  { path: 'login',      component: FormularioLoginComponent },
  // Login
  { path: 'perfil',      component: PaginaPerfilComponent },
  // Inicio
  { path: 'inicio',      component: PaginaInicioComponent },
  // Fichas
  { path: 'fichas', component: PaginaFichasComponent},
  // Ocorrencias
  { path: 'cadastrar-ocorrencia', component: FormularioOcorrenciaComponent},
  { path: 'cadastrar-ocorrencia/:id', component: FormularioOcorrenciaComponent},
  { path: 'lista-ocorrencias', component: GridOcorrenciaComponent},
  // Visao Geral
  { path: 'visao-geral', component: VisaoGeralComponent},
  // Graficos
  { path: 'grafico-idade', component: PaginaGraficoIdadeComponent},
  { path: 'grafico-atividades', component: PaginaGraficoAtividadesComponent},
  { path: 'grafico-estados', component: PaginaGraficoEstadosComponent},


  { path: '',   redirectTo: '/inicio', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
