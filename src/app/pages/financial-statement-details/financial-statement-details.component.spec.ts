import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementDetailsComponent } from './financial-statement-details.component';

describe('FinancialStatementDetailsComponent', () => {
  let component: FinancialStatementDetailsComponent;
  let fixture: ComponentFixture<FinancialStatementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialStatementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialStatementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
