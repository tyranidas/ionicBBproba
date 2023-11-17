import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanceurPage } from './lanceur.page';

describe('LanceurPage', () => {
  let component: LanceurPage;
  let fixture: ComponentFixture<LanceurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LanceurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
