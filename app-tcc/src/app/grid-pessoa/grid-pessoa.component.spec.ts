import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPessoaComponent } from './grid-pessoa.component';

describe('GridPessoaComponent', () => {
  let component: GridPessoaComponent;
  let fixture: ComponentFixture<GridPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
