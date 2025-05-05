import React, { createContext, useState, useContext, PropsWithChildren } from "react";

// Tipo para os itens do carrinho
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Definição do contexto
interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Função para adicionar um item ao carrinho
  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      // Verificar se o item já está no carrinho
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Se o item já estiver no carrinho, apenas aumentamos a quantidade
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Se o item não estiver no carrinho, adicionamos ele
        return [...prevCart, item];
      }
    });
  };

  // Função para remover um item do carrinho
  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Contagem total de itens no carrinho
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};