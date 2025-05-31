
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Header
    'search.placeholder': 'Buscar productos...',
    'cart': 'Carrito',
    'notifications': 'Notificaciones',
    'user': 'Usuario',
    
    // Cart
    'shopping.cart': 'Carrito de compras',
    'items': 'artículos',
    'continue.shopping': 'continuar comprando',
    'cart.empty': 'Tu carrito está vacío',
    'cart.empty.description': '¡Agrega algunos productos para comenzar!',
    'start.shopping': 'Comenzar a Comprar',
    'color': 'color',
    'price': 'precio',
    'in.stock': 'En Stock',
    'qty': 'Cant:',
    'remove': 'eliminar',
    'order.summary': 'Resumen del Pedido',
    'price.label': 'Precio:',
    'delivery': 'Envío:',
    'free': 'Gratis',
    'discount': 'Descuento:',
    'subtotal': 'Subtotal:',
    'proceed.to.pay': 'proceder al pago',
    
    // Products
    'product.details': 'Detalles del Producto',
    'brand': 'Marca',
    'model': 'Modelo',
    'about.product': 'Acerca de este producto:',
    'add.to.cart': 'Agregar al Carrito',
    'added.to.cart': '¡Agregado al carrito!',
    'category': 'Categoría',
    'categories': 'Categorías',
    'filters': 'Filtros',
    
    // Categories
    'all': 'Todos',
    'mobile': 'Móviles',
    'laptop': 'Laptops',
    'gaming': 'Gaming',
    'audio': 'Audio',
    'accessories': 'Accesorios',
    'tv': 'TV',
    'appliances': 'Electrodomésticos',
    
    // Filters
    'popular': 'Popular',
    'cheap': 'Baratos',
    'expensive': 'Caros',
    'sale': 'Oferta',
    
    // Notifications
    'new.products': 'Nuevos Productos',
    'no.new.products': 'No hay productos nuevos',
    'view.product': 'Ver Producto',
    
    // Product Descriptions
    'desc.samsung.s24': 'Smartphone premium con cámara de 200MP, S Pen integrado y pantalla Dynamic AMOLED 2X de 6.8 pulgadas.',
    'desc.macbook.pro': 'Laptop profesional con chip M3, 18 horas de batería y pantalla Liquid Retina XDR de 16 pulgadas.',
    'desc.ps5.pro': 'Consola de videojuegos de última generación con ray tracing avanzado y SSD ultra rápido.',
    'desc.airpods.pro': 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial personalizado.',
    'desc.ipad.pro': 'Tablet profesional con chip M4, pantalla Liquid Retina XDR y compatibilidad con Apple Pencil Pro.',
    'desc.samsung.qled': 'Smart TV QLED 4K con tecnología Quantum Dot, HDR10+ y sistema operativo Tizen.',
    'desc.dyson.v15': 'Aspiradora inalámbrica con detección láser de polvo y hasta 60 minutos de autonomía.',
    'desc.iphone.15': 'Smartphone premium con titanio, cámara de 48MP con zoom óptico 5x y chip A17 Pro.'
  },
  en: {
    // Header
    'search.placeholder': 'Search products...',
    'cart': 'Cart',
    'notifications': 'Notifications',
    'user': 'User',
    
    // Cart
    'shopping.cart': 'Shopping cart',
    'items': 'items',
    'continue.shopping': 'continue shopping',
    'cart.empty': 'Your cart is empty',
    'cart.empty.description': 'Add some products to get started!',
    'start.shopping': 'Start Shopping',
    'color': 'color',
    'price': 'price',
    'in.stock': 'In Stock',
    'qty': 'Qty:',
    'remove': 'remove',
    'order.summary': 'Order Summary',
    'price.label': 'Price:',
    'delivery': 'Delivery:',
    'free': 'Free',
    'discount': 'Discount:',
    'subtotal': 'Subtotal:',
    'proceed.to.pay': 'proceed to pay',
    
    // Products
    'product.details': 'Product Details',
    'brand': 'Brand',
    'model': 'Model',
    'about.product': 'About this product:',
    'add.to.cart': 'Add to Cart',
    'added.to.cart': 'Added to cart!',
    'category': 'Category',
    'categories': 'Categories',
    'filters': 'Filters',
    
    // Categories
    'all': 'All',
    'mobile': 'Mobile',
    'laptop': 'Laptops',
    'gaming': 'Gaming',
    'audio': 'Audio',
    'accessories': 'Accessories',
    'tv': 'TV',
    'appliances': 'Appliances',
    
    // Filters
    'popular': 'Popular',
    'cheap': 'Cheap',
    'expensive': 'Expensive',
    'sale': 'Sale',
    
    // Notifications
    'new.products': 'New Products',
    'no.new.products': 'No new products',
    'view.product': 'View Product',
    
    // Product Descriptions
    'desc.samsung.s24': 'Premium smartphone with 200MP camera, integrated S Pen and 6.8-inch Dynamic AMOLED 2X display.',
    'desc.macbook.pro': 'Professional laptop with M3 chip, 18-hour battery life and 16-inch Liquid Retina XDR display.',
    'desc.ps5.pro': 'Next-generation gaming console with advanced ray tracing and ultra-fast SSD.',
    'desc.airpods.pro': 'Wireless earbuds with active noise cancellation and personalized spatial audio.',
    'desc.ipad.pro': 'Professional tablet with M4 chip, Liquid Retina XDR display and Apple Pencil Pro compatibility.',
    'desc.samsung.qled': 'QLED 4K Smart TV with Quantum Dot technology, HDR10+ and Tizen operating system.',
    'desc.dyson.v15': 'Cordless vacuum cleaner with laser dust detection and up to 60 minutes of runtime.',
    'desc.iphone.15': 'Premium smartphone with titanium, 48MP camera with 5x optical zoom and A17 Pro chip.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
