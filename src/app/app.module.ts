import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

import { CommonSharedModule } from './commonShared/commonShared.module';
import { AuthInterceptor } from 'src/http-interceptors/auth-interceptor';
import { ApiService } from './services/API/api.service';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RoleModule,


    BrowserAnimationsModule,
    CommonSharedModule

  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent],

})
export class AppModule { }
