import { Product } from "../types";

interface FilterFunction {
  (product: Product): boolean;
}

const filterByText =
  (text: string) =>
  ({ title, description }: Product): boolean => {
    const textLowercase = text.toLowerCase();

    return (
      title.toLowerCase().search(textLowercase) > -1 ||
      description.toLowerCase().search(textLowercase) > -1
    );
  };

const filterProducts = (products: Product[], filter: FilterFunction) =>
  products.filter((product) => filter(product));

const filterProductsByText = (products: Product[]) => (text: string) =>
  filterProducts(products, filterByText(text));

export { filterProducts, filterProductsByText };
