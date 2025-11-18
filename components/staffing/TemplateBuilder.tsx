'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  Copy,
  Grid3x3,
  Type,
  Palette,
  Settings,
  Eye,
  Edit3,
  FolderOpen
} from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useHospital } from '@/lib/hospitalContext';

// Cell types
type CellType = 'header' | 'theatre' | 'coordinator' | 'role' | 'staff-pool' | 'empty' | 'text';

// Cell styling
interface CellStyle {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: 'normal' | 'bold';
  fontSize?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderColor?: string;
}

// Cell configuration
interface TemplateCell {
  id: string;
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
  type: CellType;
  content: string;
  dataSource?: string; // Field to pull from (e.g., 'theatreName', 'specialty', 'roleName')
  style: CellStyle;
  editable: boolean;
}

// Template configuration
interface StaffingTemplateConfig {
  id?: string;
  name: string;
  description?: string;
  rows: number;
  cols: number;
  cells: TemplateCell[];
  columnWidths: number[]; // Percentage widths
  rowHeights: number[]; // Pixel heights
  createdAt?: string;
  updatedAt?: string;
}

export default function TemplateBuilder() {
  const { currentHospital } = useHospital();
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [templates, setTemplates] = useState<StaffingTemplateConfig[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<StaffingTemplateConfig>({
    name: 'New Template',
    rows: 10,
    cols: 3,
    cells: [],
    columnWidths: [38, 38, 24],
    rowHeights: Array(10).fill(42)
  });

  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showCellEditor, setShowCellEditor] = useState(false);

  // Load saved templates
  useEffect(() => {
    if (currentHospital) {
      loadTemplates();
    }
  }, [currentHospital]);

  // Initialize default grid
  useEffect(() => {
    if (currentTemplate.cells.length === 0) {
      initializeGrid();
    }
  }, []);

  const loadTemplates = async () => {
    try {
      const templatesSnap = await getDocs(collection(db, 'staffingTemplates'));
      const loadedTemplates: StaffingTemplateConfig[] = [];
      templatesSnap.forEach(doc => {
        loadedTemplates.push({ id: doc.id, ...doc.data() } as StaffingTemplateConfig);
      });
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const initializeGrid = () => {
    const cells: TemplateCell[] = [];
    let cellId = 0;

    for (let row = 0; row < currentTemplate.rows; row++) {
      for (let col = 0; col < currentTemplate.cols; col++) {
        cells.push({
          id: `cell-${cellId++}`,
          row,
          col,
          rowSpan: 1,
          colSpan: 1,
          type: row === 0 ? 'header' : 'empty',
          content: row === 0 ? `Column ${col + 1}` : '',
          style: {
            backgroundColor: row === 0 ? '#ffffff' : '#ffffff',
            textColor: '#111827',
            fontWeight: row === 0 ? 'bold' : 'normal',
            fontSize: '10px',
            textAlign: 'center',
            borderColor: '#1f2937'
          },
          editable: true
        });
      }
    }

    setCurrentTemplate({ ...currentTemplate, cells });
  };

  const addRow = () => {
    const newRow = currentTemplate.rows;
    const newCells: TemplateCell[] = [];

    for (let col = 0; col < currentTemplate.cols; col++) {
      newCells.push({
        id: `cell-${Date.now()}-${col}`,
        row: newRow,
        col,
        rowSpan: 1,
        colSpan: 1,
        type: 'empty',
        content: '',
        style: {
          backgroundColor: '#ffffff',
          textColor: '#111827',
          fontWeight: 'normal',
          fontSize: '10px',
          textAlign: 'left',
          borderColor: '#1f2937'
        },
        editable: true
      });
    }

    setCurrentTemplate({
      ...currentTemplate,
      rows: currentTemplate.rows + 1,
      cells: [...currentTemplate.cells, ...newCells],
      rowHeights: [...currentTemplate.rowHeights, 42]
    });
  };

  const addColumn = () => {
    const newCol = currentTemplate.cols;
    const newCells: TemplateCell[] = [];

    for (let row = 0; row < currentTemplate.rows; row++) {
      newCells.push({
        id: `cell-${Date.now()}-${row}`,
        row,
        col: newCol,
        rowSpan: 1,
        colSpan: 1,
        type: row === 0 ? 'header' : 'empty',
        content: row === 0 ? `Column ${newCol + 1}` : '',
        style: {
          backgroundColor: '#ffffff',
          textColor: '#111827',
          fontWeight: row === 0 ? 'bold' : 'normal',
          fontSize: '10px',
          textAlign: 'center',
          borderColor: '#1f2937'
        },
        editable: true
      });
    }

    const newWidth = 100 / (currentTemplate.cols + 1);
    const updatedWidths = currentTemplate.columnWidths.map(() => newWidth);

    setCurrentTemplate({
      ...currentTemplate,
      cols: currentTemplate.cols + 1,
      cells: [...currentTemplate.cells, ...newCells],
      columnWidths: [...updatedWidths, newWidth]
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (currentTemplate.rows <= 1) return;

    const updatedCells = currentTemplate.cells
      .filter(cell => cell.row !== rowIndex)
      .map(cell => ({
        ...cell,
        row: cell.row > rowIndex ? cell.row - 1 : cell.row
      }));

    const updatedHeights = currentTemplate.rowHeights.filter((_, idx) => idx !== rowIndex);

    setCurrentTemplate({
      ...currentTemplate,
      rows: currentTemplate.rows - 1,
      cells: updatedCells,
      rowHeights: updatedHeights
    });
  };

  const deleteColumn = (colIndex: number) => {
    if (currentTemplate.cols <= 1) return;

    const updatedCells = currentTemplate.cells
      .filter(cell => cell.col !== colIndex)
      .map(cell => ({
        ...cell,
        col: cell.col > colIndex ? cell.col - 1 : cell.col
      }));

    const updatedWidths = currentTemplate.columnWidths.filter((_, idx) => idx !== colIndex);

    setCurrentTemplate({
      ...currentTemplate,
      cols: currentTemplate.cols - 1,
      cells: updatedCells,
      columnWidths: updatedWidths
    });
  };

  const updateCell = (cellId: string, updates: Partial<TemplateCell>) => {
    const updatedCells = currentTemplate.cells.map(cell =>
      cell.id === cellId ? { ...cell, ...updates } : cell
    );
    setCurrentTemplate({ ...currentTemplate, cells: updatedCells });
  };

  const mergeCells = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    // Implementation for merging cells
    const rowSpan = endRow - startRow + 1;
    const colSpan = endCol - startCol + 1;

    const updatedCells = currentTemplate.cells.map(cell => {
      if (cell.row === startRow && cell.col === startCol) {
        return { ...cell, rowSpan, colSpan };
      }
      // Hide merged cells
      if (
        cell.row >= startRow &&
        cell.row <= endRow &&
        cell.col >= startCol &&
        cell.col <= endCol &&
        !(cell.row === startRow && cell.col === startCol)
      ) {
        return { ...cell, rowSpan: 0, colSpan: 0 }; // Hidden
      }
      return cell;
    });

    setCurrentTemplate({ ...currentTemplate, cells: updatedCells });
  };

  const saveTemplate = async () => {
    try {
      const templateData = {
        ...currentTemplate,
        updatedAt: new Date().toISOString()
      };

      if (currentTemplate.id) {
        await updateDoc(doc(db, 'staffingTemplates', currentTemplate.id), templateData);
      } else {
        const docRef = await addDoc(collection(db, 'staffingTemplates'), {
          ...templateData,
          createdAt: new Date().toISOString()
        });
        setCurrentTemplate({ ...currentTemplate, id: docRef.id });
      }

      await loadTemplates();
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    }
  };

  const loadTemplate = (template: StaffingTemplateConfig) => {
    setCurrentTemplate(template);
    setShowTemplateLibrary(false);
  };

  const exportToExcel = () => {
    // Generate CSV/Excel export
    let csv = '';
    for (let row = 0; row < currentTemplate.rows; row++) {
      const rowCells = currentTemplate.cells.filter(c => c.row === row && c.colSpan > 0);
      const rowData = rowCells.map(c => `"${c.content}"`).join(',');
      csv += rowData + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTemplate.name}.csv`;
    a.click();
  };

  const getCellAtPosition = (row: number, col: number): TemplateCell | undefined => {
    return currentTemplate.cells.find(cell => cell.row === row && cell.col === col);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <input
              type="text"
              value={currentTemplate.name}
              onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
              className="text-xl font-bold border-b-2 border-transparent hover:border-gray-300 focus:border-cyan-500 focus:outline-none px-2 py-1"
            />
            <p className="text-sm text-gray-500 mt-1">Custom staffing template builder</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  mode === 'edit' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  mode === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <FolderOpen className="w-4 h-4" />
              Templates
            </button>

            <button
              onClick={saveTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              Save
            </button>

            <button
              onClick={exportToExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Toolbar */}
        {mode === 'edit' && (
          <div className="flex items-center gap-2 pt-4 border-t">
            <button
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>

            <button
              onClick={addColumn}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Column
            </button>

            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <button
              onClick={() => selectedCell && setShowCellEditor(true)}
              disabled={!selectedCell}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors text-sm disabled:opacity-50"
            >
              <Settings className="w-4 h-4" />
              Cell Properties
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: currentTemplate.rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {mode === 'edit' && (
                  <td className="border border-gray-300 bg-gray-50 p-1 text-center" style={{ width: '40px' }}>
                    <button
                      onClick={() => deleteRow(rowIdx)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete row"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                )}

                {Array.from({ length: currentTemplate.cols }).map((_, colIdx) => {
                  const cell = getCellAtPosition(rowIdx, colIdx);

                  if (!cell || cell.rowSpan === 0 || cell.colSpan === 0) {
                    return null; // Hidden merged cell
                  }

                  return (
                    <td
                      key={colIdx}
                      rowSpan={cell.rowSpan}
                      colSpan={cell.colSpan}
                      onClick={() => mode === 'edit' && setSelectedCell(cell.id)}
                      className={`border border-gray-900 p-2 cursor-pointer transition-colors ${
                        selectedCell === cell.id ? 'ring-2 ring-cyan-500' : ''
                      }`}
                      style={{
                        backgroundColor: cell.style.backgroundColor,
                        color: cell.style.textColor,
                        fontWeight: cell.style.fontWeight,
                        fontSize: cell.style.fontSize,
                        textAlign: cell.style.textAlign,
                        width: `${currentTemplate.columnWidths[colIdx]}%`,
                        height: `${currentTemplate.rowHeights[rowIdx]}px`,
                        minHeight: `${currentTemplate.rowHeights[rowIdx]}px`
                      }}
                    >
                      {mode === 'edit' && cell.editable ? (
                        <input
                          type="text"
                          value={cell.content}
                          onChange={(e) => updateCell(cell.id, { content: e.target.value })}
                          className="w-full bg-transparent outline-none"
                          style={{
                            color: cell.style.textColor,
                            fontWeight: cell.style.fontWeight,
                            fontSize: cell.style.fontSize,
                            textAlign: cell.style.textAlign
                          }}
                        />
                      ) : (
                        <div>{cell.content}</div>
                      )}
                    </td>
                  );
                })}

                {mode === 'edit' && rowIdx === 0 && (
                  <td className="border border-gray-300 bg-gray-50 p-1"></td>
                )}
              </tr>
            ))}

            {mode === 'edit' && (
              <tr>
                <td className="border border-gray-300 bg-gray-50 p-1"></td>
                {Array.from({ length: currentTemplate.cols }).map((_, colIdx) => (
                  <td key={colIdx} className="border border-gray-300 bg-gray-50 p-1 text-center">
                    <button
                      onClick={() => deleteColumn(colIdx)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete column"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                ))}
                <td className="border border-gray-300 bg-gray-50 p-1"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Template Library Modal */}
      {showTemplateLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Template Library</h2>
              <p className="text-sm text-gray-600 mt-1">Load a saved template</p>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {templates.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Grid3x3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No saved templates</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => loadTemplate(template)}
                      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-cyan-500 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{template.rows}×{template.cols}</span>
                        <span>•</span>
                        <span>{template.cells.length} cells</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setShowTemplateLibrary(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cell Editor Modal */}
      {showCellEditor && selectedCell && (
        <CellEditorModal
          cell={currentTemplate.cells.find(c => c.id === selectedCell)!}
          onUpdate={(updates) => {
            updateCell(selectedCell, updates);
            setShowCellEditor(false);
          }}
          onClose={() => setShowCellEditor(false)}
        />
      )}
    </div>
  );
}

// Cell Editor Modal Component
interface CellEditorModalProps {
  cell: TemplateCell;
  onUpdate: (updates: Partial<TemplateCell>) => void;
  onClose: () => void;
}

function CellEditorModal({ cell, onUpdate, onClose }: CellEditorModalProps) {
  const [editedCell, setEditedCell] = useState<TemplateCell>({ ...cell });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Cell Properties</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Cell Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cell Type</label>
            <select
              value={editedCell.type}
              onChange={(e) => setEditedCell({ ...editedCell, type: e.target.value as CellType })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="header">Header</option>
              <option value="theatre">Theatre</option>
              <option value="coordinator">Coordinator</option>
              <option value="role">Role</option>
              <option value="staff-pool">Staff Pool</option>
              <option value="text">Text</option>
              <option value="empty">Empty</option>
            </select>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
            <input
              type="color"
              value={editedCell.style.backgroundColor}
              onChange={(e) =>
                setEditedCell({
                  ...editedCell,
                  style: { ...editedCell.style, backgroundColor: e.target.value }
                })
              }
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="color"
              value={editedCell.style.textColor}
              onChange={(e) =>
                setEditedCell({
                  ...editedCell,
                  style: { ...editedCell.style, textColor: e.target.value }
                })
              }
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="text"
              value={editedCell.style.fontSize}
              onChange={(e) =>
                setEditedCell({
                  ...editedCell,
                  style: { ...editedCell.style, fontSize: e.target.value }
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="10px"
            />
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
            <select
              value={editedCell.style.fontWeight}
              onChange={(e) =>
                setEditedCell({
                  ...editedCell,
                  style: { ...editedCell.style, fontWeight: e.target.value as 'normal' | 'bold' }
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>

          {/* Text Align */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
            <select
              value={editedCell.style.textAlign}
              onChange={(e) =>
                setEditedCell({
                  ...editedCell,
                  style: { ...editedCell.style, textAlign: e.target.value as 'left' | 'center' | 'right' }
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdate(editedCell)}
            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
