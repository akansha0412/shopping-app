export interface IResources {
  id: number;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: "men's clothing";
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface IProductResponse {
  total: number;
  count: number;
  resources: IResources[];
}

export interface IErrorResponse {
  type?: string;
  message?: string;
  code?: number;
}
