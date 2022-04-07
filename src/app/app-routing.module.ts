import { FinancialStatementDetailsComponent } from './pages/financial-statement-details/financial-statement-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-financial-statements',
    pathMatch: 'full',
  },
  {
    path: 'financial-statement-details',
    component: FinancialStatementDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
