import { FormControl, FormGroup } from "@angular/forms";

export default class validateForm{

    static  validateAllFormFields(formGroup: FormGroup)
    {
      //check all the keys and field values
      Object.keys(formGroup.controls).forEach(field => { 
  
        const control = formGroup.get(field);
  
        if(control instanceof FormControl){
          control.markAsDirty({onlySelf: true}); //if there error, make the field dirty
        }else if(control instanceof FormGroup)
        {
          this.validateAllFormFields(control)
        }
      })
    }
}