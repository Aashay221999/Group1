import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function userNamVal (values:string[]):ValidatorFn {
	return (control:AbstractControl): ValidationErrors| null => {
		if (values.indexOf(control.value) >= 0)
		{
			return {invalidUsername:true}
		}
		else
		{
			return null;
		}
	}
}