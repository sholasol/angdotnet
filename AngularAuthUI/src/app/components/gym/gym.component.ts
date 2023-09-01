import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss']
})
export class GymComponent {
  public packages = ["Weekly", "Monthly", "Quarterly", "Bi-annual", "Annually"];
  public importants = [
    "Toxic Fat Reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System"
  ];


 public gymForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private toast: NgToastService
    ){}

    ngOnInit(): void{
      //validate the form fields
      this.gymForm = this.fb.group({
        firstName:    ['', Validators.required],
        lastName:    ['', Validators.required],
         email:    ['', Validators.required],
        phone:    ['', Validators.required],
        bmi:    ['', Validators.required],
        bmiresult:    ['', Validators.required],
        package:    ['', Validators.required],
        important:    ['', Validators.required],
        newgym:    ['', Validators.required],
        regdate:    ['', Validators.required],
        gender:    ['', Validators.required],
        trainer:    ['', Validators.required],
        weight:    ['', Validators.required],
        height:    ['', Validators.required]
      });

      //get the value of bmi from the calculateBmi()
      this.gymForm.controls['height'].valueChanges.subscribe(res=> {
        this.calculateBmi(res);
      })
  
    }

    onsubmitGym(){
      //console.log(this.gymForm.value)
    if(this.gymForm.valid){
      alert("Form is valid")
    }else{
      validateForm.validateAllFormFields(this.gymForm)
      this.toast.error({
        detail: "ERROR", summary: "Form fields are required", duration: 5000,
        type: 'error'
      });
    }
  }

  calculateBmi(heightValue: number){
    const weight = this.gymForm.value.weight;
    const height = this.gymForm.value.height;
    const bmi = weight/(height * height);

    this.gymForm.controls[bmi].patchValue(bmi);
    switch(true){
      case bmi < 18.5:
        this.gymForm.controls['bmiresult'].patchValue("Underweight");
        break;
      
      case (bmi >= 18.5 && bmi < 25):
        this.gymForm.controls['bmiresult'].patchValue("Normal");
        break;

      case (bmi >=25 && bmi < 30):
        this.gymForm.controls['bmiresult'].patchValue("Overweight");
        break;

      default:
        this.gymForm.controls['bmiresult'].patchValue("Obese");
        break;
    }
  }

}
