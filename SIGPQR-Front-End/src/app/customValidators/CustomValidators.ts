import {UserService} from "../services/user/user.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export function emailValidation(userService: UserService): AsyncValidatorFn {
  return (control:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=>{
    return userService.checkEmail(control.value).pipe(map(response=>{
      if (response.status == 'success'){
        let isTaken = response.data == 1;
        return isTaken?{'notAvailable':true}:null;
      }
      return {'notAvailable':true};
    }));
  }

}
/*export function existingMobileNumberValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByMobileNumber(control.value).map(
      users => {
        return (users && users.length > 0) ? {"mobNumExists": true} : null;
      }
    );
  };
}*/
