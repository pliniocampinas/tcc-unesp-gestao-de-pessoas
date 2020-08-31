import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGraficoIdadeComponent } from './pagina-grafico-idade.component';

describe('PaginaGraficoIdadeComponent', () => {
  let component: PaginaGraficoIdadeComponent;
  let fixture: ComponentFixture<PaginaGraficoIdadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGraficoIdadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGraficoIdadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
