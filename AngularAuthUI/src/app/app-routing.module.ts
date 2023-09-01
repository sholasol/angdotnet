import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { isUserLoggedInGuard } from './guard/auth.guard';
import { isLoggedInGuard } from './guard/is-logged-in.guard';
import { GymComponent } from './components/gym/gym.component';
import { MembersComponent } from './components/members/members.component';

const routes: Routes = [
  {path: '', canActivate: [isLoggedInGuard], component: HomeComponent},
  {path:'login', canActivate: [isLoggedInGuard], component: LoginComponent},
  {path:'signup', canActivate: [isLoggedInGuard], component: SignupComponent},
  {path:'gym', component: GymComponent},
  {path:'dashboard',  canActivate : [isUserLoggedInGuard ], component: DashboardComponent,},
  {path: 'members',canActivate : [isUserLoggedInGuard ], component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
