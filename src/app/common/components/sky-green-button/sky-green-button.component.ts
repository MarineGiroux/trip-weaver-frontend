import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sky-green-button',
  imports: [NgClass],
  templateUrl: './sky-green-button.component.html',
  styleUrl: './sky-green-button.component.scss',
})
export class SkyGreenButtonComponent {
  @Input() name: string = '';
  @Input() type: string = 'submit';
  @Input() customClass: string = 'sm:justify-start';
  @Input() size: string = 'h-12';
  @Input() icon: string | null = null;
}
