import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGraficoAtividadesComponent } from './pagina-grafico-atividades.component';

describe('PaginaGraficoAtividadesComponent', () => {
  let component: PaginaGraficoAtividadesComponent;
  let fixture: ComponentFixture<PaginaGraficoAtividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGraficoAtividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGraficoAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
