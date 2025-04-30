import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseHistoryPage } from './purchase-history.page';

describe('PurchaseHistoryPage', () => {
  let component: PurchaseHistoryPage;
  let fixture: ComponentFixture<PurchaseHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
