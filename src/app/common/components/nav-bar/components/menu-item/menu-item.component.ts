import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../type/menu.type';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  @ViewChild('dropdownContainer') dropdownContainer?: ElementRef;
  @ViewChild('submenuContainer') submenuContainer?: ElementRef;

  @Input({ required: true }) item!: MenuItem;
  @Input() isMobile: boolean = false;
  @Output() submenuToggle = new EventEmitter<{ isOpen: boolean; component: MenuItemComponent }>();
  @Output() itemClick = new EventEmitter<void>();

  isDropdownOpen: boolean = false;
  isExpandedMobile: boolean = false;

  get isMainButton(): boolean {
    return this.item.styleClass?.includes('bg-mainButton') ?? false;
  }

  get buttonClasses(): string {
    const baseClasses: string = this.isMobile
      ? 'mobile-menu-item w-full text-left p-3 rounded-md flex items-center transition-colors duration-200'
      : 'nav-item px-3 py-2 rounded-md flex items-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700';

    const activeClasses: string = this.isDropdownOpen && !this.isMobile ? ' bg-gray-100 dark:bg-gray-700' : '';

    return baseClasses + activeClasses;
  }

  get chevronClasses(): string {
    if (this.isMobile) {
      return this.item.expanded ? 'pi-chevron-up' : 'pi-chevron-down';
    }
    return this.isDropdownOpen ? 'pi-chevron-up' : 'pi-chevron-down';
  }

  get submenuClasses(): string {
    if (this.isMobile) {
      return 'submenu pl-4 mt-1 space-y-1';
    }
    return 'dropdown-menu absolute top-full left-0 mt-1 rounded-md shadow-lg z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-w-48 animate-in fade-in-0 zoom-in-95 duration-200';
  }

  get submenuItemClasses(): string {
    return this.isMobile
      ? 'mobile-submenu-item p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
      : 'dropdown-item block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200 first:rounded-t-md last:rounded-b-md';
  }

  get simpleItemClasses(): string {
    return this.isMobile
      ? 'mobile-menu-item w-full text-left p-3 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
      : 'nav-item px-3 py-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMobile && this.isDropdownOpen) {
      const clickedElement = event.target as HTMLElement;
      const isInsideDropdown = this.dropdownContainer?.nativeElement.contains(clickedElement);

      if (!isInsideDropdown) {
        this.closeDropdown();
      }
    }
  }

  onToggleSubmenu(event: MouseEvent): void {
    event.stopPropagation();

    if (this.isMobile) {
      this.isExpandedMobile = !this.isExpandedMobile;

      this.submenuToggle.emit({
        isOpen: this.isExpandedMobile,
        component: this,
      });
    } else {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.submenuToggle.emit({
        isOpen: this.isDropdownOpen,
        component: this,
      });
    }
  }

  onItemClick(): void {
    if (this.item.command) {
      this.item.command();
    }
    this.itemClick.emit();
  }

  onSubmenuClick(): void {
    if (this.isMobile) {
      this.item.expanded = false;
    } else {
      this.closeDropdown();
    }
    this.itemClick.emit();
  }

  closeDropdown(): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
    if (this.isExpandedMobile) {
      this.isExpandedMobile = false;
    }
  }
}
