// src/components/ExportButtons.js
import React from 'react';

function ExportButtons() {
  const handleExport = async (format) => {
    try {
      const response = await fetch(`/books/export?format=${format}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `books.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert('Failed to export data.');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div>
      <h2>Export Data</h2>
      <button onClick={() => handleExport('csv')}>Export as CSV</button>
      <button onClick={() => handleExport('json')}>Export as JSON</button>
    </div>
  );
}

export default ExportButtons;
