import { SeedProduct } from "../../types";
import { clothingMale } from "./clothingMale";
import { clothingMixte } from "./clothingMixte";

export const clothingProducts: SeedProduct[] = [
  ...clothingMale,
  ...clothingMixte,
];
