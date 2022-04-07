import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinancialStatementsComponent } from './list-financial-statements.component';

describe('ListFinancialStatementsComponent', () => {
  let component: ListFinancialStatementsComponent;
  let fixture: ComponentFixture<ListFinancialStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFinancialStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinancialStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
