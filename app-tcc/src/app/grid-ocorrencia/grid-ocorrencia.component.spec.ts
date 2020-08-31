import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOcorrenciaComponent } from './grid-ocorrencia.component';

describe('GridOcorrenciaComponent', () => {
  let component: GridOcorrenciaComponent;
  let fixture: ComponentFixture<GridOcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
