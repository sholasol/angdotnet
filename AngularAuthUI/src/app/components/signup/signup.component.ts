import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

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

  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService
    ){}

  ngOnInit(): void{
    //validate the form fields
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      firstName:    ['', Validators.required],
      lastName:    ['', Validators.required],
      email:    ['', Validators.required],
      password:    ['', Validators.required]
    })

  }

  hideShowPass(){
    this.isText = !this.isText; 
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash"; //changing the eye icon
    this.isText ? this.type ="text" : this.type="password"; //changing text and password
  }

  onsubmit(){
      //validate the form logic
      if(this.signupForm.valid){
        //send data to dbng
        this.auth.signup(this.signupForm.value)
        .subscribe({
          next:(res =>{
            //alert(res.message)
            this.toast.success({
              detail: "SUCCESS", summary: res.message, duration: 5000,
              type: 'success'
            });
            this.signupForm.reset();
            this.router.navigate(['login']);
          }),
          error:(err=>{
            //alert(err.error.message);
            this.toast.error({
              detail: "ERROR", summary: err.error.message, duration: 5000,
              type: 'error'
            });
          })
          
        })
      }else{
        validateForm.validateAllFormFields(this.signupForm)
        //this.validateAllFormFields(this.signupForm);
        //alert('Form fields are required');
        this.toast.error({
          detail: "ERROR", summary: "Form fields are required", duration: 5000,
          type: 'error'
        });
      }
  }

  // //logic for actual validation
  // private validateAllFormFields(formGroup: FormGroup)
  // {
  //   //check all form fields for emptiness
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);

  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf: true})
  //     }else if(control instanceof FormGroup){
  //       this.validateAllFormFields(control); //if there error, make the field dirty
  //     }
  //   })
  // }

}
