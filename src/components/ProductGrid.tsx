
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  brand?: string;
  model?: string;
  color?: string;
  description?: string;
  descriptionKey?: string;
  isPopular?: boolean;
  isSale?: boolean;
  isNew?: boolean; // Campo para productos nuevos
}

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  selectedCategory: string;
  searchTerm: string;
  selectedFilter?: string;
}

const ProductGrid = ({ onProductClick, selectedCategory, searchTerm, selectedFilter }: ProductGridProps) => {
  const { t } = useLanguage();
  const { addNotification } = useNotifications();
  const [animateCategory, setAnimateCategory] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'Samsung Galaxy S24 Ultra',
      price: 1299,
      originalPrice: 1499,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      category: 'Mobile',
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      color: 'Titanium Black',
      descriptionKey: 'desc.samsung.s24',
      isPopular: true,
      isSale: true,
      isNew: true // Producto nuevo
    },
    {
      id: '2',
      name: 'MacBook Pro 16" M3',
      price: 2499,
      originalPrice: 2699,
      discount: 7,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Laptop',
      brand: 'Apple',
      model: 'MacBook Pro 16"',
      color: 'Space Gray',
      descriptionKey: 'desc.macbook.pro',
      isPopular: true
    },
    {
      id: '3',
      name: 'PlayStation 5 Pro',
      price: 699,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
      category: 'Gaming',
      brand: 'Sony',
      model: 'PS5 Pro',
      color: 'White',
      descriptionKey: 'desc.ps5.pro',
      isPopular: true,
      isNew: true // Producto nuevo
    },
    {
      id: '4',
      name: 'AirPods Pro 3rd Gen',
      price: 249,
      originalPrice: 279,
      discount: 11,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
      category: 'Audio',
      brand: 'Apple',
      model: 'AirPods Pro',
      color: 'White',
      descriptionKey: 'desc.airpods.pro',
      isSale: true
    },
    {
      id: '5',
      name: 'iPad Pro 12.9" M4',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      category: 'Accessories',
      brand: 'Apple',
      model: 'iPad Pro 12.9"',
      color: 'Silver',
      descriptionKey: 'desc.ipad.pro'
    },
    {
      id: '6',
      name: 'Samsung QLED 55" 4K',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      category: 'TV',
      brand: 'Samsung',
      model: 'QLED 55"',
      color: 'Black',
      descriptionKey: 'desc.samsung.qled',
      isSale: true
    },
    {
      id: '7',
      name: 'Dyson V15 Detect',
      price: 449,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      category: 'Appliances',
      brand: 'Dyson',
      model: 'V15 Detect',
      color: 'Yellow',
      descriptionKey: 'desc.dyson.v15'
    },
    {
      id: '8',
      name: 'iPhone 15 Pro Max',
      price: 1199,
      originalPrice: 1299,
      discount: 8,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Mobile',
      brand: 'Apple',
      model: 'iPhone 15 Pro Max',
      color: 'Natural Titanium',
      descriptionKey: 'desc.iphone.15',
      isPopular: true,
      isSale: true
    }
  ];

  // Agregar productos nuevos automáticamente a las notificaciones
  useEffect(() => {
    const newProducts = products.filter(product => product.isNew);
    newProducts.forEach(product => {
      // Simular que el producto fue agregado recientemente
      const productWithTimestamp = {
        ...product,
        timestamp: Date.now() - Math.random() * 300000 // Últimos 5 minutos
      };
      addNotification(productWithTimestamp);
    });
  }, []);

  // Efecto de animación al cambiar categoría
  useEffect(() => {
    setAnimateCategory(true);
    const timer = setTimeout(() => setAnimateCategory(false), 600);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredProducts = products.filter(product => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Search filter - búsqueda parcial mejorada
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Búsqueda por palabras parciales
      searchTerm.toLowerCase().split(' ').some(term => 
        product.name.toLowerCase().includes(term) ||
        product.brand?.toLowerCase().includes(term) ||
        product.model?.toLowerCase().includes(term)
      );
    
    // Additional filters
    let matchesFilter = true;
    if (selectedFilter && selectedFilter !== 'All') {
      switch (selectedFilter) {
        case 'Popular':
          matchesFilter = product.isPopular || false;
          break;
        case 'Cheap':
          matchesFilter = product.price < 500;
          break;
        case 'Expensive':
          matchesFilter = product.price > 1000;
          break;
        case 'Sale':
          matchesFilter = product.isSale || product.discount ? true : false;
          break;
        default:
          matchesFilter = true;
      }
    }
    
    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Productos {filteredProducts.length > 0 && `(${filteredProducts.length})`}
        </h2>
        
        {/* Category Filter Indicator */}
        {selectedCategory !== 'All' && (
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm text-gray-600">Filtrando por:</span>
            <div className="flex items-center bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium animate-fade-in">
              <span className="mr-2">{t(selectedCategory.toLowerCase())}</span>
              <button
                onClick={() => {
                  const event = new CustomEvent('clearCategory');
                  window.dispatchEvent(event);
                }}
                className="text-blue-600 hover:text-blue-800 font-bold ml-1 hover:scale-110 transition-transform"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 ${
        animateCategory ? 'animate-fade-in' : ''
      }`}>
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:scale-[1.03] hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Badges */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
                {product.discount && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    -{product.discount}%
                  </div>
                )}
                {product.isNew && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    NUEVO
                  </div>
                )}
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/95 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium border shadow-sm">
                {t(product.category.toLowerCase())}
              </div>

              {/* View Details Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-3 sm:pb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-white/30">
                  <Eye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-sm sm:text-base">
                {product.name}
              </h3>
              
              {/* Brand and Model */}
              {(product.brand || product.model) && (
                <div className="text-xs sm:text-sm text-gray-500 mb-2">
                  {product.brand && <span className="font-medium">{product.brand}</span>}
                  {product.brand && product.model && <span className="mx-1">•</span>}
                  {product.model && <span>{product.model}</span>}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
          <p className="text-sm sm:text-base text-gray-500">Intenta con otros términos de búsqueda o categorías</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
