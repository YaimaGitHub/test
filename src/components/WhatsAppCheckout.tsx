
import React, { useState } from 'react';
import { X, Phone, MapPin, Package, User, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface WhatsAppCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryCodes = [
  { code: '+1', country: 'Estados Unidos / Canadá', flag: '🇺🇸' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+53', country: 'Cuba', flag: '🇨🇺' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', country: 'Panamá', flag: '🇵🇦' },
];

const deliveryLocations = [
  { name: 'Centro Histórico', price: 50, zone: 'Zona Centro' },
  { name: 'Reparto Sueño', price: 75, zone: 'Zona Norte' },
  { name: 'Vista Alegre', price: 80, zone: 'Zona Norte' },
  { name: 'Los Olmos', price: 60, zone: 'Zona Este' },
  { name: 'Micro 9', price: 90, zone: 'Zona Norte' },
  { name: 'San Pedrito', price: 70, zone: 'Zona Sur' },
  { name: 'Altamira', price: 85, zone: 'Zona Norte' },
  { name: 'Escario', price: 65, zone: 'Zona Centro' },
  { name: 'Chicharrones', price: 100, zone: 'Zona Oeste' },
  { name: 'Flores', price: 55, zone: 'Zona Centro' },
];

const WhatsAppCheckout = ({ isOpen, onClose }: WhatsAppCheckoutProps) => {
  const { cartItems, getTotalPrice } = useCart();
  const { t } = useLanguage();
  
  const [serviceType, setServiceType] = useState<'delivery' | 'pickup'>('delivery');
  const [countryCode, setCountryCode] = useState('+53');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pickupName, setPickupName] = useState('');
  const [pickupPhone, setPickupPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{8,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const subtotal = getTotalPrice();
  const selectedLocation = deliveryLocations.find(loc => loc.name === deliveryLocation);
  const deliveryFee = serviceType === 'delivery' && selectedLocation ? selectedLocation.price : 0;
  const total = subtotal + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = 'Número de teléfono inválido';
    }

    if (!pickupName.trim()) {
      newErrors.pickupName = 'Nombre requerido';
    }

    if (!validatePhone(pickupPhone)) {
      newErrors.pickupPhone = 'Teléfono inválido';
    }

    if (serviceType === 'delivery' && !deliveryLocation) {
      newErrors.deliveryLocation = 'Selecciona una ubicación';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    const serviceIcon = serviceType === 'delivery' ? '🚚' : '🏪';
    const timestamp = new Date().toLocaleString('es-ES');
    
    let message = `🛒 *NUEVO PEDIDO - PCCOMPONENTES* 🛒\n\n`;
    message += `📅 *Fecha:* ${timestamp}\n`;
    message += `${serviceIcon} *Tipo de Servicio:* ${serviceType === 'delivery' ? 'Entrega a domicilio' : 'Pedido para recoger'}\n\n`;
    
    message += `👤 *DATOS DEL CLIENTE*\n`;
    message += `📱 *WhatsApp:* ${countryCode} ${phoneNumber}\n`;
    message += `👨‍👩‍👧‍👦 *Quién recoge:* ${pickupName}\n`;
    message += `📞 *Teléfono contacto:* ${pickupPhone}\n\n`;

    if (serviceType === 'delivery') {
      message += `📍 *ENTREGA*\n`;
      message += `🏠 *Ubicación:* ${deliveryLocation}\n`;
      message += `💰 *Costo de entrega:* $${deliveryFee}\n\n`;
    }

    message += `🛍️ *PRODUCTOS PEDIDOS*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. 📦 *${item.name}*\n`;
      message += `   💵 Precio: $${item.price}\n`;
      message += `   🔢 Cantidad: ${item.quantity}\n`;
      message += `   💰 Subtotal: $${item.price * item.quantity}\n\n`;
    });

    message += `💳 *RESUMEN DE PAGO*\n`;
    message += `📊 *Subtotal productos:* $${subtotal}\n`;
    if (serviceType === 'delivery') {
      message += `🚚 *Costo de entrega:* $${deliveryFee}\n`;
    }
    message += `🏷️ *TOTAL A PAGAR:* $${total}\n\n`;

    if (additionalNotes) {
      message += `📝 *NOTAS ADICIONALES*\n${additionalNotes}\n\n`;
    }

    message += `✅ *Confirma tu pedido respondiendo este mensaje*\n`;
    message += `⏱️ *Tiempo estimado:* 30-45 minutos\n`;
    message += `🎉 *¡Gracias por tu preferencia!*`;

    return encodeURIComponent(message);
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) return;

    const message = formatWhatsAppMessage();
    const whatsappNumber = '5353123456'; // Número del dueño
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Finalizar Pedido</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Service Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Package className="w-4 h-4 inline mr-2" />
              Tipo de Servicio
            </label>
            <RadioGroup value={serviceType} onValueChange={(value) => setServiceType(value as 'delivery' | 'pickup')}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="delivery" id="delivery" />
                <label htmlFor="delivery" className="flex items-center cursor-pointer">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Entrega a domicilio
                </label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="pickup" id="pickup" />
                <label htmlFor="pickup" className="flex items-center cursor-pointer">
                  <Package className="w-4 h-4 mr-2 text-green-600" />
                  Pedido para recoger en el local
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* WhatsApp Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Tu número de WhatsApp
            </label>
            <div className="flex space-x-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center">
                        <span className="mr-2">{country.flag}</span>
                        {country.code}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Pickup Person */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              ¿Quién recoge el pedido?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder="Nombre completo"
                  value={pickupName}
                  onChange={(e) => setPickupName(e.target.value)}
                  className={errors.pickupName ? 'border-red-500' : ''}
                />
                {errors.pickupName && <p className="text-red-500 text-sm mt-1">{errors.pickupName}</p>}
              </div>
              <div>
                <Input
                  placeholder="Teléfono"
                  value={pickupPhone}
                  onChange={(e) => setPickupPhone(e.target.value)}
                  className={errors.pickupPhone ? 'border-red-500' : ''}
                />
                {errors.pickupPhone && <p className="text-red-500 text-sm mt-1">{errors.pickupPhone}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Location (only for delivery) */}
          {serviceType === 'delivery' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                ¿Dónde entregamos su pedido?
              </label>
              <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                <SelectTrigger className={errors.deliveryLocation ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecciona una ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryLocations.map((location) => (
                    <SelectItem key={location.name} value={location.name}>
                      <div className="flex justify-between items-center w-full">
                        <span>{location.name} ({location.zone})</span>
                        <span className="text-green-600 font-semibold ml-4">+${location.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.deliveryLocation && <p className="text-red-500 text-sm mt-1">{errors.deliveryLocation}</p>}
            </div>
          )}

          {/* Additional Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Quieres aclararnos algo?
            </label>
            <Textarea
              placeholder="Instrucciones especiales, referencias de ubicación, etc."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Resumen del Pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal productos:</span>
                <span>${subtotal}</span>
              </div>
              {serviceType === 'delivery' && deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Costo de entrega:</span>
                  <span>+${deliveryFee}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total a pagar:</span>
                <span className="text-green-600">${total}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <Button
            onClick={handleSendWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Enviar Pedido por WhatsApp</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppCheckout;
