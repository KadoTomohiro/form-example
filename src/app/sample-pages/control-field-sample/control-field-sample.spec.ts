import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFieldSample } from './control-field-sample';

describe('ControlFieldSample', () => {
  let component: ControlFieldSample;
  let fixture: ComponentFixture<ControlFieldSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFieldSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlFieldSample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
