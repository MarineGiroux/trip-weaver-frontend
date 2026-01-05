import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DecodedToken, LoginRequestType, LoginResponse, Role } from '../types/login-request.type';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../general/type/api-response.type';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _TOKEN_KEY = 'auth_token';
  private readonly _isAuthenticatedSubject = new BehaviorSubject<boolean>(this._hasToken());
  private readonly _http = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _baseUrl: string = environment.apiUrl;

  readonly isAuthenticated$ = this._isAuthenticatedSubject.asObservable();

  login(credentials: LoginRequestType): Observable<LoginResponse> {
    return this._http.post<ApiResponse<{ token: string }>>(`${this._baseUrl}/auth/login`, credentials).pipe(
      map(response => {
        console.log('Connexion réussie :', response.message);
        return { token: response.payload.token } as LoginResponse;
      }),
      tap(loginData => {
        this._setToken(loginData.token);
        this._isAuthenticatedSubject.next(true);
        this._router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this._TOKEN_KEY);
    this._isAuthenticatedSubject.next(false);
    this._router.navigate(['/authentification']);
  }

  getToken(): string | null {
    return localStorage.getItem(this._TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private _setToken(token: string): void {
    localStorage.setItem(this._TOKEN_KEY, token);
  }

  private _hasToken(): boolean {
    return !!this.getToken();
  }

  private _executeWithDecodedToken<T>(callback: (decodedToken: DecodedToken) => T, defaultValue: T): T {
    const token = this.getToken();
    if (!token) {
      return defaultValue;
    }

    try {
      const decodedToken = this._decodeToken(token);
      return callback(decodedToken);
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return defaultValue;
    }
  }

  getUserRoles(): Role[] {
    return this._executeWithDecodedToken(decodedToken => decodedToken.roles || [], []);
  }

  getUserMainRoles(): string[] {
    return this._executeWithDecodedToken(decodedToken => (decodedToken.roles || []).map(role => role.authority), []);
  }

  getCurrentUserDisplayName(): string {
    return this._executeWithDecodedToken(decodedToken => decodedToken.fullName || decodedToken.sub || '', '');
  }

  private _decodeToken(token: string): DecodedToken {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Token JWT invalide');
      }

      const payload = parts[1];
      const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
      const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));

      return JSON.parse(decodedPayload) as DecodedToken;
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      throw error;
    }
  }
}
