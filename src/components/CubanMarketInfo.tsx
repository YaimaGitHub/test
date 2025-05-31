
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Euro, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CubanMarketInfo = () => {
  const { t } = useLanguage();
  const [rates, setRates] = useState({
    usd: 0,
    eur: 0,
    trend: 'up' as 'up' | 'down',
    lastUpdate: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simular datos del mercado cubano en tiempo real
  const updateRates = () => {
    setIsLoading(true);
    setTimeout(() => {
      const baseUSD = 120;
      const baseEUR = 130;
      const variation = (Math.random() - 0.5) * 10;
      
      setRates({
        usd: baseUSD + variation,
        eur: baseEUR + variation,
        trend: variation > 0 ? 'up' : 'down',
        lastUpdate: new Date()
      });
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {t('market.info')}
        </h3>
        <button
          onClick={updateRates}
          disabled={isLoading}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Currency Rates */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700 text-sm">{t('currency.rates')}</h4>
        
        {/* USD Rate */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{t('usd.rate')}</p>
              <p className="text-xs text-gray-600">{t('last.updated')}: {formatTime(rates.lastUpdate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-green-600">
              {rates.usd.toFixed(2)}
            </span>
            {rates.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600 animate-bounce" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 animate-bounce" />
            )}
          </div>
        </div>

        {/* EUR Rate */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Euro className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{t('eur.rate')}</p>
              <p className="text-xs text-gray-600">{t('last.updated')}: {formatTime(rates.lastUpdate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-blue-600">
              {rates.eur.toFixed(2)}
            </span>
            {rates.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600 animate-bounce" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 animate-bounce" />
            )}
          </div>
        </div>
      </div>

      {/* Market Trend */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{t('market.trend')}</span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            rates.trend === 'up' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {rates.trend === 'up' ? (
              <>
                <TrendingUp className="w-3 h-3" />
                <span>Subiendo</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3" />
                <span>Bajando</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animation indicator */}
      <div className="flex justify-center">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default CubanMarketInfo;
