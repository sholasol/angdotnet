import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from 'src/app/services/services/user-store.service';
import { ResetPasswordService } from 'src/app/services/services/reset-password.service';



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

  //forgot password
  public forgotEmail!: string;

  public isValidEmail!: boolean; //check if the email exist and valid


   //inject form builder and FormGroup 
   //Inject authservie after Auth service is created
   loginForm!: FormGroup;
   constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
    ){}


   ngOnInit(): void {
    //group all the form elements (username and password)
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  hideShowPass(){
    this.isText = !this.isText; 
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash"; //changing the eye icon
    this.isText ? this.type ="text" : this.type="password"; //changing text and password
  }

  onLogin(){
    if(this.loginForm.valid){
      //send data to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res=> {
          //alert(res.message)
          this.toast.success({
            detail: "Success", summary: res.message, duration: 5000,
            type: 'success'
          });
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken); //store token value
          this.auth.storeRefreshToken(res.refreshToken);//store refresh token
          //set userStore the payload
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setfullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard']);
        }),
        error:(err)=>{
          //alert(err.error.message)
          this.toast.error({
            detail: "Error", summary: err.error.message, duration: 5000,
            type: 'error'
          });
        }
      })
    }else{
      //throw errror using the required fields
      validateForm.validateAllFormFields(this.loginForm)
      //this.validateAllFormFields(this.loginForm) // this is used if the validator is in the same file
      //alert("Form is invalid")
      this.toast.error({
        detail: "Error", summary: "Invalid form input field", duration: 5000,
        type: 'error'
      });
    }
  }

  // The function below has been moved to the helper class


  // private validateAllFormFields(formGroup: FormGroup)
  // {
  //   //check all the keys and field values
  //   Object.keys(formGroup.controls).forEach(field => { 

  //     const control = formGroup.get(field);

  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf: true}); //if there error, make the field dirty
  //     }else if(control instanceof FormGroup)
  //     {
  //       this.validateAllFormFields(control)
  //     }
  //   })
  // }ng

//for forgot password
  checkValidEmail(event:string)
  {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/; //  /^[\w-\.]+@(\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);

    return this.isValidEmail;
  }


  confirmToSend(){
    if(this.checkValidEmail(this.forgotEmail)){
      console.log(this.forgotEmail)
      
      //make api call

      this.resetService.sendResetPasswordLink(this.forgotEmail)
      .subscribe({
        next: (res)=>{
          this.toast.success({
            detail: "Success", summary: "Reset Successful", duration: 3000,
            type: 'success'
          });

          this.forgotEmail = ""; //reset the email field
          const buttonRef = document.getElementById("closeBtn") 
          buttonRef?.click(); //close the form once email is sent
        },
        error:(err)=>{
          this.toast.error({
            detail: "Error", summary: "Oops! Something went wrong", duration: 3000,
            type: 'error'
          });
        }
      });
    }
  }

  

}
