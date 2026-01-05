import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RegistrationDTO } from '../../registrationDTO';
import { environment } from '../../../../../../environments/environment';
import { ApiResponse } from '../../../../../general/type/api-response.type';
import { UserTableDTO } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationHttpService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string = environment.apiUrl;

  post$(registrationDTO: RegistrationDTO): Observable<ApiResponse<UserTableDTO>> {
    return this._http
      .post<ApiResponse<UserTableDTO>>(`${this._baseUrl}/register/user`, registrationDTO)
      .pipe(catchError(this._handleError("Erreur lors de l'enregistrement")));
  }

  private _handleError(defaultMessage: string): (error: HttpErrorResponse) => Observable<never> {
    return (error: HttpErrorResponse) => {
      const errorMessage = error.error?.message || defaultMessage;
      return throwError(() => ({
        error: error.error,
        status: error.status,
        message: errorMessage,
      }));
    };
  }
}
