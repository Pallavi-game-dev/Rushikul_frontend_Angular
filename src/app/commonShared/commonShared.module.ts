
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './elements/button/button.component';
import { HeaderComponent } from './elements/header/header.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-community';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './elements/select/select.component';
import { SmallCardComponent } from './elements/small-card/small-card.component';
import { AadharCardComponent } from './elements/aadhar-card/aadhar-card.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    ButtonComponent,
    HeaderComponent,
    SelectComponent,
    SmallCardComponent,
    AadharCardComponent
  ],
  exports:[
    HeaderComponent,
    ButtonComponent,
    SelectComponent,
    SmallCardComponent,
    AadharCardComponent,
    AgGridModule
  ]
})
export class CommonSharedModule { }
