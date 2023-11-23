export interface Product {
  _id?: string;
  name: string;
  category: string;
  location: string;
  image: string;
  price: number;
  isImgFile?: boolean;
}
