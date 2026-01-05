import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sky-blue-button',
  imports: [NgClass],
  templateUrl: './sky-blue-button.component.html',
  styleUrl: './sky-blue-button.component.scss',
})
export class SkyBlueButtonComponent {
  @Input() name: string = '';
  @Input() type: string = 'submit';
  @Input() customClass: string = 'sm:justify-start';
  @Input() size: string = 'h-12';
  @Input() icon: string | null = null;
}
