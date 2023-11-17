import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimPage } from './sim.page';

describe('SimPage', () => {
  let component: SimPage;
  let fixture: ComponentFixture<SimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
