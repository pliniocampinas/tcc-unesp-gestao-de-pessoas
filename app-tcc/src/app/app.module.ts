import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatTableModule, MatSidenavModule,
          MatMenuModule, MatIconModule, MatListModule, MatToolbarModule, MatTreeModule, MatGridListModule
      } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { GridUsuarioComponent } from './grid-usuario/grid-usuario.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MenuBaseComponent } from './menu-base/menu-base.component';
import { GridPessoaComponent } from './grid-pessoa/grid-pessoa.component';
import { FormularioPessoaComponent } from './formulario-pessoa/formulario-pessoa.component';
import { GridAtividadeComponent } from './grid-atividade/grid-atividade.component';
import { FormularioAtividadeComponent } from './formulario-atividade/formulario-atividade.component';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PaginaFichasComponent } from './pagina-fichas/pagina-fichas.component';
import { RodapeComponent } from './rodape/rodape.component';
import { FormularioOcorrenciaComponent } from './formulario-ocorrencia/formulario-ocorrencia.component';
import { GridOcorrenciaComponent } from './grid-ocorrencia/grid-ocorrencia.component';
import { GraficoBaseComponent } from './grafico-base/grafico-base.component';
import { VisaoGeralComponent } from './visao-geral/visao-geral.component';
import { PaginaGraficoIdadeComponent } from './pagina-grafico-idade/pagina-grafico-idade.component';
import { PaginaGraficoAtividadesComponent } from './pagina-grafico-atividades/pagina-grafico-atividades.component';
import { PaginaGraficoEstadosComponent } from './pagina-grafico-estados/pagina-grafico-estados.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioUsuarioComponent,
    GridUsuarioComponent,
    SideBarComponent,
    MenuBaseComponent,
    GridPessoaComponent,
    FormularioPessoaComponent,
    GridAtividadeComponent,
    FormularioAtividadeComponent,
    FormularioLoginComponent,
    PaginaPerfilComponent,
    PaginaInicioComponent,
    PaginaFichasComponent,
    RodapeComponent,
    FormularioOcorrenciaComponent,
    GridOcorrenciaComponent,
    GraficoBaseComponent,
    VisaoGeralComponent,
    PaginaGraficoIdadeComponent,
    PaginaGraficoAtividadesComponent,
    PaginaGraficoEstadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,

    // Imports do Angular Material
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTreeModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
