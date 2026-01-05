import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-logo',
  standalone: true,
  imports: [],
  templateUrl: './navbar-logo.component.html',
  styleUrl: './navbar-logo.component.scss',
})
export class NavbarLogoComponent {
  @Input({ required: true }) logoSrc!: string;
  @Input() isMobile: boolean = false;
}
