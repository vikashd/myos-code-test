const calculateTotal = (cart: { quantity: number; price: number }[]) =>
  cart.reduce((acc, { quantity, price }) => acc + quantity * price, 0);

export { calculateTotal };
