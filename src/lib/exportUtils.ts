import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

export interface ExportOptions {
  filename: string;
  title?: string;
  columns: ExportColumn[];
  data: Record<string, any>[];
  format: 'pdf' | 'excel' | 'csv';
}

/**
 * Export data to PDF format
 */
export function exportToPDF(options: ExportOptions) {
  const { filename, title, columns, data } = options;
  
  const doc = new jsPDF();
  
  // Add title if provided
  if (title) {
    doc.setFontSize(16);
    doc.text(title, 14, 20);
  }
  
  // Prepare table data
  const headers = columns.map(col => col.header);
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col.key];
      if (value === null || value === undefined) return '';
      if (typeof value === 'number') return value.toLocaleString();
      return String(value);
    })
  );
  
  // Generate table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: title ? 30 : 20,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 212, 255], // Neon blue theme
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: columns.reduce((acc, col, index) => {
      if (col.width) {
        acc[index] = { cellWidth: col.width };
      }
      return acc;
    }, {} as Record<number, any>),
  });
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
}

/**
 * Export data to Excel format
 */
export function exportToExcel(options: ExportOptions) {
  const { filename, columns, data } = options;
  
  // Prepare worksheet data with headers
  const headers = columns.map(col => col.header);
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col.key];
      if (value === null || value === undefined) return '';
      return value;
    })
  );
  
  const worksheetData = [headers, ...rows];
  
  // Create worksheet and workbook
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
  // Style the header row
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: '00D4FF' } },
    };
  }
  
  // Auto-size columns
  const maxWidth = 50;
  const columnWidths = columns.map((col, i) => {
    const headerWidth = col.header.length;
    const dataWidth = Math.max(
      ...rows.map(row => String(row[i] || '').length)
    );
    return Math.min(Math.max(headerWidth, dataWidth) + 2, maxWidth);
  });
  
  worksheet['!cols'] = columnWidths.map(w => ({ wch: w }));
  
  // Save the file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Export data to CSV format
 */
export function exportToCSV(options: ExportOptions) {
  const { filename, columns, data } = options;
  
  // Prepare CSV content
  const headers = columns.map(col => col.header).join(',');
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col.key];
      if (value === null || value === undefined) return '';
      const stringValue = String(value);
      // Escape quotes and wrap in quotes if contains comma
      if (stringValue.includes(',') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',')
  ).join('\n');
  
  const csvContent = `${headers}\n${rows}`;
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Main export function that handles all formats
 */
export function exportData(options: ExportOptions) {
  switch (options.format) {
    case 'pdf':
      exportToPDF(options);
      break;
    case 'excel':
      exportToExcel(options);
      break;
    case 'csv':
      exportToCSV(options);
      break;
    default:
      throw new Error(`Unsupported export format: ${options.format}`);
  }
}
