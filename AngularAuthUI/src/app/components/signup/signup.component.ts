import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

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
