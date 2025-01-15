import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { CustomerComponent } from './Pages/Customer/Customer.component';
import { DirectorsComponent } from './Pages/Directors/Directors.component';
import { AgentsComponent } from './Pages/Agents/Agents.component';
import { DepositesComponent } from './Pages/Deposites/Deposites.component';
import { LoanComponent } from './Pages/Loan/Loan.component';
import { CommonSharedModule } from 'src/app/commonShared/commonShared.module';
import { AddCustomerComponent } from './Pages/Customer/add-customer/add-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CustomerDetailsComponent } from './Pages/Customer/customerDetails/customerDetails.component';



@NgModule({
  declarations: [
    EmployeeComponent,
    CustomerComponent,
    DirectorsComponent,
    AgentsComponent,
    DepositesComponent,
    LoanComponent,
    AddCustomerComponent,
    CustomerDetailsComponent

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    CommonSharedModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EmployeeModule { }
