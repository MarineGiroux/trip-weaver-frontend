import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../general/type/api-response.type';
import { Destination, DestinationDTO } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationHttpService {
  private _http: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiUrl;

  getRegularDestinations$(): Observable<ApiResponse<DestinationDTO[]>> {
    return this._http.get<ApiResponse<DestinationDTO[]>>(`${this._baseUrl}/destination`);
  }

  getDestinationById$(destinationId: string): Observable<ApiResponse<Destination>> {
    return this._http.get<ApiResponse<Destination>>(`${this._baseUrl}/destination/${destinationId}`);
  }

  create$(destination: Destination): Observable<ApiResponse<Destination>> {
    return this._http.post<ApiResponse<Destination>>(`${this._baseUrl}/destination`, destination);
  }

  update$(destination: Destination): Observable<ApiResponse<Destination>> {
    return this._http.put<ApiResponse<Destination>>(`${this._baseUrl}/destination/${destination.id}`, destination);
  }

  delete$(destinationId: string): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this._baseUrl}/destination/${destinationId}`);
  }
}
