import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DestinationStoreService } from './destination-store.service';
import { DestinationHttpService } from './destination-http.service';
import { map } from 'rxjs/operators';
import { Destination, DestinationDTO } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationFacadeService {
  private _destinationHttpService: DestinationHttpService = inject(DestinationHttpService);
  private _destinationStoreService: DestinationStoreService = inject(DestinationStoreService);

  get destinations$(): Observable<DestinationDTO[]> {
    return this._destinationStoreService.destinations$;
  }

  loadAll$(): Observable<DestinationDTO[]> {
    return this._destinationHttpService.getRegularDestinations$().pipe(
      map(response => response.payload),
      tap(destinations => this._destinationStoreService.setAll$(destinations))
    );
  }

  getById$(destinationId: string): Observable<Destination> {
    return this._destinationHttpService.getDestinationById$(destinationId).pipe(map(response => response.payload));
  }

  create$(destination: Destination): Observable<Destination> {
    return this._destinationHttpService.create$(destination).pipe(
      map(response => response.payload),
      tap((createdDestination: Destination) => {
        const destinationTableDTO: DestinationDTO = this._convertDestinationToDestinationTableDTO(createdDestination);
        this._destinationStoreService.create$(destinationTableDTO);
      })
    );
  }

  update$(destination: Destination): Observable<Destination> {
    return this._destinationHttpService.update$(destination).pipe(
      map(response => response.payload),
      tap((updatedDestination: Destination) => {
        const destinationTableDTO: DestinationDTO = this._convertDestinationToDestinationTableDTO(updatedDestination);
        this._destinationStoreService.update$(destinationTableDTO);
      })
    );
  }

  delete$(destinationId: string): Observable<void> {
    return this._destinationHttpService.delete$(destinationId).pipe(
      map(() => void 0),
      tap(() => this._destinationStoreService.delete$(destinationId))
    );
  }

  private _convertDestinationToDestinationTableDTO(destination: Destination): DestinationDTO {
    return {
      id: destination.id,
      country: destination.country,
      continent: destination.continent,
      cityStart: destination.cityStart,
      cityEnd: destination.cityEnd,
      startAt: destination.startAt,
      startEnd: destination.startEnd,
      duration: destination.duration,
    };
  }
}
