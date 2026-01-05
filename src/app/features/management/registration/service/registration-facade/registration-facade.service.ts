import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RegistrationDTO } from '../../registrationDTO';
import { RegistrationHttpService } from '../registration-http/registration-http.service';
import { UserTableDTO } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFacadeService {
  private readonly _registrationHttpService = inject(RegistrationHttpService);

  register$(registrationData: RegistrationDTO): Observable<UserTableDTO> {
    return this._registrationHttpService.post$(registrationData).pipe(
      map(response => {
        console.log('Utilisateur enregistré :', response.message);
        return response.payload;
      }),
      catchError(error => {
        console.error("Erreur lors de l'enregistrement :", error);
        throw error;
      })
    );
  }
}
