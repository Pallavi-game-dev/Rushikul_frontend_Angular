import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl
  currentUser_id: number = 1;
  constructor(private http: HttpClient) { }

  getCustomerList(body: any) {
    return this.http.post(`${this.baseUrl}get_customer_details`, body)
  }
  createCustomer(body: any) {
    return this.http.post(`${this.baseUrl}add_customer`, body)
  }
  addNewUser(body: any) {
    return this.http.post(`${this.baseUrl}add_user`, body)
  }
  getUserDetails() {
    return this.http.get(`${this.baseUrl}get_user_details`)
  }
  getDirectorDetails() {
    return this.http.get(`${this.baseUrl}get_user_director`)
  }
  getAgentDetails() {
    return this.http.get(`${this.baseUrl}get_user_agent`)
  }
  addNewBranch(body: any) {
    return this.http.post(`${this.baseUrl}add_branch`, body)
  }
  getBranchList() {
    return this.http.get(`${this.baseUrl}get_branch`)
  }

  deactivateCustomer(customer_id: number) {
    return this.http.post(`${this.baseUrl}disabled_customer`, { customer_id })
  }

  reactivateCustomer(customer_id: number) {
    return this.http.post(`${this.baseUrl}enabled_customer`, { customer_id })
  }

  updateCustomer(body: any) {
    return this.http.post(`${this.baseUrl}update_customer`, body)
  }

  getCustomerDetails(body: any) {
    return this.http.post(`${this.baseUrl}update_customer`, body)
  }


}
