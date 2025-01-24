import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { CustomerComponent } from './Pages/Customer/Customer.component';
import { DirectorsComponent } from './Pages/Directors/Directors.component';
import { AgentsComponent } from './Pages/Agents/Agents.component';
import { LoanComponent } from './Pages/Loan/Loan.component';
import { DepositesComponent } from './Pages/Deposites/Deposites.component';
import { CustomerDetailsComponent } from './Pages/Customer/customerDetails/customerDetails.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: 'customer', component: CustomerComponent },
      { path: 'customer/:customer_id', component: CustomerDetailsComponent },
      { path: 'directors', component: DirectorsComponent },
      { path: 'agents', component: AgentsComponent },
      { path: 'loan', component: LoanComponent },
      { path: 'deposite', component: DepositesComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
