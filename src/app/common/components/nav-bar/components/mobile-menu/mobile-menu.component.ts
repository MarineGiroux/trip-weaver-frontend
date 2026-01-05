import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItem, UserInfo } from '../../type/menu.type';
import { UserInfoComponent } from '../user-info/user-info.component';
import { AuthService } from '../../../../pages/login/service/auth.service';

const ROLE_LENGTH_ZERO: number = 0;
const ROLE_LABEL: number = 0;
const ROLE_LENGTH_ONE: number = 0;

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [MenuItemComponent, UserInfoComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  private readonly _authService: AuthService = inject(AuthService);
  @Input({ required: true }) menuItems!: MenuItem[];
  @Output() itemClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() submenuToggle: EventEmitter<void> = new EventEmitter<void>();

  private _openDropdownComponent: MenuItemComponent | null = null;

  onItemClick(): void {
    this.itemClick.emit();
  }

  onSubmenuToggle(event: { isOpen: boolean; component: MenuItemComponent }): void {
    if (this._openDropdownComponent && this._openDropdownComponent !== event.component) {
      this._openDropdownComponent.closeDropdown();
    }

    if (event.isOpen) {
      this._openDropdownComponent = event.component;
    } else {
      this._openDropdownComponent = null;
    }

    this.submenuToggle.emit();
  }

  isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
  }

  getCurrentUserInfo(): UserInfo {
    return {
      displayName: this._getCurrentUserDisplayName(),
      role: this._getCurrentUserRole(),
    };
  }

  private _getCurrentUserRole(): string {
    const roles: string[] = this._authService.getUserMainRoles();
    if (!roles || roles.length === ROLE_LENGTH_ZERO) return 'User';

    const roleLabels: Record<string, string> = {
      ROLE_ADMINISTRATOR: 'Admin',
      ROLE_PARAMEDIC: 'Paramedic',
      ROLE_REGULATOR: 'Regulator',
    };

    const mainRole: string = roleLabels[roles[ROLE_LABEL]] || roles[ROLE_LABEL];
    const hasMoreRoles: boolean = roles.length > ROLE_LENGTH_ONE;

    return hasMoreRoles ? `${mainRole} +` : mainRole;
  }

  private _getCurrentUserDisplayName(): string {
    return this._authService.getCurrentUserDisplayName();
  }
}
