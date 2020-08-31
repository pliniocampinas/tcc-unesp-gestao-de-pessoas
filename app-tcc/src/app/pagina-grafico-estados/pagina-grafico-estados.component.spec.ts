import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGraficoEstadosComponent } from './pagina-grafico-estados.component';

describe('PaginaGraficoEstadosComponent', () => {
  let component: PaginaGraficoEstadosComponent;
  let fixture: ComponentFixture<PaginaGraficoEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGraficoEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGraficoEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
