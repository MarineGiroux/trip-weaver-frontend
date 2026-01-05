export type MenuItem = {
  label: string;
  icon?: string;
  routerLink?: string;
  styleClass?: string;
  items?: MenuItem[];
  command?: () => void;
  expanded?: boolean;
};

export type UserInfo = {
  displayName: string;
  role: string;
};

export type NavbarState = {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  isMobileView: boolean;
};
