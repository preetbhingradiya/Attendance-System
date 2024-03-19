import { AbstractControl, FormControl } from "@angular/forms";

export class space {
    static noSpaceAllowed(control: FormControl) {
      if (control.value != null && control.value.indexOf(' ') != -1) {
        return { noSpaceAllowed: true }
      }
      return null
    }
} 

export class emailValidation{
    static emailValid(control:AbstractControl){
        let email = control.value;
        if(email && !email.endsWith("@gmail.com")){
            return {emailValid:true}
        }

        return null
    }
}