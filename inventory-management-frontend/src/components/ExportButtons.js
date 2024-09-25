// src/components/ExportButtons.js
import React from 'react';

// ExportButtons component: allows the user to export the book data in CSV or JSON format
function ExportButtons() {
  const handleExport = async (format) => {
    try {
      const response = await fetch(`/books/export?format=${format}`);
      if (response.ok) {
        const blob = await response.blob();  // Get the exported data as a blob
        const url = window.URL.createObjectURL(blob);  // Create a downloadable link

        // Create an anchor element and programmatically click it to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = `books.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();  // Clean up the link after download
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
