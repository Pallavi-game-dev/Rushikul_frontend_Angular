import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  branches: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService,private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.getAllBranches();
      this.queryParams = data
      this.getCustomerDetails();
    })
  }

  getAllBranches() {
    this.apiService.getBranchList().subscribe((res: any) => {
      this.branches = res?.data;
    })
  }

  getCustomerDetails() {
    this.apiService.getCustomerList({customer_id:this.queryParams.customer_id}).subscribe((res: any) => {
      this.customerData=undefined;
      this.customerData = res?.data && res?.data[0];
      console.log(res.data);
      this.cdRef.detectChanges();
    })

  }

  getBranchName(branch_id: number) {
    return this.branches?.find((branch: any) => branch.branch_id === branch_id)?.branch_name
  }
  
}
