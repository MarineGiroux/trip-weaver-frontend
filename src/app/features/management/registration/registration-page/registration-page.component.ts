import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationDTO } from '../registrationDTO';
import { Router } from '@angular/router';
import { ErrorMessageService } from '../service/error-message/error-message.service';
import { FormFieldComponent } from '../../../../common/components/form/form-field/form-field.component';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { FormFieldConfig, REGISTRATION_FORM_FIELDS } from '../config/registration-form.config';
import { catchError, throwError } from 'rxjs';
import { RegisterUser } from '../class/register-user.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegistrationFacadeService } from '../service/registration-facade/registration-facade.service';

const MIN_LENGTH = 2;

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent, ButtonComponent],
})
export class RegistrationPageComponent {
  @Output() formSubmitted = new EventEmitter<RegistrationDTO>();

  signUpForm!: FormGroup;
  isSubmitted = false;
  serverErrors: Record<string, string> = {};
  formFields: FormFieldConfig[] = REGISTRATION_FORM_FIELDS;

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _errorService = inject(ErrorMessageService);
  private readonly _registrationFacadeService = inject(RegistrationFacadeService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.signUpForm = this._formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(MIN_LENGTH)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(MIN_LENGTH)]),
      email: new FormControl('', [Validators.required, RegisterUser.emailValidator()]),
      passwords: this._formBuilder.group(
        {
          password: new FormControl('', [Validators.required, RegisterUser.securePassword()]),
          confirmPassword: new FormControl('', Validators.required),
        },
        { validators: RegisterUser.passwordMatch() }
      ),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
      acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.serverErrors = {};

    if (this.signUpForm.valid) {
      const user = RegisterUser.fromFormData(this.signUpForm.value);
      const registrationDTO = user.toDTO();

      this._registrationFacadeService
        .register$(registrationDTO)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          catchError(error => {
            this.serverErrors = this._errorService.handleServerErrors(error, this.signUpForm);
            return throwError(() => error);
          })
        )
        .subscribe({
          next: () => {
            this._router.navigate(['/']);
          },
        });
    }
  }

  getControl(fieldName: string, isNestedInPasswords?: boolean): AbstractControl | null {
    if (isNestedInPasswords) {
      return this.signUpForm.get(`passwords.${fieldName}`);
    }
    return this.signUpForm.get(fieldName);
  }
}
