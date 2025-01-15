import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl=environment.baseUrl
  currentUser_id:string = '';
constructor(private http:HttpClient) { }

  getCustomerList(){
    return this.http.get(`${this.baseUrl}get_customer_details`)
  }
  createCustomer(body:any){
    return this.http.post(`${this.baseUrl}add_customer`,body)
  }
  addNewUser(body:any){
    return this.http.post(`${this.baseUrl}add_user`,body)
  }
  getUserDetails(){
    return this.http.get(`${this.baseUrl}get_user_details`)
  }
  getDirectorDetails(){
    return this.http.get(`${this.baseUrl}get_user_director`)
  }
  getAgentDetails(){
    return this.http.get(`${this.baseUrl}get_user_agent`)
  }
  addNewBranch(body:any){
    return this.http.post(`${this.baseUrl}add_branch`,body)
  }
  getBranchList(){
    return this.http.get(`${this.baseUrl}get_branch`)
  }

}
