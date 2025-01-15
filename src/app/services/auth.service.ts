import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceFactoryService } from './factory/serviceFactory.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient,
      private cookieService:CookieService,
      private dialogRef: MatDialog,
      private router: Router,
      private serviceFactory: ServiceFactoryService,
  ) { }

  getCurrentUser() {
   let userData = JSON.parse(this.cookieService.get('rushikul_data'));
    let roleType = userData['role'];
    userData['activeRole'] = roleType;
    return userData;
  }
  getAuthorizatioRole() {
    let getCurrentUser = this.getCurrentUser();
    return getCurrentUser.activeRole;
  }
  getToken(){
    let userData = JSON.parse(this.cookieService.get('rushikul-data'))
    return userData['authToken'];
  }

  checkIsLoggin(){
    if(this.cookieService.get('rushikul_data')){
      return true;
    }else{
       return false
    }
  }

  login(body:any){
    return this.http.post(`${this.baseUrl}api/auth/login`,body)
  }
  loginUser(username: string, password: string) {
    const payload = new HttpParams()
      .set('username', username)
      .set('password', password);
    //  return this.http.post<any>(`${this.serverUrl}login`, payload);
  }

  async logout(url: any = null, statusText: string = '') {
    this.cookieService.delete('rushikul_data', '/');
    this.dialogRef.closeAll();
    this.router.navigate(['/login']).then((value: boolean) => {
      if (value) {
        this.serviceFactory.notification('Logout Successfully!', false);
      }
    });
    // window.location.href = 'http://localhost:4200/login'
    // this.serviceFactory.logout(statusText)

  }
  userTypeRedirect() {
    // this.router.navigateByUrl(this.returnUrl);

    if (this.checkIsLoggin()) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['./employee']));
      // let getCurrent = this.getCurrentUser();
      // console.log(getCurrent);
      // if (getCurrent.activeRole === 'sales') {

      // } else if (getCurrent.activeRole === 'operations') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./ops']));
      // } else if (getCurrent.activeRole === 'finance') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./finance']));
      // } else if (getCurrent.activeRole === 'master admin') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./admin']));
      // } else if (getCurrent.activeRole === 'pmp') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./pmp']));
      // } else if (getCurrent.activeRole === 'pullback') {

      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./pullback']));
      // } else if (getCurrent.activeRole === 'renewals') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./renewals']));
      // } else if (getCurrent.activeRole === 'receivables') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./receivables']));
      // } else if (getCurrent.activeRole === 'customer service') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./customer service']));
      // }
      // else if (getCurrent.activeRole === 'back office') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./Back_office']));
      // }
      // else if (getCurrent.activeRole === 'dhanwaan') {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate(['./dhanwaan']));
      // }
      // else {
      //   this.router.navigate(['./login']);
      // }
    }
  }
  register(){

  }
}
