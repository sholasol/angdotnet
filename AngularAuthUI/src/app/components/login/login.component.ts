import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/services/auth.service';

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

   //inject form builder and FormGroup 
   //Inject authservie after Auth service is created
   loginForm!: FormGroup;
   constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}


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
          alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err)=>{
          alert(err.error.message)
        }
      })
    }else{
      //throw errror using the required fields
      validateForm.validateAllFormFields(this.loginForm)
      //this.validateAllFormFields(this.loginForm) // this is used if the validator is in the same file
      alert("Form is invalid")
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
  // }

}
