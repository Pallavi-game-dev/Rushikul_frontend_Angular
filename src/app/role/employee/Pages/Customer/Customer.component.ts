import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ApiService } from 'src/app/services/API/api.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerDetailsComponent } from './customerDetails/customerDetails.component';
import { Router } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';

@Component({
  selector: 'app-Customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.css']
})
export class CustomerComponent implements OnInit {
  public themeClass: string = "ag-theme-quartz";
  noRowsTemplate = `<img src=".../../../../../assets/empty_overlay.svg"/>`;
  rowData: any = [{
    customer_first_name: "NO",
    user_id: 6,
    customer_last_name: "NO",
    customer_email: "NO",
    mobile_number: "NO",
    gender: "NO",
    addharcard_number: "NO",
    pancard_number: "NO",
    address: "NO",
    status: "NO",
    action: "NO",
  }];
  gridOptions: GridOptions = {
    domLayout: 'autoHeight',
    animateRows: true,
    pagination: false,
    defaultColDef: {
      flex: 1,
      wrapText: true,
      filter: true,
      resizable: true,
      sortable: false,
      autoHeight: true,
    },
  }
  colDefs: ColDef[] = [
    { field: "customer_first_name", headerName: 'First Name' },
    { field: "customer_last_name", headerName: 'Last Name' },
    { field: "customer_email", headerName: 'Email Id' },
    { field: "mobile_number", headerName: 'Mobile Number' },
    { field: "gender", headerName: 'Gender' },
    { field: "addharcard_number", headerName: 'Aadhar Number' },
    { field: "pancard_number", headerName: 'Pancard' },
    { field: "address", headerName: 'Address' },
    {
      field: "enabled", headerName: 'Status',
      cellRenderer: (params: any) => {
        if (params.value) {
          return `<span style="font-weight: bold;color:green;" >ACTIVE</span>`
        }
        return `<span style="font-weight: bold;color:red;" >INACTIVE</span>`
      }
    },
    {
      field: "action",
      headerName: "Action",
      cellRenderer: ActionsComponent,
      cellRendererParams: {
        OnUpdated: this.onUpdated.bind(this) // Pass the callback function
      }
    },
  ];
  constructor(private apiService: ApiService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCustomerList()
  }

  onUpdated() {
    console.log("Data updated, refresh the grid or perform other actions.");
    this.getCustomerList(); // Or any logic specific to your use case
  }
  getCustomerList() {
    this.apiService.getCustomerList({}).subscribe((res: any) => {
      if (res.status == 'success') {
        this.rowData = res.data;
      }
    })
  }



  onAddNewCustomer() {
    let addCustomerform = this.matDialog.open(AddCustomerComponent, {
      width: '50vw',
      height: 'auto',
      autoFocus: false,
      disableClose: true,
      closeOnNavigation: true,
    });
    addCustomerform.afterClosed().subscribe((data: any) => {

      this.getCustomerList();
    })
  }
  openKundaliPage(event: any) {
    this.router.navigate(['employee/customer/' + event.data._id]);
  }
}
