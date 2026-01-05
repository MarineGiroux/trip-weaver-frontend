import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conditions-generales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conditions-generales.component.html',
  styleUrl: './conditions-generales.component.scss',
})
export class ConditionsGeneralesComponent {
  getCurrentDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
