import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/role/services/customer.service';
import { ApiService } from 'src/app/services/API/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerData: any
  branchList: any = [
  ]
  genders: string[] = [

  ]
  constructor(public fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerService: CustomerService,
    private apiService: ApiService,

  ) {
    this.genders = this.customerService.genders
    this.customerData = data
  }

  ngOnInit(): void {
    this.getBranchList()

    this.customerForm = this.fb.group({
      customer_first_name: [null, [Validators.required]],
      customer_last_name: [null, [Validators.required]],
      customer_email: [null, [Validators.required, Validators.email]],
      mobile_number: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10),
      ]],
      gender: [null, [Validators.required]],
      addharcard_number: [null, [Validators.required, Validators.pattern(/^\d{12}$/)]],
      pancard_number: [null, [Validators.required, Validators.pattern(/^[A-Z]{5}\d{4}[A-Z]$/),
      ]],
      address: [null, [Validators.required]],
      branch: [null, [Validators.required]],
      customer_id: [null,],
    });

    console.log(this.customerData);


    this.customerForm.patchValue({
      ...this.customerData,
      branch: this.customerData.branch_id
    }
    )


  }



  getBranchList() {
    this.apiService.getBranchList().subscribe((res: any) => {
      this.branchList = res.data;
    });
  }



  onNoClick() {
    this.matDialogRef.close();
  }


  onSubmitForm() {
    if (this.customerForm.valid) {

      let obj = {
        ...this.customerForm.value,
        customer_id: this.customerForm.value.customer_id,
        first_name: this.customerForm.value.customer_first_name,
        last_name: this.customerForm.value.customer_last_name,
        email: this.customerForm.value.customer_email,
        phone: this.customerForm.value.mobile_number,
        aadharcard: this.customerForm.value.addharcard_number,
        pancard: this.customerForm.value.pancard_number,
        branch_id: this.customerForm.value.branch
      }

      if (this.customerForm.value?.customer_id) {

        this.apiService.updateCustomer(obj).subscribe((res: any) => {
          this.matDialogRef.close()
        })
      } else {
        this.apiService.addNewUser(obj).subscribe((res: any) => {
          this.matDialogRef.close()
        })
      }
    }


  }

}
