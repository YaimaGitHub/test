
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const HotSaleSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'GAMING SERIES 17"',
      subtitle: 'Laptop Gaming de Alto Rendimiento',
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=400&fit=crop',
      features: ['Pantalla de 17 pulgadas 100% Srgb para Experiencia Gaming Realista', 'Teclado Mecánico RGB Retroiluminado'],
      logo: 'GAMING',
      gradient: 'from-purple-900 via-pink-900 to-red-900'
    },
    {
      id: 2,
      title: 'MEGA SALE',
      subtitle: 'Ofertas Especiales en Equipos de Audio',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop',
      features: ['Calidad de Sonido Premium', 'Conectividad Inalámbrica'],
      logo: 'AUDIO',
      gradient: 'from-blue-900 via-purple-900 to-pink-900'
    },
    {
      id: 3,
      title: 'LAPTOPS PRO',
      subtitle: 'MacBooks y Laptops Profesionales',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      features: ['Procesadores de Última Generación', 'Diseño Ultra Delgado'],
      logo: 'PRO',
      gradient: 'from-gray-900 via-blue-900 to-purple-900'
    },
    {
      id: 4,
      title: 'TECH INNOVACIÓN',
      subtitle: 'Tecnología de Vanguardia',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      features: ['Componentes de Alta Tecnología', 'Rendimiento Excepcional'],
      logo: 'TECH',
      gradient: 'from-green-900 via-blue-900 to-purple-900'
    },
    {
      id: 5,
      title: 'WORKSPACE',
      subtitle: 'Espacios de Trabajo Modernos',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      features: ['Setup Profesional Completo', 'Productividad Máxima'],
      logo: 'WORK',
      gradient: 'from-orange-900 via-red-900 to-pink-900'
    }
  ];

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">OFERTA ESPECIAL</h2>
      
      <div className={`relative bg-gradient-to-r ${slides[currentSlide].gradient} rounded-2xl overflow-hidden h-80 transition-all duration-500`}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Content */}
        <div className="relative h-full flex items-center transition-all duration-500">
          <div className="flex-1 p-8 text-white">
            <div className="mb-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-2 animate-pulse">
                {slides[currentSlide].logo}
              </div>
            </div>
            
            <h3 className="text-4xl font-bold mb-2 animate-fade-in">{slides[currentSlide].title}</h3>
            <p className="text-xl mb-6 opacity-90 animate-fade-in">{slides[currentSlide].subtitle}</p>
            
            <div className="space-y-2 mb-6">
              {slides[currentSlide].features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {currentSlide === 1 && (
              <div className="text-6xl font-black animate-bounce">
                <span className="text-pink-300">MEGA</span>
                <br />
                <span className="text-pink-400">SALE</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 relative overflow-hidden">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HotSaleSection;
