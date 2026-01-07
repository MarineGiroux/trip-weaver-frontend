import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '../../../common/components/table/table.component';
import { Column } from '../../../common/shared/models/column.model';
import { Observable, of } from 'rxjs';
import { DestinationFacadeService } from '../service/destination-facade.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestinationDTO } from '../models/destination.model';

@Component({
  selector: 'app-destination',
  imports: [AsyncPipe, TableComponent],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.scss',
})
export class DestinationComponent implements OnInit {
  readonly destinationsFacadeService: DestinationFacadeService = inject(DestinationFacadeService);
  private readonly _destroyRef = inject(DestroyRef);

  columns: Column[] = [
    { field: 'country', header: 'Pays' },
    { field: 'continent', header: 'Continent' },
    { field: 'startAt', header: 'Date de départ' },
    { field: 'startEnd', header: 'Date d\'arriver' },
  ];

  form = [
    { field: 'country', label: 'Pays', type: 'text', required: true },
    { field: 'continent', label: 'Continent', type: 'text', required: true },
    { field: 'cityStart', label: 'Ville de départ', type: 'text', required: true },
    { field: 'cityEnd', label: 'Ville d\'arrivée', type: 'text', required: true },
    { field: 'startAt', label: 'Date de départ', type: 'date', required: true },
    { field: 'startEnd', label: 'Date d\'arriver', type: 'date', required: true }
  ];

  mainFieldsConfig: string[] = ['id', 'country', 'continent', 'cityStart', 'cityEnd', 'startAt', 'startEnd', 'duration'];

  globalFilterFields: string[] = ['country', 'continent', 'cityStart', 'cityEnd', 'startAt', 'startEnd', 'duration'];

  fieldToShow: string = 'country';
  fieldToShowTwo: string = 'continent';

  data$: Observable<DestinationDTO[]> = this.destinationsFacadeService.destinations$ ?? of([]);

  ngOnInit(): void {
    this.destinationsFacadeService.loadAll$().pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
