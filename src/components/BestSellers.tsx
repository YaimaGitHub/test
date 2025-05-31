
import React from 'react';

const BestSellers = () => {
  const bestSellers = [
    {
      id: 'apple',
      name: 'Apple',
      percentage: '98%',
      logo: '🍎',
      color: 'bg-gray-100'
    },
    {
      id: 'sony',
      name: 'sony',
      percentage: '96%',
      logo: 'S',
      color: 'bg-blue-500'
    },
    {
      id: 'xiaomi',
      name: 'Xiaomi',
      percentage: '91%',
      logo: 'Mi',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">BEST SELLERS</h3>
      
      <div className="space-y-4">
        {bestSellers.map((seller) => (
          <div key={seller.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${seller.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">
                  {seller.logo}
                </span>
              </div>
              <span className="font-medium text-gray-800">{seller.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-600">{seller.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
