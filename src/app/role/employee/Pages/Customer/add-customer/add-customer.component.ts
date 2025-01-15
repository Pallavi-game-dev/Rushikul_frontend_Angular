import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/API/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customerFrom!: FormGroup;
  branchList:any=[];
  constructor(
    private apiService:ApiService,
    private matDialogRef:MatDialogRef<AddCustomerComponent>,
    private fb:FormBuilder
  ) {
    this.getBranchList();
  }

  ngOnInit(): void {
    this.customerFrom = this.fb.group({
       fname:[null,[Validators.required]],
       lname:[null,[Validators.required]],
       email:[null,[Validators.required,Validators.email]],
       mobile:[null,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
       gendar:[null,[Validators.required]],
       addharcard:[null,[Validators.required]],
       pancard:[null,[Validators.required]],
       address:[null,[Validators.required]],
       branch:[null,[Validators.required]],
    });



  }
  getBranchList(){
    this.apiService.getBranchList().subscribe((res)=>{
      this.branchList = res;
    });
  }
  onGendarSelect(e:any){
    this.customerFrom.controls['gendar'].setValue(e);
  }
  onBranchSelect(e:any){
    this.customerFrom.controls['branch'].setValue(e);
  }
  onNoClick(){
    this.matDialogRef.close();
  }
  onSubmitForm(){
    console.log(this.apiService.currentUser_id);

    if(this.customerFrom.valid && this.apiService.currentUser_id !== ''){

      const body = {
        "first_name": this.customerFrom.value.fname,
        "last_name": this.customerFrom.value.lname,
        "phone": this.customerFrom.value.mobile,
        "email": this.customerFrom.value.email,
        "gender":this.customerFrom.value.gendar,
        "aadharcard": this.customerFrom.value.addharcard,
        "address":this.customerFrom.value.address,
        "pancard": this.customerFrom.value.pancard,
        "branch_id":this.customerFrom.value.branch,
        "user_id":this.apiService.currentUser_id
      }
      this.apiService.createCustomer(body).subscribe((res=>{
          console.log("res",res);
          if(res){
            this.matDialogRef.close();
          }

      }))
    }
  }


}
