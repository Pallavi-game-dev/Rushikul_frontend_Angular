import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomerService } from 'src/app/role/services/customer.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/API/api.service';
import { ServiceFactoryService } from 'src/app/services/factory/serviceFactory.service';


@Component({
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AadharCardComponent implements OnInit {
  name:any = 'Pallavi Vilas Patil'
  dob:any = '03/09/1996'
  gender:any;
  addharnumber:any = '8876 5423 765 987'
  mobile_number: any = '9876543263';
  todays_date:any=new Date().toISOString().split('T')[0];
  isEdit:boolean = false;

  @Input() customerDetails!:any;
  @Output() updateDetails = new EventEmitter();
  
  genders:string[] = []
  constructor(public customerService:CustomerService,public factoryService:ServiceFactoryService, public apiService:ApiService) { 
    this.genders = this.customerService.genders;    
    if (!this.gender) this.gender=this.genders[0];
   }

  ngOnInit(): void {
    console.log(this.customerDetails);
    
    this.name = this.customerDetails?.customer_first_name + " " + this.customerDetails?.customer_last_name;
    this.dob = this.customerDetails?.customer_dob ? moment(this.customerDetails?.customer_dob).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
    this.addharnumber = this.customerDetails?.addharcard_number || '0000 0000 0000';
    this.mobile_number = this.customerDetails?.mobile_number || '0000000000';
  }

  getValidation(){
    if(this.addharnumber?.split(" ").join("").length!==12){
      this.factoryService.notification('Invalid Aadhar Number','error');
      return false;
    }
    if (this.dob > this.todays_date) {
      this.factoryService.notification('Invalid Date of Birth','error');
      return false;
    }
    return true;
  }

  saveDetails() {
    this.isEdit = false;
    if (!this.getValidation()) {
      console.log('Invalid Aadhar Number or Date of Birth');
      return;
    }

    if (this.customerDetails.addharcard_number == this.addharnumber?.split(" ").join("")) {
    // if (this.customerDetails.aadhar_number == this.addharnumber && this.customerDetails.dob == this.dob) {
      console.log('No changes made');
      return;
    }
    this.apiService.updateCustomer({ customer_id: this.customerDetails.customer_id, aadharcard: this.addharnumber?.split(" ").join(""),...this.customerDetails }).subscribe((res: any) => {
      this.factoryService.notification('Details Updated Successfully','success');
      this.updateDetails.emit();
    })
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log('changes', changes);
    this.customerDetails = changes['customerDetails'].currentValue;
    this.ngOnInit();
    if (changes['data']) {
      console.log('Updated data received from parent:', changes['data']);
    }
  }

}
