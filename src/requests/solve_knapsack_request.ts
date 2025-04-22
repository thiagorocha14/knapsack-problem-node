import { IsNumber, ValidateNested } from "class-validator";
import ProductDTO from "../dtos/product_dto";

export class SolveKnapsackRequest {

    @IsNumber()
    knapsack_capacity: number;

    @ValidateNested({ each: true })
    products: ProductDTO[];
}