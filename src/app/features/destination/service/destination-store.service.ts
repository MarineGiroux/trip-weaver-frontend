import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DestinationDTO } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationStoreService {
  private _destinations$: BehaviorSubject<DestinationDTO[]> = new BehaviorSubject<DestinationDTO[]>([]);

  get destinations$(): Observable<DestinationDTO[]> {
    return this._destinations$.asObservable();
  }

  setAll$(destinations: DestinationDTO[]): void {
    const safeDestinations = destinations || [];
    this._destinations$.next(safeDestinations);
  }

  create$(destination: DestinationDTO): void {
    this._destinations$.next([...this._destinations$.value, destination]);
  }

  update$(destination: DestinationDTO): void {
    const updatedDestinations: DestinationDTO[] = this._destinations$.value.map(p => (p.id === destination.id ? destination : p));
    this._destinations$.next(updatedDestinations);
  }

  delete$(destinationId: string): void {
    const updatedDestinations: DestinationDTO[] = this._destinations$.value.filter(destination => destination.id !== destinationId);
    this._destinations$.next(updatedDestinations);
  }
}
