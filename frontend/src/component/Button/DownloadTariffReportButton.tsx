// components/DownloadTariffReportButton.tsx
import React from 'react';

const DownloadTariffReportButton: React.FC = () => {
  const handleDownload = async () => {
    const response = await fetch('http://localhost:3000/tariff-purchases', {
      method: 'GET',
    });
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tariff_purchases.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload}>
      📥 Скачать Excel-отчёт
    </button>
  );
};

export default DownloadTariffReportButton;
