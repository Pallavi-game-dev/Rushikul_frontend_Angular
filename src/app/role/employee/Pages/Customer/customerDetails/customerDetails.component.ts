import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/API/api.service';

@Component({
  selector: 'app-customerDetails',
  templateUrl: './customerDetails.component.html',
  styleUrls: ['./customerDetails.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  queryParams: any;
  panelOpenState:boolean = true;
  customerData: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      console.log(data);
      this.queryParams = data
      this.getCustomerDetails();
    })
  }

  getCustomerDetails() {
    this.apiService.getCustomerList({customer_id:this.queryParams.customer_id}).subscribe((res: any) => {
      this.customerData = res.data;
      console.log(res.data);
    })


  }
  
}
