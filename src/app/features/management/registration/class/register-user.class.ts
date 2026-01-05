import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegistrationDTO } from '../registrationDTO';
import { ActionDeleteItem } from '../../../../general/type/custom-type';

const MIN_LENGTH = 12;

export class RegisterUser {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  lastname: string = '';

  static securePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: ActionDeleteItem = control.value || '';
      const hasUpperCase: boolean = /[A-Z]/.test(value);
      const hasLowerCase: boolean = /[a-z]/.test(value);
      const hasNumber: boolean = /\d/.test(value);
      const hasSpecialChar: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength: boolean = value.length >= MIN_LENGTH;

      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isValidLength) {
        return {
          securePassword: {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            isValidLength,
          },
        };
      }

      return null;
    };
  }

  static passwordMatch(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password: string = formGroup.get('password')?.value;
      const confirmPassword: string = formGroup.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return { passwordsMismatch: true };
      }

      return null;
    };
  }

  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const isValid: boolean = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

      return isValid ? null : { email: true };
    };
  }

  static fromFormData(formData: ActionDeleteItem): RegisterUser {
    const user = new RegisterUser();
    user.email = formData.email || '';
    user.password = formData.passwords?.password || '';
    user.confirmPassword = formData.passwords?.confirmPassword || '';
    user.firstname = formData.firstname || '';
    user.lastname = formData.lastname || '';
    return user;
  }

  toDTO(): RegistrationDTO {
    return {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }
}
