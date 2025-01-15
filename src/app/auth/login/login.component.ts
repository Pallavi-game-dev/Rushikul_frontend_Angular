import { ApiService } from 'src/app/services/API/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userID:any;
  password:any;
  loginForm! :FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private cookieService:CookieService,
    private apiService:ApiService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })


  }
  onLogin(){
    if(this.loginForm.valid){
      let body = {
        "user":this.loginForm.controls['userId'].value,
        "password":this.loginForm.controls['password'].value,
      }
      this.authService.login(body).subscribe((res:any)=>{
        if(res){
          console.log(res);
          this.cookieService.set(
            'rushikul_data',
            JSON.stringify(res.rushikul_data),
            365,
            '/'
          );
          this.apiService.currentUser_id =res.data.id;
          this.authService.userTypeRedirect()
        }
      })
    }


  }

}
