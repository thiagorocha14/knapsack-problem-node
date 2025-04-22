import CombinationDTO from "../dtos/combination_dto";
import KnapsackDTO from "../dtos/knapsack_dto";
import ProductDTO from "../dtos/product_dto";
import CombinationService from "./combination_service";

class KnapsackService {
    knapsack: KnapsackDTO;

    constructor(){
        this.knapsack = {
            capacity: 0,
            number_of_combinations: 0,
            combination: {
                price: 0,
                weight: 0,
                products: []
            }
        };
    }

    solve(knapsackCapacity: number, products: ProductDTO[]): KnapsackDTO {
        this.knapsack.capacity = knapsackCapacity;
        this.knapsack.number_of_combinations = this.calculateNumberOfCombinations(products);

        let begin = 0;
        let end = this.knapsack.number_of_combinations;

        for (let i = begin; i < end; i++) {
            let combination = CombinationService.createCombination(i, products);

            if (!this.canStoreProducts(combination)) {
                continue;
            }

            if (this.isBetterCombination(combination)) {
                this.knapsack.combination = combination;
            }
        }

        return this.knapsack;
    }

    calculateNumberOfCombinations(products: ProductDTO[]): number {
        let quantities = products.map(product => (product.quantity + 1));

        let numberOfCombinations = 1;

        quantities.forEach(quantity => {
            numberOfCombinations *= quantity;
        });

        return numberOfCombinations;
    }

    canStoreProducts(combination: CombinationDTO): boolean {
        return combination.weight <= this.knapsack.capacity;
    }

    isBetterCombination(combination: CombinationDTO): boolean {
        if (combination.price > this.knapsack.combination.price) {
            return true;
        }

        if (combination.price === this.knapsack.combination.price) {
            if (combination.weight < this.knapsack.combination.weight) {
                return true;
            }
        }

        return false;
    }
}

export default KnapsackService;