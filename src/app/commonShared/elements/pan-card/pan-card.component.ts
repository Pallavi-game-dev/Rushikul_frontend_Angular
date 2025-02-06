import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/API/api.service';
import * as moment from 'moment';
import { ServiceFactoryService } from 'src/app/services/factory/serviceFactory.service';
@Component({
  selector: 'app-pan-card',
  templateUrl: './pan-card.component.html',
  styleUrls: ['./pan-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanCardComponent implements OnInit {

  isEdit: boolean = false;
  name: string = 'John Doe';
  fathersName: string = 'Jane Doe';
  dob: any = '01/01/2000';
  panNumber: string = 'XXXXX1234X';
  customer_id: any;
  todays_date:any=new Date().toISOString().split('T')[0]
  @Input() customerDetails: any;

  @Output() updateDetails = new EventEmitter();



  constructor(public apiService: ApiService,public factoryService:ServiceFactoryService ) { }

  ngOnInit(): void {
    this.customer_id = this.customerDetails?.customer_id;
    this.name = this.customerDetails?.customer_first_name + " " + this.customerDetails?.customer_last_name;
    this.fathersName = this.customerDetails?.customer_father_name || 'Jane Doe';
    this.dob = this.customerDetails?.customer_dob || '01/01/2000';
    this.dob = this.customerDetails?.customer_dob ? moment(this.customerDetails?.customer_dob).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
    this.panNumber = this.customerDetails?.pancard_number || 'XXXXX1234X';
  }

  saveDetails() {

    this.isEdit = false;
    console.log(this.dob);

    if (!this.getValidation()) {
      console.log('Invalid Pan Number or Date of Birth');
      return;
    }
    
    // if (this.customerDetails.customer_father_name === this.fathersName && this.customerDetails.customer_dob === this.dob && this.customerDetails.pancard_number === this.panNumber) {
    if (this.customerDetails.pancard_number === this.panNumber) {
      console.log('No changes made');
      return;
    }
    this.apiService.updateCustomer({ customer_id: this.customer_id, customer_father_name: this.fathersName, customer_dob: this.dob, pancard: this.panNumber,...this.customerDetails }).subscribe((res: any) => {
      this.factoryService.notification('Details Updated Successfully','success');
      this.updateDetails.emit();
    })
  }


  getValidation(){
      if(this.panNumber.length!==10){
        this.factoryService.notification('Invalid Pan Number','error');
        return false;
      }
      if(this.dob>this.todays_date){
        this.factoryService.notification('Invalid Date of Birth','error');
        return false;
      }
      if (!RegExp('^[A-Z]{5}[0-9]{4}[A-Z]{1}$').test(this.panNumber)) {
        this.factoryService.notification('Invalid Pan Number','error');
        return false;
      }
      return true;
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
