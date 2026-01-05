import { Component, DestroyRef, HostListener, inject, OnInit } from '@angular/core';
import { SwitchDarkModeComponent } from '../../switch-dark-mode/switch-dark-mode.component';
import { NgClass } from '@angular/common';
import { DesktopMenuComponent } from '../components/desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from '../components/mobile-menu/mobile-menu.component';
import { NavbarLogoComponent } from '../components/navbar-logo/navbar-logo.component';
import { MenuItem, NavbarState, UserInfo } from '../type/menu.type';
import { AuthService } from '../../../pages/login/service/auth.service';
import { MenuItemsService } from '../service/menu-item.service';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActionDeleteItem } from '../../../../general/type/custom-type';

const MOBILE_BREAKPOINT = 1160;
const SCROLL_THRESHOLD = 20;
const ROLE_LENGTH_ZERO: number = 0;
const ROLE_LABEL: number = 0;
const ROLE_LENGTH_ONE: number = 0;

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass, SwitchDarkModeComponent, DesktopMenuComponent, MobileMenuComponent, NavbarLogoComponent, UserInfoComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  navbarState: NavbarState = {
    isScrolled: false,
    isMobileMenuOpen: false,
    isMobileView: false,
  };

  menuItems: MenuItem[] = [];
  readonly logo: string = 'assets/logo.svg';

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _menuItemsService: MenuItemsService = inject(MenuItemsService);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.navbarState.isScrolled = window.scrollY > SCROLL_THRESHOLD;
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this._checkMobileView();
    if (window.innerWidth > MOBILE_BREAKPOINT && this.navbarState.isMobileMenuOpen) {
      this.navbarState.isMobileMenuOpen = false;
    }
  }

  ngOnInit(): void {
    this._initializeNavbar();
    this._subscribeToAuthChanges();
  }

  private _initializeNavbar(): void {
    this._updateMenuItems();
    this._checkMobileView();
  }

  private _subscribeToAuthChanges(): void {
    this._authService.isAuthenticated$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._updateMenuItems();
    });
  }

  private _checkMobileView(): void {
    this.navbarState.isMobileView = window.innerWidth <= MOBILE_BREAKPOINT;
  }

  private _updateMenuItems(): void {
    try {
      const primeItems = this._menuItemsService.getMenuItems(this.logo, () => this.logout());
      this.menuItems = primeItems.map(item => this._convertMenuItem(item));
    } catch (error) {
      console.error('Error updating menu items:', error);
    }
  }

  private _convertMenuItem(item: ActionDeleteItem): MenuItem {
    const customItem: MenuItem = {
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink,
      styleClass: item.styleClass,
      command: item.command,
      expanded: false,
    };

    if (item.items) {
      customItem.items = item.items.map((subItem: ActionDeleteItem) => this._convertMenuItem(subItem));
    }

    return customItem;
  }

  logout(): void {
    try {
      this._authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  toggleMobileMenu(): void {
    this.navbarState.isMobileMenuOpen = !this.navbarState.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.navbarState.isMobileMenuOpen = false;
  }

  getCurrentUserInfo(): UserInfo {
    return {
      displayName: this._getCurrentUserDisplayName(),
      role: this._getCurrentUserRole(),
    };
  }

  private _getCurrentUserDisplayName(): string {
    return this._authService.getCurrentUserDisplayName();
  }

  isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
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
}
