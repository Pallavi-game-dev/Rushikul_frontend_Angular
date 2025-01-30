import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {  ButtonModule, } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputMaskModule
  ],
  exports:[
    TableModule,
    ButtonModule,
    InputMaskModule
  ]
})
export class MyprimengModule { }
