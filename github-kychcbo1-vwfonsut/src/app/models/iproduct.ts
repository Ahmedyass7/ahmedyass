export interface Iproduct {
  id: number;
  catId: number;
  name: string;
  description: string;
  discount: number;
  avaliableColor: string[];
  availableSizes: enSize[];
  imagePath: string[];
  rate: number;
  price: number;
  dressStyle: enDressStyle;
  payNumber: number;
}

export enum enSize {
  small = 'SM',
  medium = 'MD',
  large = 'LG',
  xLarge = 'XL'
}

export enum enDressStyle {
  casual = 'Casual',
  formal = 'Formal',
  party = 'Party',
  gym = 'Gym'
}
