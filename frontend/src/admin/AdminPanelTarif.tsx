import { useState, useEffect } from "react";
import React from "react";
import Bascet from "../img/Bascket.svg";
import Edit from "../img/Edit.svg";
import AminModalBlockMenu from "./adminModalBlock/AminModalBlockMenu";
import axios from "axios";
import AdminTariffForm from "../component/Form/AdminTariffForm";

export default function AdminPanelTarif() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'delete'>('all');
  
  const tableHeadersWithKeys = [
    { label: "ID", key: "idTariff" },
    { label: "ИМЯ", key: "name" },
    { label: "КОЛИЧЕСТВО ВОЖМОЖНЫХ МОБОВ", key: "availableMobs" },
    { label: "ИГРОВОЕ ВРЕМЯ", key: "availableTime" },
    { label: "ЦЕНА", key: "price" },
    { label: "СТАТУС", key: "status" },
    { label: "ДАТА СОЗДАНИЯ", key: "createdAt" },
  ];

  type Tariff = {
    idTariff: number;
    name: string;
    status: 'active' | 'delete';
    availableMobs: number;
    availableTime: number;
    price: number;
    createdAt: string;
  };

  const [selectedTariff, setSelectedUser] = useState<Tariff | null>(null);
  const [allTariff, setAllTariffs] = useState<Tariff[]>([]);
  const [filteredTariffs, setFilteredTariffs] = useState<Tariff[]>([]);

  // Загрузка тарифов
  useEffect(() => {
    const loadTariffs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/find/tariffs");
        setAllTariffs(response.data);
      } catch (error) {
        console.error("Ошибка загрузки тарифов:", error);
      }
    };
    loadTariffs();
  }, []);

  // Фильтрация, сортировка и поиск
  useEffect(() => {
    let result = [...allTariff];
    
    // Фильтрация по статусу
    if (statusFilter !== 'all') {
      result = result.filter(tariff => tariff.status === statusFilter);
    }
    
    // Фильтрация по поисковому запросу
    if (searchTerm.trim() !== "") {
      result = result.filter(tariff =>
        tariff.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Сортировка
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    setFilteredTariffs(result);
  }, [searchTerm, allTariff, sortOrder, statusFilter]);

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleStatusFilterChange = (filter: 'all' | 'active' | 'delete') => {
    setStatusFilter(filter);
  };

  return (
    <div>
      <AdminTariffForm
        tableHeadersWithKeys={tableHeadersWithKeys}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedTariff={selectedTariff}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
      />
      <AminModalBlockMenu />
      
      {/* Фильтры и поиск */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4 gap-4">
        <div className="relative w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Поиск по названию тарифа"
            className="w-full border border-gray-300 rounded-[10px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-red"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusFilterChange('all')}
              className={`px-4 py-2 rounded-[10px] ${
                statusFilter === 'all' 
                  ? 'bg-custom-blue text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => handleStatusFilterChange('active')}
              className={`px-4 py-2 rounded-[10px] ${
                statusFilter === 'active' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Активные
            </button>
            <button
              onClick={() => handleStatusFilterChange('delete')}
              className={`px-4 py-2 rounded-[10px] ${
                statusFilter === 'delete' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Удалённые
            </button>
          </div>
          
          <button
            onClick={handleSortToggle}
            className="bg-custom-blue hover-effect-btn-blue text-white px-4 py-2 rounded-[10px] flex items-center"
          >
            Сортировка: {sortOrder === 'asc' ? 'А → Я' : 'Я → А'}
            <span className="ml-2">
              {sortOrder === 'asc' ? '↑' : '↓'}
            </span>
          </button>
        </div>
      </div>
      
      <button
        className="bg-custom-red w-full md:w-[367px] items-center h-[63px] hover-effect-btn-red text-white cursor-pointer rounded-[10px] flex align-center justify-center mb-6 mx-auto"
        onClick={() => setIsCreate(!isCreate)}
      >
        Создать новый тариф
      </button>
      
      <table className="text-center top-[3%] left-[calc(40%-280px)] w-full">
        <thead>
          <tr className="bg-white h-[69px] rounded-tr-[20px] rounded-tl-[20px]">
            {tableHeadersWithKeys.map((header, key) => (
              <td key={key}>{header.label}</td>
            ))}
            <td className="rounded-tr-[20px]">ДЕЙСТВИЕ</td>
          </tr>
        </thead>
        <tbody>
          {filteredTariffs.map((tariff, key) => (
            <tr
              key={tariff.idTariff}
              className={`h-[69px] ${
                key % 2 === 1 ? "bg-white" : "bg-gray-200"
              }`}
            >
              {tableHeadersWithKeys.map((header, idx) => {
                const value = tariff[header.key as keyof Tariff];
                return <td key={idx}>{value ?? "Нет данных"}</td>;
              })}
              <td>
                <button
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setSelectedUser(tariff);
                  }}
                  className="bg-custom-green hover-effect-btn-green w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]"
                >
                  <img src={Edit} alt="Edit" className="w-full" />
                </button>
                <button
                  onClick={() => {
                    setIsDelete(!isDelete);
                    setSelectedUser(tariff);
                  }}
                  className="bg-custom-red w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]"
                >
                  <img src={Bascet} alt="Basket" className="w-full" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}