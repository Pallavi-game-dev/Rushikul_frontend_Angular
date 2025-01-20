import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss']
})
export class AadharCardComponent implements OnInit {
  @Input() name:any = 'Pallavi Vilas Patil'
  @Input() dob:any = '03/09/1996'
  @Input() gender:any = 'female'
  @Input() addharnumber:any = '8876 5423 765 987'
  @Input() mobile_number: any = '9876543263'
  @Input() isEdit:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
