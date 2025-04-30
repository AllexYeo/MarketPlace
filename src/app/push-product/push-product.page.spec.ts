import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PushProductPage } from './push-product.page';

describe('PushProductPage', () => {
  let component: PushProductPage;
  let fixture: ComponentFixture<PushProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PushProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
