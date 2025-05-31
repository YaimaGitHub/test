
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color?: string;
  quantity: number;
  inStock?: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'hp-victus-gaming',
      name: 'HP Victus Gaming Laptop, 12th Gen Intel Core i5-12450H, NVIDIA RTX 3050 GPU, 15.6-inch (39.6 cm), FHD, IPS,...',
      price: 866,
      originalPrice: 1200,
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=200&fit=crop',
      color: 'blue',
      quantity: 2,
      inStock: true
    },
    {
      id: 'samsung-s21-fe',
      name: 'Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)',
      price: 434,
      originalPrice: 600,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
      color: 'lavender',
      quantity: 1,
      inStock: true
    }
  ]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      // Show toast notification with modern animation
      toast.success(
        <div className="flex items-center space-x-3">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div>
            <p className="font-semibold text-sm">¡Agregado al carrito!</p>
            <p className="text-xs text-gray-600 line-clamp-1">{item.name}</p>
          </div>
        </div>,
        {
          duration: 3000,
          className: "animate-scale-in border-l-4 border-l-green-500"
        }
      );
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
