import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './politique-confidentialite.component.html',
  styleUrl: './politique-confidentialite.component.scss',
})
export class PolitiqueConfidentialiteComponent {
  getCurrentDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
