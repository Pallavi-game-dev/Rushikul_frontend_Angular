import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ApiService } from 'src/app/services/API/api.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerDetailsComponent } from './customerDetails/customerDetails.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.css']
})
export class CustomerComponent implements OnInit {
  public themeClass: string = "ag-theme-quartz";
  rowData:any=[];
  gridOptions:GridOptions={
    domLayout:'autoHeight',
    animateRows: true,
    pagination:true,
    paginationPageSize:15,
    defaultColDef: {
      flex:1,
      wrapText: true,
      filter: true,
      resizable: true,
      sortable: false,
      autoHeight: true,
    },
  }
  colDefs: ColDef[] = [
    { field: "customer_first_name" ,headerName:'First Name'  },
    { field: "customer_last_name" ,headerName:'Last Name'},
    { field: "customer_email" ,headerName:'Email Id'},
    { field: "mobile_number" ,headerName:'Mobile Number'},
    { field: "gender" ,headerName:'Gender'},
    { field: "addharcard_number" ,headerName:'Aadhar Number'},
    { field: "pancard_number" ,headerName:'Pancard'},
    { field: "address" ,headerName:'Address'},
  ];
  constructor(private apiService:ApiService,
    private router :Router,
    private matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.getCustomerList()
  }
  getCustomerList(){
      this.apiService.getCustomerList().subscribe((res)=>{
        console.log(res);
        this.rowData = res;
      })
  }
  onAddNewCustomer(){
    let addCustomerform = this.matDialog.open(AddCustomerComponent,{
      width:'50vw',
      height:'auto',
      autoFocus: false,
      disableClose: true,
      closeOnNavigation: true,
    });
    addCustomerform.afterClosed().subscribe((data: any) => {
      this.getCustomerList();
    })
  }
  openKundaliPage(event:any){
    this.router.navigate(['employee/customer/' + event.data._id]);
  }
}
