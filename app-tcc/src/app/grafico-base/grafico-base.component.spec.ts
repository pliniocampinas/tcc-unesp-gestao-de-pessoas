import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBaseComponent } from './grafico-base.component';

describe('GraficoBaseComponent', () => {
  let component: GraficoBaseComponent;
  let fixture: ComponentFixture<GraficoBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
