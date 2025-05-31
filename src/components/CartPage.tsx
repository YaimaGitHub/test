
import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppCheckout from './WhatsAppCheckout';

interface CartPageProps {
  onContinueShopping: () => void;
}

const CartPage = ({ onContinueShopping }: CartPageProps) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { t } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = getTotalPrice();
  const delivery = subtotal > 0 ? 0 : 0; // Free delivery
  const discount = 195; // Fixed discount as shown in the image
  const total = subtotal - discount;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {t('shopping.cart')}
                </h1>
              </div>
              {cartItems.length > 0 && (
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full animate-pulse">
                  <span className="font-semibold text-sm md:text-base">
                    {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
                  </span>
                </div>
              )}
            </div>
            
            <button
              onClick={onContinueShopping}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-300 bg-white hover:bg-blue-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">{t('continue.shopping')}</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      
                      {item.color && (
                        <p className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md inline-block">
                          {t('color')}: <span className="font-medium">{item.color}</span>
                        </p>
                      )}
                      
                      <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {t('price')}: ${item.price}
                      </p>
                      
                      {item.inStock && (
                        <p className="text-sm text-green-600 font-medium flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          {t('in.stock')}
                        </p>
                      )}

                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600 font-medium">{t('qty')}</span>
                          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 hover:bg-gray-50 transition-colors font-semibold text-gray-600 hover:text-blue-600"
                            >
                              −
                            </button>
                            <span className="px-4 py-2 min-w-[3rem] text-center font-semibold bg-gray-50">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-gray-50 transition-colors font-semibold text-gray-600 hover:text-blue-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center space-x-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
                          <span className="text-sm font-medium">{t('remove')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                      <ShoppingBag className="w-16 h-16 text-blue-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('cart.empty')}</h3>
                  <p className="text-gray-600 mb-8 text-lg">{t('cart.empty.description')}</p>
                  <button
                    onClick={onContinueShopping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {t('start.shopping')}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t('order.summary')}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t('price.label')}</span>
                      <span className="font-semibold">${subtotal}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t('delivery')}:</span>
                      <span className="font-semibold text-green-600">
                        {delivery === 0 ? t('free') : `$${delivery}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t('discount')}:</span>
                      <span className="font-semibold text-red-600">-${discount}</span>
                    </div>
                    
                    <hr className="border-gray-200" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('subtotal')}:</span>
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ${total}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Proceder al Pago por WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Checkout Modal */}
      <WhatsAppCheckout 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </>
  );
};

export default CartPage;
