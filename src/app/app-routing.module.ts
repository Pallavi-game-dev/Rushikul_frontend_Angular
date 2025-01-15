import { RoleModule } from './role/role.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path:'',loadChildren:()=>import('../app/auth/auth.module').then((m)=>(m.AuthModule)),
  // },
  {
    path:'',loadChildren:()=>import('../app/role/role.module').then((m)=>(m.RoleModule)),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
