import cx from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Order, OrderForm } from "../components/cart";
import { IconCart, IconClose, IconList } from "../components/img/icons";
import { Products } from "../components/product";
import { Button, Header, HeaderSearch, Overlay } from "../components";
import { OrdersContext } from "../state/orders/OrdersContext";
import { ProductsContext } from "../state/products/ProductsContext";
import { CartProduct, OrderFormData, Product } from "../types";
import { filterProductsByText } from "../utils";

interface HomeProps {
  data: { products: Product[] };
}

type CartView = "cart" | "orders";

const Home: NextPage<HomeProps> = ({ data: { products: productsData } }) => {
  const { products, productsMap, setProducts } = useContext(ProductsContext);
  const { orders, cart, onAdd, onSubtract, removeItem, addOrder, clearCart } =
    useContext(OrdersContext);
  const [searchText, setSearchText] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState<CartView>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const [offsetTop, setOffsetTop] = useState(
    headerRef.current?.offsetHeight || 0
  );

  const cartProducts: CartProduct[] = useMemo(
    () => cart.map(({ id, ...rest }) => ({ ...productsMap.get(id)!, ...rest })),
    [productsMap, cart]
  );

  const onCartOptionClickHandler = (id: CartView) => () => {
    setOverlayContent(id);
    setCartOpen(!cartOpen || !(cartOpen && id === overlayContent));
  };

  const onSetOpenHandler = useCallback((open: boolean) => {
    setCartOpen(open);
  }, []);

  const onSearchHandler = (text: string) => {
    setSearchText(text);
  };

  const onCartItemRemoveHandler = (id: number) => {
    const item = cartProducts.find(
      ({ id: cartProductId }) => id === cartProductId
    );

    if (
      item &&
      (item.quantity > 1 ||
        (item.quantity === 1 &&
          confirm("Are you sure you want to remove this item?")))
    ) {
      onSubtract(id);
    }
  };

  const renderOverlayButton = ({
    id,
    label,
    icon: Icon,
  }: {
    id: CartView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    const isActive = id === overlayContent && cartOpen;

    return (
      <Button
        className={cx({
          "bg-black !text-white hover:!bg-white hover:!text-black hover:!border-black focus:border-transparent":
            isActive,
        })}
        icon={isActive ? IconClose : Icon}
        onClick={onCartOptionClickHandler(id)}
      >
        {isActive ? "Close" : label}
      </Button>
    );
  };

  const onFormSubmitHandler = ({ items, email }: OrderFormData) => {
    addOrder({ items, email });
    clearCart();
    setOverlayContent("orders");
  };

  useEffect(() => {
    setProducts(productsData);
  }, [setProducts, productsData]);

  useEffect(() => {
    setFilteredProducts(filterProductsByText(products)(searchText));
  }, [searchText, products]);

  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <title>myos | Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        onHeightChange={(height) => setOffsetTop(height)}
        headerRight={
          <button
            type="button"
            className="relative"
            onClick={onCartOptionClickHandler("cart")}
          >
            {!!cartProducts.length && (
              <div className="absolute w-2.5 h-2.5 bg-red-600 rounded-full -top-1 -right-1"></div>
            )}
            <IconCart className="w-8 fill-black" />
          </button>
        }
        ref={headerRef}
      />
      <HeaderSearch
        searchText={searchText}
        onSearch={onSearchHandler}
        searchError={filteredProducts.length === 0 && !!searchText}
        top={offsetTop}
        aria-hidden={cartOpen !== false}
        tabIndex={cartOpen ? -1 : 0}
      />
      <main className="flex flex-col justify-between grow">
        <div className="px-5 pt-4 pb-24" aria-hidden={cartOpen !== false}>
          {!filteredProducts.length && !!searchText && (
            <span className="text-2xl">No products found</span>
          )}
          {!!filteredProducts.length && (
            <>
              {!!searchText && (
                <div className="text-2xl mb-10">
                  {filteredProducts.length} product
                  {filteredProducts.length > 1 ? "s" : ""} found
                </div>
              )}
              <Products
                products={filteredProducts}
                cart={cart}
                onAdd={onAdd}
                onSubtract={onSubtract}
                disabled={cartOpen !== false}
              />
            </>
          )}
        </div>
        <Overlay
          top={offsetTop}
          open={cartOpen}
          setOpen={onSetOpenHandler}
          buttons={
            <div className="grid grid-flow-col gap-2 auto-cols-fr">
              {renderOverlayButton({
                id: "cart",
                label: "View Cart",
                icon: IconCart,
              })}
              {!!orders.length &&
                renderOverlayButton({
                  id: "orders",
                  label: "View orders",
                  icon: IconList,
                })}
            </div>
          }
        >
          {overlayContent === "cart" && (
            <OrderForm
              className="w-full max-w-2xl mx-auto"
              cart={cartProducts}
              onAdd={onAdd}
              onSubtract={onCartItemRemoveHandler}
              onRemoveItem={removeItem}
              onFormSubmit={onFormSubmitHandler}
            />
          )}
          {overlayContent === "orders" && (
            <Order
              className="w-full max-w-xl lg:max-w-2xl mx-auto"
              orders={orders}
            />
          )}
        </Overlay>
      </main>
      <footer className="bg-black text-white px-5 pt-10 pb-20 mt-auto">
        Developed by Vikash Deepchand
        <br />
        <span className="text-sm">
          <span className="font-medium">e</span>: vikash.deepchand@gmail.com
        </span>
      </footer>
    </div>
  );
};

const getServerSideProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    return { props: { data: { products } } };
  } catch (e) {
    return { props: { data: { products: [] } } };
  }
};

export default Home;
export { getServerSideProps };
