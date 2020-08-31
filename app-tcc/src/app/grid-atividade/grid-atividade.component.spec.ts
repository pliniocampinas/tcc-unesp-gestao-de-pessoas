import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAtividadeComponent } from './grid-atividade.component';

describe('GridAtividadeComponent', () => {
  let component: GridAtividadeComponent;
  let fixture: ComponentFixture<GridAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
