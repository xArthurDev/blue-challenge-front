import { FinancialStatement } from './../../models/financial-statement.model';
import { FakeDataService } from 'src/app/services/fake-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-financial-statements',
  templateUrl: './list-financial-statements.component.html',
  styleUrls: ['./list-financial-statements.component.css'],
})
export class ListFinancialStatementsComponent implements OnInit {

  financialStatements: FinancialStatement[] = [];

  constructor(private router: Router, private fakeDataService: FakeDataService) {}

  ngOnInit(): void {
    this.financialStatements = this.fakeDataService.getFakeData();
  }

  /**
   * Redireciona para a página de detalhes do relatório financeiro selecionado
   * @param pageId
   * @returns
   */
  goToSelectedFinancialStatementPage(pageId: number) {
    return this.router.navigate(['/financial-statement-details/', pageId]);
  }
}
