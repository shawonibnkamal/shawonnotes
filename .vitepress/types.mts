export type SidebarItem = {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}
