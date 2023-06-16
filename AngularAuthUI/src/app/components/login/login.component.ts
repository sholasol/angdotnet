import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //writing logic for toogling the eye and showing the password
  type:string="password";
  isText: boolean = false;
  eyeIcon: string ="fa fa-eye-slash";

  hideShowPass(){
    this.isText = !this.isText; 
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash"; //changing the eye icon
    this.isText ? this.type ="text" : this.type="password"; //changing text and password
  }

}
