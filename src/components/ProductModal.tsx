
import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

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
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: product.color,
      inStock: true
    });
    onClose();
  };

  const getProductDescription = () => {
    if (product.descriptionKey) {
      return t(product.descriptionKey);
    }
    return product.description || t('desc.default');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('product.details')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/80 rounded-full transition-all duration-300 hover:scale-110 group"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-gray-700 group-hover:rotate-90 transition-all duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    -{product.discount}% OFF
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border">
                  {t(product.category.toLowerCase())}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h3>

              <div className="flex items-center space-x-3">
                {product.originalPrice && (
                  <span className="text-lg md:text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
              </div>

              {/* Product Details */}
              <div className="space-y-3 bg-gray-50 rounded-xl p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600 text-sm md:text-base">{t('category')}:</span>
                  <span className="text-gray-800 font-semibold text-sm md:text-base">{t(product.category.toLowerCase())}</span>
                </div>
                {product.brand && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 text-sm md:text-base">{t('brand')}:</span>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">{product.brand}</span>
                  </div>
                )}
                {product.model && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 text-sm md:text-base">{t('model')}:</span>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">{product.model}</span>
                  </div>
                )}
                {product.color && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 text-sm md:text-base">{t('color')}:</span>
                    <span className="text-gray-800 font-semibold capitalize text-sm md:text-base">{product.color}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3 md:space-y-4">
                <h4 className="font-semibold text-gray-800 text-lg md:text-xl">{t('about.product')}</h4>
                <p className="text-gray-600 leading-relaxed bg-blue-50 p-4 md:p-6 rounded-xl border-l-4 border-blue-500 text-sm md:text-base">
                  {getProductDescription()}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 md:py-6 px-6 md:px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 group transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm md:text-lg"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
                <span>{t('add.to.cart')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
