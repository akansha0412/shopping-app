export interface IItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export interface ICart {
  count: number;
  items: IItem[];
}

export interface ICartData {
  count: number;
  resources: IItem[];
}
