import { SeedProduct } from "../types";
import { shoesFemale } from "./shoesFemale";
import { shoesMale } from "./shoesMale";
import { shoesMixte } from "./shoesMixte";

export const shoesProducts: SeedProduct[] = [
  ...shoesMale,
  ...shoesFemale,
  ...shoesMixte,
];
