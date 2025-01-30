import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/role/services/customer.service';

@Component({
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss']
})
export class AadharCardComponent implements OnInit {
  @Input() name:any = 'Pallavi Vilas Patil'
  @Input() dob:any = '03/09/1996'
  @Input() gender:any;
  @Input() addharnumber:any = '8876 5423 765 987'
  @Input() mobile_number: any = '9876543263'
  @Input() isEdit:boolean = false;
  genders:string[] = []
  constructor(public customerService:CustomerService) { 
    this.genders = this.customerService.genders;    
    if (!this.gender) this.gender=this.genders[0];
   }

  ngOnInit(): void {
  }

}
