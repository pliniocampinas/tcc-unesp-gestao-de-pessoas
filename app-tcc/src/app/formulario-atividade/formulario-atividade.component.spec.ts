import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAtividadeComponent } from './formulario-atividade.component';

describe('FormularioAtividadeComponent', () => {
  let component: FormularioAtividadeComponent;
  let fixture: ComponentFixture<FormularioAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
