import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileType, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Input';
import { ExportColumn, exportData } from '@/lib/exportUtils';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, any>[];
  availableColumns: ExportColumn[];
  defaultFilename: string;
  title?: string;
}

export function ExportDialog({
  isOpen,
  onClose,
  data,
  availableColumns,
  defaultFilename,
  title,
}: ExportDialogProps) {
  const [format, setFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    availableColumns.map(col => col.key)
  );
  const [filename, setFilename] = useState(defaultFilename);

  const handleExport = () => {
    const columnsToExport = availableColumns.filter(col =>
      selectedColumns.includes(col.key)
    );

    exportData({
      filename,
      title,
      columns: columnsToExport,
      data,
      format,
    });

    onClose();
  };

  const toggleColumn = (key: string) => {
    setSelectedColumns(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const selectAll = () => {
    setSelectedColumns(availableColumns.map(col => col.key));
  };

  const deselectAll = () => {
    setSelectedColumns([]);
  };

  const formatIcons = {
    pdf: FileText,
    excel: FileSpreadsheet,
    csv: FileType,
  };

  const FormatIcon = formatIcons[format];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Export Data</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
        {/* Format Selection */}
        <div>
          <Label>Export Format</Label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {(['pdf', 'excel', 'csv'] as const).map(fmt => {
              const Icon = formatIcons[fmt];
              return (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    format === fmt
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium uppercase">{fmt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filename */}
        <div>
          <Label htmlFor="filename">Filename</Label>
          <input
            id="filename"
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="mt-1 w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter filename"
          />
        </div>

        {/* Column Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Select Columns to Export</Label>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-xs text-primary hover:underline"
              >
                Select All
              </button>
              <span className="text-xs text-foreground-secondary">|</span>
              <button
                onClick={deselectAll}
                className="text-xs text-primary hover:underline"
              >
                Deselect All
              </button>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto border border-border rounded-lg p-3 space-y-2">
            {availableColumns.map(col => (
              <label
                key={col.key}
                className="flex items-center gap-3 p-2 hover:bg-surface-hover rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col.key)}
                  onChange={() => toggleColumn(col.key)}
                  className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                />
                <span className="text-sm">{col.header}</span>
              </label>
            ))}
          </div>
          
          <p className="text-xs text-foreground-secondary mt-2">
            {selectedColumns.length} of {availableColumns.length} columns selected
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedColumns.length === 0}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export {format.toUpperCase()}
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
