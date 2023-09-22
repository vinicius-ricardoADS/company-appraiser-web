import { Product } from "./Product";

export interface Company {
    id?: string;
    name?: string;
    segment?: string;
    products?: Product[];
}