import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
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
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      mobile_number: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10),
      ]],
      gender: [null, [Validators.required]],
      aadharcard: [null, [Validators.required, Validators.pattern(/^\d{12}$/)]],
      pancard: [null, [Validators.required, Validators.pattern(/^[A-Z]{5}\d{4}[A-Z]$/),
      ]],
      address: [null, [Validators.required]],
      branch_id: [null, [Validators.required]],
      customer_id: [null,],
    });

    console.log(this.customerData);


    this.customerForm.patchValue({
      ...this.customerData,
      first_name: this.customerData?.customer_first_name,
      last_name: this.customerData?.customer_last_name,
      email: this.customerData?.customer_email,
      aadharcard: this.customerData?.addharcard_number,
      pancard: this.customerData?.pancard_number,
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
      if (this.customerForm.value?.customer_id) {

        this.apiService.updateCustomer(this.customerForm.value).subscribe((res: any) => {
          this.matDialogRef.close()
        })
      } else {
        this.apiService.createCustomer(this.customerForm.value).subscribe((res: any) => {
          this.matDialogRef.close()
        })
      }
    }


  }

}
