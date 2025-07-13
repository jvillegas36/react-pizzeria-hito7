import { createContext,  useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carro, setCarro] = useState([]);

  const addToCart = (pizza) => {
   const exists = carro.find(item => item.id === pizza.id);
    if (exists) {
      setCarro(carro.map(item =>
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCarro([...carro, { ...pizza, quantity: 1 }]);
      }
  };

  const sumaPizza = (id) => {
    setCarro(
      carro.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const restaPizza = (id) => {
    setCarro(carro
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  };

    const total = carro.reduce((sumAcum, item) => sumAcum + item.price * item.quantity, 0);
    
  return (
      <CartContext.Provider value={{
          carro,
          addToCart,
          sumaPizza,
          restaPizza,
          total
      }}>
      {children}
    </CartContext.Provider>
  );
};

// export const useCart = () => {
//   return useContext(CartContext);
// };

export default CartProvider;