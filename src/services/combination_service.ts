import CombinationDTO from "../dtos/combination_dto";
import ProductDTO from "../dtos/product_dto";

class CombinationService {

    public static createCombination(index: number, products: ProductDTO[]): CombinationDTO {
        let bases = products.map(product => product.quantity);

        let selectedProducts: number[] = this.selectProduct(index, bases);
        let { price, weight } = this.calculatePriceAndWeight(selectedProducts, products);

        return {
            price,
            weight,
            products: selectedProducts
        }
    }

    public static selectProduct(index: number, bases: number[]): number[] {
        let selectedProducts: number[] = [];
        let quotient = index;
        bases.reverse();

        bases.forEach((base, i) => {
            let rest = quotient % (base + 1);
            quotient = Math.floor(quotient / (base + 1));
            selectedProducts.unshift(rest);
        });

        bases.reverse();

        return selectedProducts;
    }

    public static calculatePriceAndWeight(selectedProducts: number[], products: ProductDTO[]): { price: number, weight: number } {
        let price = 0;
        let weight = 0;

        selectedProducts.forEach((quantity, i) => {
            let product = products[i];
            price += product.price * quantity;
            weight += product.weight * quantity;
        });

        return { price, weight };
    }
}

export default CombinationService;