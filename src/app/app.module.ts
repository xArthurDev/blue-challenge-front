import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListFinancialStatementsComponent } from './pages/list-financial-statements/list-financial-statements.component';
import { RouterModule } from '@angular/router';
import { FinancialStatementDetailsComponent } from './pages/financial-statement-details/financial-statement-details.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FakeDataService } from './services/fake-data.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent, ListFinancialStatementsComponent, FinancialStatementDetailsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'list-financial-statements',
        component: ListFinancialStatementsComponent,
      },
      {
        path: 'financial-statement-details/:id',
        component: FinancialStatementDetailsComponent,
      },
    ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [FakeDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
