import React, { useState } from 'react';

interface SearchTariffProps {
  onSearch: (searchTerm: string) => void;
}

const SearchTariff: React.FC<SearchTariffProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6 flex items-center justify-center"
    >
      <input
        type="text"
        placeholder="Поиск по названию тарифа"
        className="border border-gray-300 rounded-l-[10px] px-4 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-custom-red"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-custom-red text-white px-4 py-2 rounded-r-[10px] hover:bg-red-700 transition-colors"
      >
        Найти
      </button>
    </form>
  );
};

export default SearchTariff;