import { Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  readonly name = input<string>('');
  readonly type = input<string>('submit');
  readonly customClass = input<string>('');
  readonly routerLink = input<string | null>(null);

  private readonly _router = inject(Router);

  onClick(): void {
    const link = this.routerLink();
    if (link) {
      this._router.navigate([link]);
    }
  }
}
