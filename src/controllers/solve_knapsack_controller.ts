import { Request, Response } from "express";
import KnapsackDTO from "../dtos/knapsack_dto";
import ProductDTO from "../dtos/product_dto";
import KnapsackService from "../services/knapsack_service";
import { SolveKnapsackRequest } from "../requests/solve_knapsack_request";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

class SolveKnapsackController {

    knapsackService: KnapsackService;

    constructor(knapsackService: KnapsackService) {
        this.knapsackService = knapsackService;
    }

    async solve(request: Request, response: Response) {
        try {
            const body = plainToInstance(SolveKnapsackRequest, request.body);

            const start = Date.now();

            const errors = await validate(body);

            if (errors.length > 0) {
                return response.status(400).json({ errors: errors.map(error => error.constraints) });
            }


            const knapsackCapacity: number = body.knapsack_capacity;
            const products: ProductDTO[] = body.products;
            const knapsack: KnapsackDTO = this.knapsackService.solve(knapsackCapacity, products);

            const end = Date.now();
            const time = end - start;

            response.status(200).json(
                {
                    solution: knapsack,
                    message: 'Knapsack problem solved successfully',
                    execution_time: time,
                }
            );

        } catch (error: any) {
            response.status(500).json({ error: 'Internal server error', message: error.message });
        }

    }
}

export default SolveKnapsackController;
