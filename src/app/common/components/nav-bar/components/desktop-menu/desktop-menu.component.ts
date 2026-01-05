import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItem } from '../../type/menu.type';

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
})
export class DesktopMenuComponent {
  @Input({ required: true }) menuItems!: MenuItem[];
  @Output() itemClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() dropdownToggle: EventEmitter<void> = new EventEmitter<void>();

  private _openDropdownComponent: MenuItemComponent | null = null;

  onItemClick(): void {
    this.itemClick.emit();
  }

  onDropdownToggle(event: { isOpen: boolean; component: MenuItemComponent }): void {
    if (this._openDropdownComponent && this._openDropdownComponent !== event.component) {
      this._openDropdownComponent.closeDropdown();
    }

    if (event.isOpen) {
      this._openDropdownComponent = event.component;
    } else {
      this._openDropdownComponent = null;
    }

    this.dropdownToggle.emit();
  }
}
