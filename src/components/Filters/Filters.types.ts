
export interface FiltersProps<ItemType> {
  setItem: (item: string | ItemType) => void;
  selectedItem: string;
  menuItems: string[];
  className?: string;
}
