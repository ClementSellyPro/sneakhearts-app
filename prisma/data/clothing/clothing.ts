import { SeedProduct } from "../../types";
import { clothingFemale } from "./clothingFemale";
import { clothingMale } from "./clothingMale";
import { clothingMixte } from "./clothingMixte";

export const clothingProducts: SeedProduct[] = [
  ...clothingMale,
  ...clothingFemale,
  ...clothingMixte,
];
