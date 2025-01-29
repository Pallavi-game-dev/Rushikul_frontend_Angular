import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/API/api.service';
import { AddCustomerComponent } from '../../add-customer/add-customer.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {


  params: any;

  agInit(params: any): void {
    this.params = params;
    console.log(this.params);
    
  }

  constructor(private matDialog: MatDialog, public apiService: ApiService) { }

  ngOnInit(): void {

  }



  editData() {
    let editCustomerform = this.matDialog.open(AddCustomerComponent, {
      width: '50vw',
      height: 'auto',
      autoFocus: false,
      disableClose: true,
      closeOnNavigation: true,
      data: this.params.data
    });
    editCustomerform.afterClosed().subscribe((data: any) => {
      this.params.OnUpdated();
    })
  }

  deactivate() {
    Swal.fire({
      title: "Are you sure want to deactivate this customer?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Deactivate",
      confirmButtonColor: 'red',
      cancelButtonColor: '#035e96',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(this.params);

        this.apiService.deactivateCustomer(this.params.data.customer_id).subscribe((res: any) => {
          this.params.OnUpdated();
        })
      }
    });

  }

  reactivate() {
    Swal.fire({
      title: "Are you sure want to reactivate this customer?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Reactivate",
      confirmButtonColor: 'green',
      cancelButtonColor: '#035e96',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(this.params);

        this.apiService.reactivateCustomer(this.params.data.customer_id).subscribe((res: any) => {
          this.params.OnUpdated();
        })
      }
    });

  }

}
