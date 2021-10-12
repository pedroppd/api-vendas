export interface IRequestSaveProduct {
  name: string;
  price: number;
  nutritionalTable: INutritionalTable;
  quantity: number;
}

interface INutritionalTable {
  energeticValue: number;
  carbohydrate: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  fiber: number;
  sodium: number;
}
